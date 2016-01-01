'use strict';

var gulp = require('gulp'),
    imageResize = require('gulp-image-resize'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    svgstore = require('gulp-svgstore'),
    inject = require('gulp-inject');


gulp.task('imgmin', function () {
  gulp.src('img/**/*.{jpg,JPG}')
    .pipe(imageResize({
      width: 100
    }))
    .pipe(gulp.dest('thumbnail'));
});

gulp.task('svgstore', function () {
    var svgs = gulp
        .src('svg/*.svg')
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src('index.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  gulp.src('sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
});

gulp.task('sass:watch', function () {
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', ['serve', 'sass', 'sass:watch']);

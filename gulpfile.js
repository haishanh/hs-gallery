var gulp = require('gulp'),
    imageResize = require('gulp-image-resize'),
    sass = require('gulp-sass');


gulp.task('imgmin', function () {
  gulp.src('img/**/*.jpg')
    .pipe(imageResize({
      width: 100
    }))
    .pipe(gulp.dest('thumbnail'));
});

gulp.task('sass', function () {
  gulp.src('sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch']);

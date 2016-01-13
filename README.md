## hs-gallery

> hs-gallery is a very simple image gallery

 * Designed for large image set
 * Using lazy load

### How to use

 1. Put images in directory `img`
 2. Run bash script `gen_thumbnail.sh` to generate thumbnails
 3. Run `node genlist.js` to generate `js/imgs.js`
 4. Write you own html file (see `index.html` in this repo as a example)

*Note*: You can also run `gulp imgmin`(which using [`gulp-image-resize`][gulp-image-resize]) to generate thumbnails, but it seems gulp-image-resize have memory leaks issue. If you are processing a huge batch of images, you better use `gen_thumbnail.sh`

### License

Use it whatever you want.

[gulp-image-size]: https://github.com/scalableminds/gulp-image-resize
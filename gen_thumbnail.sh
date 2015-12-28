#!/bin/bash

IMG_DIR=img
THUMBNAIL_DIR=thumbnail
WIDTH=100
HEIGHT=


if ! which convert > /dev/null 2>&1; then
  echo "Error you need to install ImageMagick first"
  echo "See http://www.imagemagick.org/"
  exit 1
fi

files=$(ls ${IMG_DIR})

for f in ${files}; do
  echo "Converting ${f}..."
  convert "${IMG_DIR}/${f}" -resize "${WIDTH}x${HEIGHT}" "${THUMBNAIL_DIR}/${f}"
done


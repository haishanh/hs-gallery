var $ = document.querySelector.bind(document);
var d = document;

var e = $('#thumbnails');

var startIndex = 0;

var throttle = function(type, name, obj) {
  obj = obj || window;
  var running = false;
  var func = function() {
    if (running) { return; }
    running = true;
    requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
    });
  };
  obj.addEventListener(type, func);
};


function loadImg(num) {
  var len = imgs.length;
  var endIndex = startIndex + num;
  if (startIndex >= len) return;
  if (endIndex >= len) endIndex = len;
  var displayImgs = imgs.slice(startIndex, endIndex);
  var thisStart = startIndex;
  startIndex  = endIndex; // update global
  displayImgs.forEach(function (img, index) {
    // clean up
    var loadAchor = document.querySelector('a.last');
    if (loadAchor) loadAchor.classList.remove('last');

    // create element
    // <a><img></a>
    var a = d.createElement('a');
    a.classList.add('thumbnail');
    a.href='#';
    a.setAttribute('index', thisStart + index + '');
    a.setAttribute('data', 'img/' + img);

    var i = new Image();
    i.src = 'thumbnail/' + img;
    a.appendChild(i);
    e.appendChild(a);

    a.addEventListener('click', function (e) {
      e.preventDefault();

      //var img = document.querySelector('#largeview img');
      //img.src = a.getAttribute('data');
      //img.setAttribute('index', a.getAttribute('index'));

      var id = +a.getAttribute('index');
      var img = replaceImg(imgs, id);
      var largeview = document.querySelector('#largeview');
      largeview.appendChild(img);
      largeview.style.visibility = 'visible';
    }, 'false');

    // add anchor to the last thumbnail
    // also update window scroll ev handler
    if (index === num - 1) {
      a.classList.add('last');
      window.addEventListener('optimizedScroll', function () {
        var e = document.querySelector('a.last');
        if (e.getBoundingClientRect().top < window.innerHeight) loadImg(10);
      }, false)
    }
  });
}

/**
 * @param {number} index - current index of the image in the imgs array
 * @param {num} num - numbers of image to load (not display)
 */
function loadPrev(index, num) {
  for (var i = 0; i < num; i++) {
    var id = index - i - 1;
    if (id >= 0) {
      Image().src = "img/" + imgs[id];
    }
  }
}

function loadNext(index, num) {
  var len = imgs.length;
  for (var i = 0; i < num; i++) {
    var id = index + i + 1;
    if (id < len) {
      Image().src = "img/" + imgs[id];
    }
  }
}

function replaceImg(imgs, id) {
  var img = document.querySelector('#largeview img');
  var left = document.querySelector('#largeview .left');
  var right = document.querySelector('#largeview .right');
  img.src = 'img/' + imgs[id];
  img.setAttribute('index', id + '');

  left.style.visibility = id === 0 ? 'hidden' : 'visible';
  right.style.visibility = id === imgs.length - 1 ? 'hidden' : 'visible';
  return img;
}

function displayPrev() {
  var img = document.querySelector('#largeview img');
  var curId = +img.getAttribute('index');
  if (curId === 0) return;

  replaceImg(imgs, curId - 1);
  //img.src='img/' + imgs[curId - 1];
  //img.setAttribute('index', curId - 1 + '')
}

function displayNext() {
  var img = document.querySelector('#largeview img');
  var curId = +img.getAttribute('index');
  if (curId >= imgs.length - 1) return;

  replaceImg(imgs, curId + 1);
  //img.src='img/' + imgs[curId + 1];
  //img.setAttribute('index', curId + 1 + '')
}


document.querySelector('#largeview .left').addEventListener('click', displayPrev, false);
document.querySelector('#largeview .right').addEventListener('click', displayNext, false);

// close overlay while 'close' icon being clicked
document.querySelector('#largeview .close').addEventListener('click', function () {
  console.log('yes');
  document.querySelector('#largeview').style.visibility = 'hidden';
  document.querySelector('#largeview img').src = '';
}, false);


throttle('scroll', 'optimizedScroll');
loadImg(10);

//Array.from(d.querySelectorAll('.thumbnail')).forEach(function (a) {
//  a.addEventListener('click', function (e) {
//    e.preventDefault();
//    console.log(a);
//  });
//});

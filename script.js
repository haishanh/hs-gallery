var $ = document.querySelector.bind(document);
var d = document;

var e = $('#thumbnails');

imgs.forEach(function (img) {
  var a = d.createElement('a');
  a.classList.add('thumbnail');
  a.href='#';
  a.setAttribute('data', 'img/' + img);
  var i = new Image;
  i.src = 'thumbnail/' + img;
  a.appendChild(i);
  e.appendChild(a);
});

Array.from(d.querySelectorAll('.thumbnail')).forEach(function (a) {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(e);
  });
});

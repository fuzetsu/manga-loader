// METADATA
// match: ^http(s)?://hitomi.la/reader/[0-9]+.html

var impl_src = {
  img: '#comicImages > img',
  next: '#comicImages > img',
  numpages: function() {
      return W.images.length;
    },
  curpage: function() {
      return parseInt(W.curPanel);
    },
  pages: function(url, num, cb, ex) {
      cb(W.images[num - 1].path, num);
    },
  wait: '#comicImages > img'
}
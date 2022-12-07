// METADATA
// name: unionmangas
// match: https?://(www\.)?unionmangas\.net/leitor/.+

var impl_src = {
  img: '.slick-active img.real',
  next: reuse.na,
  numpages: '.selectPage',
  curpage: '.selectPage',
  numchaps: '#cap_manga1',
  curchap: '#cap_manga1',
  nextchap: '#cap_manga1',
  prevchap: '#cap_manga1',
  pages: function(url, num, cb, ex) {
    cb(W.pages[num - 1], num);
  },
  wait: function() {
    W.pages = getEls('img.real').map(function(el) {
      return el.src || el.dataset.lazy;
    });
    return W.pages && W.pages.length > 0;
  }
}
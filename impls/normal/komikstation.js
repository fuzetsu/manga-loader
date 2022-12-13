// METADATA
// match: ^https?://www\.komikstation\.com/.+/.+/.+

var impl_src = {
  img: '#mainpage',
  next: function() {
    return W._base + '?page=' + (W.glbCurrentpage + 1);
  },
  numpages: '#index select',
  curpage: '#index select',
  pages: function(url, num, cb, ex) {
    next = W._base + '?page=' + (num + 1);
    cb(W.pages[num - 1], next);
  },
  wait: function() {
    W._base = location.href.replace(/[?#].+$/, '');
    return W.pages;
  }
}
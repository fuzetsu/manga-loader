// METADATA
// match: ^https?://gmanga.me/mangas/

var impl_src = {
  img: function() {
    return W.pages[W.firstImg - 1];
  },
  next: function() {
    return location.href + '#' + (W.firstImg + 1);
  },
  numpages: function() {
    return W.totalImgs;
  },
  curpage: function() {
    return W.firstImg;
  },
  nextchap: function(prev) {
    var num = parseInt(extractInfo('#chapter', {type: 'value', val: prev ? 1 : -1}));
    return num && location.href.replace(/(\/mangas\/[^\/]+\/)[0-9]+(\/[^\/]+)/, '$1' + num + '$2');
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  numchaps: '#chapter',
  curchap: '#chapter',
  invchap: true,
  pages: function(url, num, cb, ex) {
    var nexturl = location.href + '#' + (num + 1);
    cb(W.pages[num - 1], nexturl);
  },
  wait: function() {
    W.pages = W.release_pages && W.release_pages[1];
    return W.pages;
  }
}
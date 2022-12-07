// METADATA
// name: 2comic.com 動漫易
// match: http://twocomic.com/view/comic_\d+.html

var impl_src = {
  img: '#TheImg',
  next: function() {
    return '#';
  },
  pages: function(url, num, cb, ex) {
    W.p++;
    var ss = W.ss;
    var c = W.c;
    var ti = W.ti;
    var nn = W.nn;
    var p = W.p;
    var mm = W.mm;
    var f = W.f;
    var img = 'http://img' + ss(c, 4, 2) + '.8comic.com/' + ss(c, 6, 1) + '/' + ti + '/' + ss(c, 0, 4) + '/' + nn(p) + '_' + ss(c, mm(p) + 10, 3, f) + '.jpg';
    cb(img, num - 1);
  },
  numpages: function() {
    return W.ps * 1;
  },
  curpage: function() {
    return W.p;
  },
  numchaps: function() {
    return W.chs;
  },
  curchap: function() {
    return W.ch;
  },
  nextchap: function() {
    return W.ch < W.chs ? W.replaceurl('ch', W.ni) : false;
  },
  prevchap: function() {
    return W.ch > 1 ? W.replaceurl('ch', W.pi) : false;
  },
  wait:'#TheImg'
}
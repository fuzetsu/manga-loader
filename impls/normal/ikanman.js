// METADATA
// name: ikanman
// match: https?://(www|tw)\.(ikanman|manhuagui)\.com/comic/[0-9]+/[0-9]+\.html

var impl_src = {
  img: '#mangaFile',
  next: function() {
      return W._next;
  },
  curpage: '#page',
  numpages: '#pageSelect',
  nextchap: function(prev) {
    var chap = prev ? W._prevchap : W._nextchap;
    if (chap > 0) {
      return location.href.replace(/(\/comic\/[0-9]+\/)[0-9]+\.html.*/, "$1" + chap + ".html");
    } else {
      return false;
    }
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  wait: function() {
    if (getEl('#mangaFile')) {
      W._nextchap = W.cInfo.nextId;
      W._prevchap = W.cInfo.prevId;
      var ex = extractInfo.bind(this);
      W._next = location.href.replace(/(_p[0-9]+)?\.html.*/, '_p' + (ex('curpage') + 1) + '.html');
      W._base = ex('img').replace(/[^\/]+$/, '');
      return true;
    }
  },
  pages: function(url, num, cb, ex) {
    var nexturl =  url.replace(/(_p[0-9]+)?\.html.*/, '_p' + (num + 1) + '.html');
    var imgurl = W._base + W.cInfo.files[num - 1];
    cb(imgurl, nexturl);
  }
}
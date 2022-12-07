// METADATA
// name: dm5
// match: ^https?://[^\.]*\.dm5\.com/m[0-9]*

var impl_src = {
  img: function (){
    return getEl('img.load-src').getAttribute('data-src');
  },
  next: function(){
    return '#';
  },
  numpages: function () {
    return W.pages.length;
  },
  pages: function(url, num, cb, ex) {
    cb(W.pages[num - 1].getAttribute('data-src'), num - 1);
  },
  nextchap: 'a.logo_2',
  prevchap: 'a.logo_1',
  wait: function (){
    W.pages = getEls('img.load-src');
    return true;
  }
}
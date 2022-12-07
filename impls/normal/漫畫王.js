// METADATA
// name: 漫畫王
// match: https://www\.mangabox\.me/reader/\d+/episodes/\d+/

var impl_src = {
  img: 'img.jsNext',
  next: function() {
    return '#';
  },
  pages: function(url, num, cb, ex) {
    cb(W.pages[num - 1].src, num - 1);
  },
  numpages: function() {
    return W.pages.length;
  },
  nextchap: '.lastSlider_nextButton',
  wait: function (){
    W.pages = getEls('img.jsNext');
    return true;
  }
}
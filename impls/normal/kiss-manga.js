// METADATA
// match: ^https?://kissmanga\.com/Manga/[^/]+/.+

var impl_src = {
  img: '#divImage img',
  next: '#divImage img',
  numpages: function() {
    return (W.lstOLA || W.lstImages).length;
  },
  curpage: function() {
    if(getEls('#divImage img').length > 1) {
      return 1;
    } else {
      return W.currImage + 1;
    }
  },
  nextchap: '#selectChapter, .selectChapter',
  prevchap: '#selectChapter, .selectChapter',
  pages: function(url, num, cb, ex) {
    cb((W.lstOLA || W.lstImages)[num - 1], num);
  }
}
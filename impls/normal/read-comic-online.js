// METADATA
// name: read-comic-online
// match: ^https?://readcomiconline\.to/Comic/[^/]+/.+

var impl_src = {
  img: '#divImage img',
  next: '#divImage img',
  numpages: function() {
    return W.lstImages.length;
  },
  curpage: function() {
    return getEls('#divImage img').length > 1 ? 1 : W.currImage + 1;
  },
  nextchap: '#selectEpisode, .selectEpisode',
  prevchap: '#selectEpisode, .selectEpisode',
  pages: function(url, num, cb, ex) {
    cb(W.lstImages[num - 1], num);
  }
}
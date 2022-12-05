// METADATA
// name: manga-wall
// match: ^https?://mangawall\\.com/manga/[^/]*/[0-9]*

var impl_src = {
  _page: null,
  img: 'img.scan',
  next: function() {
    if(this._page === null) this._page = W.page;
    return W.series_url + '/' + W.chapter + '/' + (this._page += 1);
  },
  numpages: '.pageselect',
  curpage: '.pageselect',
  nextchap: function(prev) {
    return W.series_url + '/' + (parseInt(W.chapter.slice(1)) + (prev ? -1 : 1)) + '/1';
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  URLregex: true
}
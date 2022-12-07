// METADATA
// name: anime-a
// match: ^https?://manga\.animea.net/.+chapter-[0-9]+(-page-[0-9]+)?.html

var impl_src = {
  _page: null,
  img: '#scanmr',
  next: function() {
    if(this._page === null) this._page = W.page;
    return W.series_url + W.chapter + '-page-' + (this._page += 1) + '.html';
  },
  numpages: '.pageselect',
  curpage: '.pageselect',
  nextchap: function(prev) {
    return W.series_url + 'chapter-' + (parseInt(W.chapter.match(/[0-9]+/)[0]) + (prev ? -1 : 1)) + '-page-1.html';
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}
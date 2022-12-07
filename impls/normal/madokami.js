// METADATA
// name: madokami
// match: ^https?://manga\.madokami\.al/reader/.+

var impl_src = {
  img: 'img',
  next: 'img',
  curpage: function() {
    return parseInt(query().index) + 1;
  },
  numpages: function() {
    if(!this._pages) {
      this._pages = JSON.parse(getEl('#reader').dataset.files);
    }
    return this._pages.length;
  },
  pages: function(url, num, cb, ex) {
    url = url.replace(/file=.+$/, 'file=' + this._pages[num - 1]);
    cb(url, url);
  },
  wait: '#reader'
}
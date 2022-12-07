// METADATA
// name: doujin-moe
// match: ^https?://doujins\.com/.+

var impl_src = {
  _pages: null,
  img: 'img.picture',
  next: reuse.na,
  numpages: function() {
      if (!this._pages) {
        this._pages = getEls('#gallery djm').map(function(file) {
          return file.getAttribute('file').replace('static2.', 'static.');
        });
      }
      return this._pages.length;
    },
  curpage: function() {
      return parseInt(getEl('.counter').textContent.match(/^[0-9]+/)[0]);
    },
  pages: function(url, num, cb, ex) {
      cb(this._pages[num - 1], num);
    }
}
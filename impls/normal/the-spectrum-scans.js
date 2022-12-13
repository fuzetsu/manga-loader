// METADATA
// match: ^https?://view\.thespectrum\.net/series/[^\.]+\.html

var impl_src = {
  img: '#mainimage',
  next: function() {
    if (++this._page < this._pages.length) {
      return this._pages[this._page];
    }
  },
  numpages: '.selectpage',
  curpage: '.selectpage',
  nextchap: function(prev) {
    var ps = document.pageSelector1;
    var chnum = ps.ch.selectedIndex + (prev ? -1 : 1);
    if (chnum < ps.ch.length && chnum > -1) {
      return ps.action.split('?')[0] + '?ch=' + ps.ch[chnum].value + '&page=1';
    } else {
      return false;
    }
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  wait: function() {
    var ps = document.pageSelector1;
    this._pages = [];
    var base = ps.action.split('?')[0];
    for (var i = 0; i < ps.page.length; i++) {
      this._pages.push(base + '?ch=' + ps.ch.value + '&page=' + ps.page[i].value);
    }
    this._page = ps.page[ps.page.selectedIndex].value - 1;
    return true;
  }
}
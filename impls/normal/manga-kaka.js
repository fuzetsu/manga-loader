// METADATA
// match: ^https?://www\.(mangahen|mangamap)\.com/[^/]+/[0-9]+

var impl_src = {
  img: 'img.manga-page',
  next: '.nav_pag > li:nth-child(1) > a',
  numpages: 'select.cbo_wpm_pag',
  curpage: 'select.cbo_wpm_pag',
  nextchap: function(prev) {
    var chapter = extractInfo('select.cbo_wpm_chp', { type: 'value', val: (prev ? 1 : -1) });
    if(chapter) return window.location.href.replace(/\/[0-9\.]+\/?([0-9]+\/?)?$/, '/' + chapter);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}
// METADATA
// name: manga-cow, manga-doom, manga-indo, 3asq.info, moonbunnnycafe
// match: ^https?://(mngcow|mangadoom|mangaindo|merakiscans|www\.3asq|moonbunnycafe)\.(co|id|info|com)/[^/]+/[0-9.]+

var impl_src = {
  img: '.prw a > img',
  next: '.prw a',
  numpages: 'select.cbo_wpm_pag',
  curpage: 'select.cbo_wpm_pag',
  nextchap: function(prev) {
    var next = extractInfo('select.cbo_wpm_chp', {type: 'value', val: (prev ? 1 : -1)});
    if(next) return window.location.href.replace(/\/[0-9.]+\/?([0-9]+\/?)?[^/]*$/, '/' + next);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}
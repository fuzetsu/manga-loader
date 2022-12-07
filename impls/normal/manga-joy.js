// METADATA
// name: manga-joy
// match: ^https?://manga-joy.com/[^/]*/[0-9]*

var impl_src = {
  img: '.prw img',
  next: '.nxt',
  numpages: '.wpm_nav_rdr li:nth-child(3) > select',
  curpage: '.wpm_nav_rdr li:nth-child(3) > select',
  nextchap: function(prev) {
    var next = extractInfo('.wpm_nav_rdr li:nth-child(2) > select', {type: 'value', val: prev ? 1 : -1});
    if(next) return window.location.href.replace(/\/[0-9.]+\/?([0-9]+(\/.*)?)?$/, '/' + next);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}
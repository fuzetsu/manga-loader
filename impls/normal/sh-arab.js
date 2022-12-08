// METADATA
// match: ^https?://www.sh-arab.com/manga/.+

var impl_src = {
  img: 'img.picture',
  next: '#omv td > a',
  curpage: 'select[name=page]',
  numpages: 'select[name=page]',
  curchap: 'select[name=chapter]',
  numchaps: 'select[name=chapter]',
  nextchap: function(prev) {
    var next = extractInfo('select[name=chapter]', {type:'value', val: (prev ? -1 : 1)});
    if (next) return location.href.replace(/[^\/]+$/, next);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}
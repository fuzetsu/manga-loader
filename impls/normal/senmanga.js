// METADATA
// name: senmanga
// match: ^https?://[^\\.]+\\.senmanga\\.com/[^/]*/.+

var impl_src = {
  img: '#picture',
  next: '#reader > a',
  numpages: 'select[name=page]',
  curpage: 'select[name=page]',
  numchaps: 'select[name=chapter]',
  curchap: 'select[name=chapter]',
  nextchap: function(prev) {
    var next = extractInfo('select[name=chapter]', {type: 'value', val: (prev ? 1 : -1)});
    if(next) {
      var manga = window.location.pathname.slice(1).split('/')[0];
      return window.location.origin + '/' + manga + '/' + next + '/1';
    }
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  URLregex: false
}
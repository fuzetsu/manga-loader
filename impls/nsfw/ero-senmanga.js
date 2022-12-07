// METADATA
// name: ero-senmanga
// match: ^https?://ero\.senmanga\.com/[^/]*/[^/]*/[0-9]*

var impl_src = {
  img: '#picture',
  next: '#omv > table > tbody > tr:nth-child(2) > td > a',
  numpages: 'select[name=page]',
  curpage: 'select[name=page]',
  nextchap: function(prev) {
      var next = extractInfo('select[name=chapter]', {
        type: 'value',
        val: (prev ? -1 : 1)
      });
      if (next) return window.location.href.replace(/\/[^\/]*\/[0-9]+\/?$/, '') + '/' + next + '/1';
    },
  prevchap: function() {
      return this.nextchap(true);
    }
}
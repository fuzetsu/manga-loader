// METADATA
// name: otakusmash
// match: https?://www\\.otakusmash\\.com/(read-comics|read-manga)/.+

var impl_src = {
  img: 'img.picture',
  next: 'select[name=page] + a',
  curpage: 'select[name=page]',
  numpages: 'select[name=page]',
  nextchap: function(prev) {
    var nextChap = extractInfo('select[name=chapter]', {type: 'value', val: prev ? 1 : -1});
    return nextChap ? location.href.replace(/(read-(comics|manga)\/[^\/]+).*/, '$1/' + nextChap) : null;
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  numchaps: 'select[name=chapter]',
  curchap: 'select[name=chapter]',
  invchap: true,
  URLregex: false
}
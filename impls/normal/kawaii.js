// METADATA
// match: ^https://kawaii.ca/reader/.+

var impl_src = {
  img: '.picture',
  next: 'select[name=page] + a',
  numpages: 'select[name=page]',
  curpage: 'select[name=page]',
  nextchap: function(prev) {
    var next = extractInfo('select[name=chapter]', {type:'value', val: (prev ? -1 : 1)});
    if(next) return location.href.replace(/\/reader\/([^/]+)(\/.+)?$/, '/reader/$1/' + next);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}
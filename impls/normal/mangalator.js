// METADATA
// name: mangalator
// match: ^https?://mangalator.ch/show.php\?gallery=[0-9]+

var impl_src = {
  img: '.image img',
  next: '#next',
  numpages: 'select[name=image]',
  curpage: 'select[name=image]',
  nextchap: function(prev) {
    var next = extractInfo('select[name=gallery]', {type: 'value', val: (prev ? 1 : -1)});
    if(next) return location.href.replace(/\?gallery=[0-9]+/, '?gallery=' + next);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}
// METADATA
// name: pecintakomik
// match: ^https?://www\.pecintakomik\.com/manga/[^/]*/[^/]*

var impl_src = {
  img: '.picture',
  next: '.pager a:nth-child(3)',
  numpages: 'select[name=page]',
  curpage: 'select[name=page]',
  nextchap: function(prev) {
    var next = extractInfo('select[name=chapter]', {type: 'value', val: (prev ? 1 : -1)});
    if(next) return window.location.href.replace(/\/([^\/]+)\/[0-9]+\/?$/, '/$1/' + next);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}
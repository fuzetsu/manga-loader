// METADATA
// name: imperialscans
// match: ^https?://imperialscans.com/read/.+

var impl_src = {
  img: '#page-img',
  next: '#page-url',
  curpage: function() {
    return extractInfo('#page-select', { type: 'index', val: -1 });
  },
  numpages: function() {
    return extractInfo('#page-select') - 1;
  },
  curchap: function() {
    var options = getEls('#chapter-select option:not([disabled])');
    var chapter = 1;
    options.some(function(value, index) {
      if (location.pathname === value.value) {
        chapter = options.length - index;
        return true;
      }
    });
    return chapter;
  },
  numchaps: function() {
    return extractInfo('#chapter-select');
  },
  nextchap: '#page-control > li:nth-child(5) > a',
  prevchap: '#page-control > li:nth-child(1) > a'
}
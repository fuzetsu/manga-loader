// METADATA
// match: https?://www\.mangasail\.com/[^/]+

var impl_src = {
  img: '#images img',
  next: '#images a',
  curpage: '#edit-select-page',
  numpages: '#edit-select-page',
  nextchap: function(prev) {
    return location.origin + '/node/' + extractInfo('#edit-select-node', {type: 'value', val: prev ? -1 : 1});
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  curchap: '#select_node',
  numchaps: '#select_node'
}
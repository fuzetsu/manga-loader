// METADATA
// name: manga-here
// match: ^https?://www.mangahere.c[oc]/manga/[^/]+/[^/]+

var impl_src = {
  img: '#viewer img:last-child',
  next: '#viewer a',
  numpages: 'select.wid60',
  curpage: 'select.wid60',
  numchaps: '#top_chapter_list',
  curchap: '#top_chapter_list',
  nextchap: function(prev) {
    var chapter = W.chapter_list[W.current_chapter_index + (prev ? -1 : 1)];
    return chapter && chapter[1];
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  wait: function() {
    return areDefined(W.current_chapter_index, W.chapter_list, getEl('#top_chapter_list'));
  }
}
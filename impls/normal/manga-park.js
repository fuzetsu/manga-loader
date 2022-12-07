// METADATA
// name: manga-park
// match: ^https?://mangapark\.me/manga/[^/]+/[^/]+/[^/]+

var impl_src = {
  img: '.img-link > img',
  next: '.page > span:last-child > a',
  numpages: function() {
    if(W.sel_load && W.sel_load.options[W.sel_load.selectedIndex].value) {
      return extractInfo('#sel_page_1');
    } else {
      var links = getEls('.img-link > img').map(function(img) { return img.src; });
      this.pages = function(url, num, cb, ex) {
        cb(links[num - 1], num);
      };
      return links.length;
    }
  },
  curpage: '#sel_page_1',
  nextchap: function(prev) {
    var next = extractInfo('#sel_book_1', {type: 'value', val: (prev ? -1 : 1)});
    if(next) return window.location.href.replace(/(\/manga\/[^\/]+).+$/, '$1' + next + '/1');
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  wait: '#sel_book_1 option'
}
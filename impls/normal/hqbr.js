// METADATA
// match: ^https?://hqbr.com.br/hqs/[^/]+/capitulo/[0-9]+/leitor/0

var impl_src = {
  img: '#hq-page',
  next: '#hq-page',
  numpages: function() {
    return W.pages.length;
  },
  curpage: function() {
    return W.paginaAtual + 1;
  },
  nextchap: function(prev) {
    var chapters = getEls('#chapter-dropdown a'),
        current = parseInt(W.capituloIndex),
        chapter = chapters[current + (prev ? -1 : 1)];
    return chapter && chapter.href;
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  pages: function(url, num, cb, ex) {
    cb(W.pages[num - 1], num);
  }
}
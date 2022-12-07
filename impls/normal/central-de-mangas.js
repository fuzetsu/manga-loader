// METADATA
// name: central-de-mangas
// match: ^https?://(centraldemangas\.org|[^\.]+\.com\.br/leitura)/online/[^/]*/[0-9]*

var impl_src = {
  img: '#manga-page',
  next: '#manga-page',
  numpages: '#manga_pages',
  curpage: '#manga_pages',
  nextchap: function(prev) {
    var next = extractInfo('#manga_caps', {type: 'value', val: (prev ? -1 : 1)});
    if(next) return window.location.href.replace(/[^\/]+$/, next);
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  pages: function(url, num, cb, ex) {
    url = url.slice(0, url.lastIndexOf('-') + 1) + ("0" + num).slice(-2) + url.slice(url.lastIndexOf('.'));
    cb(url, url);
  }
}
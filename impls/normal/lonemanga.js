// METADATA
// match: ^https?://lonemanga.com/manga/[^/]+/[^/]+

var impl_src = {
  img: '#imageWrapper img',
  next: '#imageWrapper a',
  numpages: '.viewerPage',
  curpage: '.viewerPage',
  nextchap: function(prev) {
    var next = extractInfo('.viewerChapter', {type:'value', val: (prev ? 1 : -1)});
    if(next) return location.href.replace(/\/manga\/([^/]+)\/.+$/, '/manga/$1/' + next);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}
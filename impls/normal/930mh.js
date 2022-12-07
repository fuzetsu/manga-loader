// METADATA
// name: 930mh
// match: http://www\.930mh\.com/manhua/\d+/\d+.html

var impl_src = {
  img: '#images > img',
  next: function() {
    return location.origin + location.pathname + '?p=' + (W.SinTheme.getPage() + 1);
  },
  pages: function(url, num, cb, ex) {
    cb(new URL(W.pageImage).origin + '/' + W.chapterPath + W.chapterImages[num - 1], num - 1);
  },
  curpage: function() {
    return W.SinTheme.getPage();
  },
  numpages: function() {
    return W.chapterImages.length;
  },
  nextchap: function(){
    return W.nextChapterData.id && W.nextChapterData.id > 0 ? W.comicUrl + W.nextChapterData.id + '.html' : null;
  },
  prevchap: function(){
    return W.prevChapterData.id && W.prevChapterData.id > 0 ? W.comicUrl + W.prevChapterData.id + '.html' : null;
  },
  wait: '#images > img'
}
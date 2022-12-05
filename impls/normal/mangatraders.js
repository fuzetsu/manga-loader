// METADATA
// name: mangatraders
// match: ^https?://mangatraders\\.biz/read-online/.+

var impl_src = {
  img: 'img.CurImage',
  next: '.image-container a',
  numpages: '.PageSelect',
  curpage: '.PageSelect',
  nextchap: function(prev) {
    var next = extractInfo('.ChapterSelect', {type:'text', val: (prev ? -1 : 1)});
    if(next) {
      var chapter = next.match(/[0-9.]+/)[0];
      return location.href.replace(/chapter-[0-9.]+/, 'chapter-' + chapter).replace(/page-[0-9]+/, 'page-1');
    }
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  URLregex: false
}
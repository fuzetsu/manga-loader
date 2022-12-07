// METADATA
// name: hentai-here
// match: ^https?://(www\.)?hentaihere.com/m/[^/]+/[0-9]+/[0-9]+

var impl_src = {
  img: '#arf-reader-img',
  next: reuse.na,
  curpage: function() {
      return parseInt(W.rff_thisIndex);
    },
  numpages: function() {
      return W.rff_imageList.length;
    },
  pages: function(url, num, cb, ex) {
      cb(W.imageCDN + W.rff_imageList[num - 1], num);
    },
  nextchap: function() {
      return W.rff_nextChapter;
    },
  prevchap: function() {
      return W.rff_previousChapter;
    },
  curchap: function() {
      var curchap;
      getEls('ul.dropdown-menu.text-left li').some(function(li, index) {
        if(getEl('a.bg-info', li)) {
          curchap = index + 1;
        }
      });
      return curchap;
    },
  numchaps: 'ul.dropdown-menu.text-left',
  wait: 'ul.dropdown-menu.text-left'
}
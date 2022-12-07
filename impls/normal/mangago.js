// METADATA
// name: mangago
// match: ^https?://(www.)?mangago.me/read-manga/[^/]+/[^/]+/[^/]+

var impl_src = {
  img: '#page1',
  next: '#pic_container',
  numpages: '#dropdown-menu-page',
  curpage: function() {
    return parseInt(getEls('#page-mainer a.btn.dropdown-toggle')[1].textContent.match(/[0-9]+/)[0]);
  },
  nextchap: function(prev) {
    var chapters = getEls('ul.dropdown-menu.chapter a'),
        curName = getEls('#page-mainer a.btn.dropdown-toggle')[0].textContent,
        curIdx;
    chapters.some(function(chap, idx) {
      if(chap.textContent.indexOf(curName) === 0) {
        curIdx = idx;
        return true;
      }
    });
    var chapter = chapters[curIdx + (prev ? 1 : -1)];
    return chapter && chapter.href;
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}
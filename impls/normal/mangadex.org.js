// METADATA
// match: ^https?://mangadex\.org/chapter/[0-9]+/[0-9]+

var impl_src = {
  img: '#current_page',
  next: function() {
    return this._base + ++this._page;
  },
  numpages: '#jump_page',
  curpage: '#jump_page',
  nextchap: function() {
    var chapter = document.querySelector('#jump_chapter').selectedOptions[0].previousElementSibling;
     return (chapter === null) ? false : (this._base.replace(/[0-9]+\/$/, chapter.value));
  },
  prevchap: function() {
    var chapter = document.querySelector('#jump_chapter').selectedOptions[0].nextElementSibling;
     return (chapter === null) ? false : (this._base.replace(/[0-9]+\/$/, chapter.value));
  },
  wait: function() {
    var loc = document.location.toString();
    var num = loc.match(/[0-9]+$/);
    this._base = loc.slice(0, -num.length);
    this._page = parseInt(num);
    return true;
  }
}
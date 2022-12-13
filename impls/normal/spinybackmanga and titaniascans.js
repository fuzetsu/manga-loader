// METADATA
// match: ^https?://(spinybackmanga.com/\?manga=[^&]+&chapter=.+|www\.titaniascans\.com/reader/.+/.+)

var impl_src = {
  img: '#thePicLink img',
  next: '#thePicLink',
  curpage: function() {
    return W.current;
  },
  numpages: function() {
    return getEl('#loadingbar tr').children.length;
  },
  curchap: function() {
    return parseInt(getEls('.selector')[1].firstChild.textContent.match(/[0-9]+/)[0]);
  },
  numchaps: function() {
    return getEls('.selector .options')[1].children.length;
  },
  nextchap: function(prev) {
    var nextChap = document.scripts[2].textContent.match(/location.href = "([^"]+)"/)[1];
    if(prev) {
      [].some.call(getEls('.selector .options')[1].children, function(child, index, children) {
        if(child.href === nextChap) {
          nextChap = children[index - 2] && children[index - 2].href;
          return true;
        }
      });
    }
    return nextChap;
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  pages: function(url, num, cb, ex) {
    var next = url.replace(/(?:(\/)2\/|[0-9]*)$/, '$1' + (num + 1));
    cb(W.imageArray[num - 1], next);
  }
}
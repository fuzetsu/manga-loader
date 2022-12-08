// METADATA
// match: META

var impl_src = {
  img: function() {
    return W.pages[W.current_page].url;
  },
  next: function() {
    return 'N/A';
  },
  numpages: function() {
    return W.pages.length;
  },
  curpage: function() {
    return W.current_page + 1;
  },
  nextchap: function(prev) {
    var desired;
    var dropdown = getEls('ul.dropdown')[1] || getEls('ul.uk-nav')[1] || getEls('ul.dropdown-menu')[3];
    if(!dropdown) return;
    getEls('a', dropdown).forEach(function(chap, idx, arr) {
      if(location.href.indexOf(chap.href) === 0) desired = arr[idx + (prev ? 1 : -1)];
    });
    return desired && desired.href;
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  pages: function(url, num, cb, ex) {
    cb(W.pages[num - 1].url, num);
  },
  wait: function() {
    if(W.location.href.indexOf('gomanga.co') !== -1) {
      var match = document.body.innerHTML.match(/(\w+)\[id\]\.url/);
      W.pages = match && match[1] && W[match[1]];
    }
    return W.pages;
  }
}
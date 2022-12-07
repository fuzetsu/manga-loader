// METADATA
// name: manga-stream
// match: ^https?://(readms|mangastream).(net|com)/(r|read)/[^/]*/[^/]*

var impl_src = {
  img: '#manga-page',
  next: '.next a',
  numpages: function() {
    var lastPage = getEl('.subnav-wrapper .controls .btn-group:last-child ul li:last-child');
    return parseInt(lastPage.textContent.match(/[0-9]/g).join(''), 10);
  },
  nextchap: function(prev) {
    var found;
    var chapters = [].slice.call(document.querySelectorAll('.controls > div:first-child > .dropdown-menu > li a'));
    chapters.pop();
    for (var i = 0; i < chapters.length; i++) {
      if (window.location.href.indexOf(chapters[i].href) !== -1) {
        found = chapters[i + (prev ? 1 : -1)];
        if (found) return found.href;
      }
    }
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}
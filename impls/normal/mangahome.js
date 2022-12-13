// METADATA
// match: https?://www\.mangahome\.com/manga/.+/.+

var impl_src = {
  img: '#image',
  next: '#viewer > a',
  curpage: '.mangaread-page select',
  numpages: '.mangaread-page select',
  nextchap: function(prev) {
    var buttons = getEls('.mangaread-footer .left > .btn-three');
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].textContent.indexOf(prev ? 'Prev Chapter' : 'Next Chapter') > - 1) {
        return buttons[i].href;
      }
    }
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  wait: '#image'
}
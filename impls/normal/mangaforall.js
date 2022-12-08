// METADATA
// match: https?://mangaforall.com/manga/[^/]+/[^/]+/

var impl_src = {
  img: '#page > img',
  next: '#page > img',
  numpages: '#chapter > div:nth-child(1) > div > div.uk-width-large-1-3.uk-width-medium-1-3.uk-width-small-1-1.uk-text-left.uk-text-center-small > div > div > div > ul',
  curpage: '#chapter > div:nth-child(1) > div > div.uk-width-large-1-3.uk-width-medium-1-3.uk-width-small-1-1.uk-text-left.uk-text-center-small > div > a.uk-button.uk-button-primary.number.uk-button-danger',
  nextchap: '#chapter > div:nth-child(5) > div.uk-grid.uk-grid-collapse.uk-margin-top > div.uk-width-large-1-3.uk-width-medium-1-3.uk-width-small-1-1.uk-text-left.uk-text-center-small > a',
  prevchap: '#chapter > div:nth-child(5) > div.uk-grid.uk-grid-collapse.uk-margin-top > div.uk-width-large-1-3.uk-width-medium-1-3.uk-width-small-1-1.uk-text-right.uk-text-center-small > a',
  pages: function(url, num, cb, ex) {
    cb(W.pages[num - 1].url, num);
  }
}
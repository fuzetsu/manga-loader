// METADATA
// name: hentaifr
// match: ^https?://hentaifr\\.net/.+\\.php\\?id=[0-9]+

var impl_src = {
  img: function(ctx, next) {
      var img = getEls('img[width]', ctx).filter(function(img) {
        return img.getAttribute('src').indexOf('contenu/doujinshis') !== -1;
      })[0];
      return next ? img : (img ? img.getAttribute('src') : null);
    },
  next: function(ctx) {
      var img = this.img(ctx, true);
      return img ? img.parentNode.getAttribute('href') : null;
    },
  wait: function() {
      return this.img() &&  this.next();
    },
  URLregex: false
}
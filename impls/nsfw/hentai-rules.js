// METADATA
// name: hentai-rules
// match: ^https?://www\\.hentairules\\.net/galleries[0-9]*/picture\\.php.+

var impl_src = {
  img: '#theMainImage',
  next: '#linkNext',
  imgmod: {
      altProp: 'data-src'
    },
  numpages: function(cur) {
      return parseInt(getEl('.imageNumber').textContent.replace(/([0-9]+)\/([0-9]+)/, cur ? '$1' : '$2'));
    },
  curpage: function() {
      return this.numpages(true);
    },
  URLregex: true
}
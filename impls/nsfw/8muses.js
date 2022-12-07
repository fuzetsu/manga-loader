// METADATA
// name: 8muses
// match: ^http(s)?://www.8muses.com/comix/picture/[^/]+/[^/]+/[^/]+/.+

var impl_src = {
  img: function(ctx) {
      var img = getEl('.photo img.image', ctx);
      return img ? img.src : getEl('#imageDir', ctx).value + getEl('#imageName', ctx).value;
    },
  next: '.photo > a',
  curpage: '#page-select-s',
  numpages: '#page-select-s'
}
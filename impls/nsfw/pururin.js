// METADATA
// match: https?://pururin\.us/read/.+

var impl_src = {
  img: 'img.image-next',
  next: 'a.image-next',
  numpages: function() {
      return Object.keys(chapters).length;
    },
  curpage: 'option:checked',
  pages: function(url, num, cb, ex) {
      cb(chapters[num].image, num);
    }
}
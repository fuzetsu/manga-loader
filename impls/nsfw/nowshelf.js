// METADATA
// match: ^https?://nowshelf.com/watch/[0-9]*

var impl_src = {
  img: '#image',
  next: '#image',
  numpages: function() {
      return parseInt(getEl('#page').textContent.slice(3), 10);
    },
  curpage: function() {
      return parseInt(getEl('#page > input').value, 10);
    },
  pages: function(url, num, cb, ex) {
      cb(page[num], num);
    }
}
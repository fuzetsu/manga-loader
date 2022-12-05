// METADATA
// name: manhua-dmzj
// match: ^https?://manhua.dmzj.com/[^/]*/[0-9]+(-[0-9]+)?\\.shtml

var impl_src = {
  img: '#center_box > img',
  next: '#center_box > img',
  numpages: function() {
    return W.arr_pages.length;
  },
  curpage: function() {
    var match = location.href.match(/page=([0-9]+)/);
    return match ? parseInt(match[1]) : 1;
  },
  nextchap: '#next_chapter',
  prevchap: '#prev_chapter',
  pages: function(url, num, cb, ex) {
    cb(W.img_prefix + W.arr_pages[num - 1], num);
  },
  wait: '#center_box > img',
  URLregex: true
}
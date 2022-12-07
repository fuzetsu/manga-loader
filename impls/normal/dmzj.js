// METADATA
// name: dmzj
// match: ^https?://www.dmzj.com/view/[^/]+/.+\.html

var impl_src = {
  img: '.comic_wraCon > img',
  next: '.comic_wraCon > img',
  numpages: function() {
    return parseInt(W.pic_total);
  },
  curpage: function() {
    var match = location.href.match(/page=([0-9])/);
    return match ? parseInt(match[1]) : 1;
  },
  nextchap: '.next > a',
  prevchap: '.pre > a',
  pages: function(url, num, cb, ex) {
    cb(W.img_prefix + W.picArry[num - 1], num);
  },
  wait: '.comic_wraCon > img'
}
// METADATA
// match: ^https?://(fan|manga)fox.(me|la|net)/manga/[^/]*/[^/]*/[^/]*

var impl_src = {
  img: '.reader-main img',
  next: '.pager-list-left > span > a:last-child',
  numpages: function() { return W.imagecount; },
  curpage: function () { return W.imagepage; },
  nextchap: '.pager-list-left > a:last-child',
  prevchap: '.pager-list-left > a:first-child',
  imgURLs: [],
  pages: function(url, num, cb, ex) {
    var imp = this;
    if (this.imgURLs[num])
      cb(this.imgURLs[num], num);
    else
      ajax({
        url: 'chapterfun.ashx?cid=' + W.chapterid + '&page=' + num,
        onload: function(e) {
          eval(e.target.responseText);
          for (var i = 0; i < d.length; i++) {
            imp.imgURLs[num + i] = d[i];
          }
          cb(d[0], num);
        }
      });
  },
  wait: function () {
    el = getEl('.reader-main img');

    return el && el.getAttribute('src') != el.getAttribute('data-loading-img');
  }
}
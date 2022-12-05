// METADATA
// name: fakku
// match: ^http(s)?://www.fakku.net/.*/.*/read

var impl_src = {
  img: '.current-page',
  next: '.current-page',
  numpages: '.drop',
  curpage: '.drop',
  pages: function(url, num, cb, ex) {
      var firstNum = url.lastIndexOf('/'),
          lastDot = url.lastIndexOf('.');
      var c = url.charAt(firstNum);
      while (c && !/[0-9]/.test(c)) {
        c = url.charAt(++firstNum);
      }
      var curPage = parseInt(url.slice(firstNum, lastDot), 10);
      url = url.slice(0, firstNum) + ('00' + (curPage + 1)).slice(-3) + url.slice(lastDot);
      cb(url, url);
    },
  URLregex: false
}
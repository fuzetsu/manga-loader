// METADATA
// name: mymh8
// match: ^https?://(www\\.)?mymh8\\.com/chapter/.+

var impl_src = {
  img: '#viewimg',
  next: reuse.na,
  numpages: function() {
    return W.maxpages;
  },
  curpage: '#J_showpage > span',
  nextchap: function(prev) {
    var button = prev ? getEl('div.m3p > input:first-of-type') : getEl('div.m3p > input:last-of-type');
    return button && button.attributes.onclick.value.match(/\.href='([^']+)'/)[1];
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  pages: function(url, num, cb, ex) {
    cb(W.WebimgServerURL[0] + W.imageslist[num], num);
  },
  wait: function() {
    return W.imageslist.length > 0;
  },
  URLregex: false
}
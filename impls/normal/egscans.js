// METADATA
// match: ^https?://read.egscans.com/.+

var impl_src = {
  img: '#image_frame img',
  next: '#image_frame img',
  curpage: 'select[name=page]',
  numpages: 'select[name=page]',
  nextchap: function(prev) {
    var data = getEl(this.curchap).getAttribute('onchange').match(/'[^']+'/g);
    var next = extractInfo(this.curchap, { type: 'value', val: (prev ? -1 : 1) });
    if(next) return location.origin + '/' + data[0].slice(1, -1) + '/' + next;
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  curchap: 'select[name=chapter]',
  numchaps: 'select[name=chapter]',
  pages: function(url, num, cb, ex) {
    cb('/' + W.img_url[num], num);
  }
}
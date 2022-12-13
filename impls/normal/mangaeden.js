// METADATA
// match: ^https?://(www\.)?mangaeden\.com/(en|it)/(en|it)-manga/.+

var impl_src = {
  img: '#mainImg',
  next: '#nextA',
  numpages: '#pageSelect',
  curpage: '#pageSelect',
  numchaps: '#combobox',
  curchap: '#combobox',
  invchap: true,
  nextchap: function (prev) {
    var cbox = getEl('#combobox');
    var opt = cbox[prev ? cbox.selectedIndex + 1 : cbox.selectedIndex - 1];
    var span = getEl('span.hideM0 a');
    return opt && span && span.href + parseInt(opt.value) + '/1/';
  },
  prevchap: function () {
    return this.nextchap(true);
  }
}
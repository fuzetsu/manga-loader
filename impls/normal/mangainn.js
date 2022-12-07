// METADATA
// name: mangainn
// match: ^https?://www.mangainn.net/manga/chapter/.+

var impl_src = {
  img: '#imgPage',
  next: function() {
    if(!this._count) this._count = extractInfo(this.curpage, {type: 'value'});
    var url = location.href;
    if(!/page_[0-9]+/.test(url)) url += '/page_1';
    return url.replace(/page_[0-9]+/, 'page_' + (++this._count));
  },
  numpages: '#cmbpages',
  curpage: '#cmbpages',
  nextchap: function(prev) {
    var next = extractInfo('#chapters', {type:'value', val: (prev ? -1 : 1)});
    if(next) return location.href.replace(/\/chapter\/.+$/, '/chapter/' + next + '/page_1');
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}
// METADATA
// match: ^https?://bato.to/reader.*

var impl_src = {
  img: function(ctx) {
    var img = getEl('#comic_page', ctx);
    if(img) {
      return img.src;
    } else {
      var imgs = getEls('#content > div:nth-child(8) > img', ctx).map(function(page) {
        return page.src;
      });
      if(imgs.length > 0) {
        this.next = function() { return imgs[0]; };
        this.numpages = function() { return imgs.length; };
        this.pages = function(url, num, cb, ex) {
          cb(imgs[num - 1], num);
        };
        return imgs[0];
      }
    }
  },
  next: function() {
    if(!this._numpage) {
      this._numpage = extractInfo(this.curpage, {type: 'index'});
      this._id = location.hash.split('_')[0].slice(1);
    }
    return '/areader?id=' + this._id + '&p=' + (++this._numpage);
  },
  numpages: '#page_select',
  curpage: '#page_select',
  curchap: 'select[name=chapter_select]',
  numchaps: 'select[name=chapter_select]',
  nextchap: function(prev) {
    //var link = extractInfo('select[name=chapter_select]', {type: 'value', val: prev ? 1 : -1});
    //return link && link.replace(/https?/, document.location.href.split(':')[0]); // fix for batotos broken https pages
    var menu = getEls('div.moderation_bar > ul > li', getEl('#reader'));
    for (var i = 0; i != menu.length; i += 1) {
      var img = getEl('img', menu[i]);
      if (img && img.title == (prev ? "Previous Chapter" : "Next Chapter")) {
        return img.parentNode.href.replace(/https?/, document.location.href.split(':')[0]);
      }
    }
    return null;
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  wait: '#comic_page'
}
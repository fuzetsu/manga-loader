// METADATA
// match: https?://(www\.)?(cartoonmad|comicnad)\.com/comic/[0-9]+\.html

var impl_src = {
  img: 'tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td > a > img',
  next: 'a.onpage+a',
  curpage: 'a.onpage',
  numpages: function() {
    return extractInfo('select[name=jump]') - 1;
  },
  nextchap: function() {
    let filter = getEls('.pages').filter(function(i) {
      return i.textContent.match('下一話');
    });
    return filter.length ? filter[0].href : null;
  },
  prevchap: function() {
    let filter = getEls('.pages').filter(function(i) {
        return i.textContent.match('上一話');
    });
    return filter.length ? filter[0].href : null;
  },
  
}
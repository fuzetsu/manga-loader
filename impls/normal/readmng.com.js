// METADATA
// match: ^https?://www\.readmng\.com/[^/]+/.+

var impl_src = {
  img: '.page_chapter-2 img',
  next: '.list-switcher-2 > li:nth-child(3) > a, .list-switcher-2 > li:nth-child(2) > a',
  numpages: '.list-switcher-2 select[name=category_type]',
  curpage: '.list-switcher-2 select[name=category_type]',
  nextchap: '.jump-menu[name=chapter_list]',
  prevchap: '.jump-menu[name=chapter_list]',
  invchap: true
}
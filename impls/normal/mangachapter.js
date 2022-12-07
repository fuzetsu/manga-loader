// METADATA
// name: mangachapter
// match: ^https?://www\.mangachapter\.me/[^/]+/[^/]+/[^/]+.html

var impl_src = {
  img: '#mangaImg, #viewer > table > tbody > tr > td:nth-child(1) > a:nth-child(2) > img',
  next: '.page-select + a.button-page',
  numpages: '.page-select select',
  curpage: '.page-select select',
  invchap: true,
  nextchap: '#top_chapter_list',
  prevchap: '#top_chapter_list',
  wait: '#top_chapter_list'
}
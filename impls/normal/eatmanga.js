// METADATA
// name: eatmanga
// match: ^https?://eatmanga.com/Manga-Scan/[^/]+/.+

var impl_src = {
  img: '#eatmanga_image, #eatmanga_image_big',
  next: '#page_next',
  numpages: '#pages',
  curpage: '#pages',
  nextchap: '#bottom_chapter_list',
  prevchap: '#bottom_chapter_list',
  invchap: true,
  URLregex: false
}
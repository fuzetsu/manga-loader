// METADATA
// name: manga-panda
// match: ^https?://www.mangapanda.com/.*/[0-9]*

var impl_src = {
  img: '#img',
  next: '.next a',
  numpages: '#pageMenu',
  curpage: '#pageMenu',
  nextchap: '#mangainfofooter > #mangainfo_bas table tr:first-child a',
  prevchap: '#mangainfofooter > #mangainfo_bas table tr:last-child a',
  URLregex: true
}
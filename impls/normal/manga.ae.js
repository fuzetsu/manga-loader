// METADATA
// name: manga.ae
// match: https?://www.manga.ae/[^/]+/[^/]+/

var impl_src = {
  img: '#showchaptercontainer img',
  next: '#showchaptercontainer a',
  curpage: 'a.chpage',
  nextchap: '.chapter:last-child',
  prevchap: '.chapter:first-child',
  URLregex: false
}
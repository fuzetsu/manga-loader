// METADATA
// name: br.mangahost.com
// match: ^http(s)?://br.mangahost.com/manga/[^/]+/.+

var impl_src = {
  img: 'img.open',
  next: '.image-content > a',
  curpage: '.viewerPage',
  numpages: '.viewerPage',
  URLregex: false
}
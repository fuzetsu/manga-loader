// METADATA
// name: biamamscans.com
// match: ^https?://biamamscans\.com/read/.+

var impl_src = {
  //nextchap and prevchap broken
  img: '.manga-image',
  next: 'span.float-right:nth-child(2) > div:nth-child(2) > a:nth-child(1)',
  numpages: '#page-select',
  curpage: '#page-select',
  nextchap: '#chapter-select',
  prevchap: '#chapter-select'
}
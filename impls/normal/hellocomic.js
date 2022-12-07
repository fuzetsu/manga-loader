// METADATA
// name: hellocomic
// match: https?://hellocomic.com/[^/]+/[^/]+/p[0-9]+

var impl_src = {
  img: '.coverIssue img',
  next: '.coverIssue a',
  numpages: '#e1',
  curpage: '#e1',
  nextchap: '#e2',
  prevchap: '#e2',
  curchap: '#e2',
  numchaps: '#e2'
}
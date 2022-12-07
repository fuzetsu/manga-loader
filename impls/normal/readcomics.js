// METADATA
// name: readcomics
// match: https?://(www\.)?readcomics\.tv/.+/chapter-[0-9]+(/[0-9]+|$)

var impl_src = {
  img: '#main_img',
  next: '.nav.next',
  curpage: 'select[name=page_select]',
  numpages: 'select[name=page_select]',
  nextchap: 'select[name=chapter_select]',
  prevchap: 'select[name=chapter_select]',
  curchap: 'select[name=chapter_select]',
  numchaps: 'select[name=chapter_select]',
  wait: 'select[name=page_select]'
}
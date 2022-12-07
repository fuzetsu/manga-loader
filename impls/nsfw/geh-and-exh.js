// METADATA
// name: geh-and-exh
// match: ^https?://(e-hentai|exhentai).org/s/.*/.*

var impl_src = {
  img: '.sni > a > img, #img',
  next: '.sni > a, #i3 a',
  numpages: 'div.sn > div > span:nth-child(2)',
  curpage: 'div.sn > div > span:nth-child(1)'
}
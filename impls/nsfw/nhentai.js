// METADATA
// name: nhentai
// match: ^https?://nhentai\.net\/g\/[0-9]+/[0-9]+

var impl_src = {
  img: '#image-container > a img',
  next: '#image-container > a',
  numpages: '.num-pages',
  curpage: '.current',
  imgmod: {
      altProp: 'data-cfsrc'
    },
  
}
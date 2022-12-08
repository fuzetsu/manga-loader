// METADATA
// match: ^https?://(www|comic|comic2|comic3).kukudm.com/comiclist/[0-9]+/[0-9]+/[0-9]+.htm

var impl_src = {
  img: function(ctx) {
    var script = getEl('td > script[language=javascript]', ctx);
    if(script) {
      return 'http://n.kukudm.com/' + script.textContent.match(/\+"([^']+)/)[1];
    }
  },
  next: function(ctx) {
    var links = getEls('td > a', ctx);
    return links[links.length - 1].getAttribute('href');
  },
  numpages: function(cur) {
    return parseInt(document.body.textContent.match(/共([0-9]+)页/)[1]);
  },
  curpage: function() {
    return parseInt(document.body.textContent.match(/第([0-9]+)页/)[1]);
  },
  beforexhr: reuse.encodeChinese
}
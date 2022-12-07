// METADATA
// name: foolslide
// match: ^https?://(" + [
    "manga.redhawkscans.com/reader/read/.+",
    "reader.s2smanga.com/read/.+",
    "casanovascans.com/read/.+",
    "reader.vortex-scans.com/read/.+",
    "reader.roseliascans.com/read/.+",
    "mangatopia.net/slide/read/.+",
    "www.twistedhelscans.com/read/.+",
    "sensescans.com/reader/read/.+",
    "reader.kireicake.com/read/.+",
    "substitutescans.com/reader/read/.+",
    "mangaichiscans.mokkori.fr/fs/read/.+",
    "reader.shoujosense.com/read/.+",
    "www.friendshipscans.com/slide/read/.+",
    "manga.famatg.com/read/.+",
    "www.demonicscans.com/FoOlSlide/read/.+",
    "necron99scans.com/reader/read/.+",
    "www.demonicscans.com/FoOlSlide/read/.+",
    "reader.psscans.info/read/.+",
    "otscans.com/foolslide/read/.+",
    "necron99scans.com/reader/read/.+",
    "manga.inpowerz.com/read/.+",
    "reader.evilflowers.com/read/.+",
    "reader.cafeconirst.com/read/.+",
    "kobato.hologfx.com/reader/read/.+",
    "jaiminisbox.com/reader/read/.+",
    "abandonedkittenscans.mokkori.fr/reader/read/.+",
    "gomanga.co/reader/read/.+",
    "reader\.manga-download\.org/read/.+",
    "(www\.)?manga-ar\.net/manga/.+/.+/.+",
    "helveticascans.com/r/read/.+",
    "reader.thecatscans.com/read/.+",
    "yonkouprod.com/reader/read/.+",
    "reader.championscans.com/read/.+",
    "reader.whiteoutscans.com/read/.+",
    "hatigarmscans.eu/hs/read/.+",
    "lector.kirishimafansub.com/lector/read/.+",
    "hotchocolatescans.com/fs/read/.+",
    "www.slide.world-three.org/read/.+",
  ].join('|') + ")

var impl_src = {
  img: function() {
    return W.pages[W.current_page].url;
  },
  next: function() {
    return 'N/A';
  },
  numpages: function() {
    return W.pages.length;
  },
  curpage: function() {
    return W.current_page + 1;
  },
  nextchap: function(prev) {
    var desired;
    var dropdown = getEls('ul.dropdown')[1] || getEls('ul.uk-nav')[1] || getEls('ul.dropdown-menu')[3];
    if(!dropdown) return;
    getEls('a', dropdown).forEach(function(chap, idx, arr) {
      if(location.href.indexOf(chap.href) === 0) desired = arr[idx + (prev ? 1 : -1)];
    });
    return desired && desired.href;
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  pages: function(url, num, cb, ex) {
    cb(W.pages[num - 1].url, num);
  },
  wait: function() {
    if(W.location.href.indexOf('gomanga.co') !== -1) {
      var match = document.body.innerHTML.match(/(\w+)\[id\]\.url/);
      W.pages = match && match[1] && W[match[1]];
    }
    return W.pages;
  }
}
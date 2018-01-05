// ==UserScript==
// @name       Manga Loader
// @namespace  http://www.fuzetsu.com/MangaLoader
// @version    1.11.15
// @description  Support for over 70 sites! Loads manga chapter into one page in a long strip format, supports switching chapters, minimal script with no dependencies, easy to implement new sites, loads quickly and works on mobile devices through bookmarklet
// @copyright  2016+, fuzetsu
// @noframes
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @match *://bato.to/reader*
// @match *://mangafox.me/manga/*/*/*
// @match *://mangafox.la/manga/*/*/*
// @match *://readms.net/r/*/*
// @match *://readms.net/read/*/*
// @match *://mangastream.com/r/*/*/*/*
// @match *://mangastream.com/read/*/*/*/*
// @match *://www.mangareader.net/*/*
// @match *://*.mangahere.co/manga/*/*
// @match *://*.mangahere.cc/manga/*/*
// @match *://www.mangapanda.com/*/*
// @match *://mangapark.me/manga/*/*/*
// @match *://mngcow.co/*/*
// @match *://centraldemangas.org/online/*/*
// @match *://*.com.br/leitura/online/capitulo/*
// @match *://www.mangatown.com/manga/*/*
// @match *://manga-joy.com/*/*
// @match *://*.dm5.com/m*
// @match *://*.senmanga.com/*/*
// @match *://www.japscan.com/lecture-en-ligne/*
// @match *://www.pecintakomik.com/manga/*/*
// @match *://mangawall.com/manga/*/*
// @match *://manga.animea.net/*
// @match *://kissmanga.com/Manga/*/*
// @match *://view.thespectrum.net/series/*
// @match *://manhua.dmzj.com/*/*
// @match *://hqbr.com.br/hqs/*/capitulo/*/leitor/0
// @match *://www.dmzj.com/view/*/*
// @match *://mangaindo.id/*/*
// @match *://mangadoom.co/*/*
// @match *://*.mangago.me/read-manga/*/*
// @match *://mangalator.ch/show.php?gallery=*
// @match *://eatmanga.com/Manga-Scan/*/*
// @match *://www.mangacat.me/*/*/*
// @match *://www.mangahen.com/*/*
// @match *://www.readmng.com/*/*
// @match *://mangatraders.biz/read-online/*
// @match *://www.mangainn.net/manga/chapter/*
// @match *://*.kukudm.com/comiclist/*/*
// @match *://www.mangamap.com/*/*
// @match *://www.mangachapter.me/*/*/*.html
// @match *://kawaii.ca/reader/*
// @match *://lonemanga.com/manga/*/*
// @match *://read.egscans.com/om/manga/*/*
// @match *://manga.madokami.al/reader/*
// @match *://read.egscans.com/*
// @match *://imperialscans.com/read/*
// @match *://www.chuixue.com/manhua/*/*
// @match *://www.sh-arab.com/manga/*
// @match *://spinybackmanga.com/*
// @match *://br.mangahost.com/manga/*/*
// @match *://www.manga.ae/*/*/*
// @match *://mangaforall.com/manga/*/*/*
// @match *://hellocomic.com/*/*/*
// @match *://www.3asq.info/*/*
// @match *://*.readcomiconline.to/Comic/*
// @match *://*.moonbunnycafe.com/*
// @match *://*.mangaeden.com/*
// @match *://*.comicastle.org/read-*
// @match *://*.mymh8.com/chapter/*
// @match *://*.unionmangas.net/leitor/*
// @match *://*.otakusmash.com/*/*
// @match *://*.mangahome.com/manga/*/*
// @match *://*.readcomics.tv/*/chapter*
// @match *://*.cartoonmad.com/comic/*
// @match *://*.comicnad.com/comic/*
// @match *://*.ikanman.com/comic/*/*
// @match *://*.manhuagui.com/comic/*/*
// @match *://*.mangasail.com/*
// @match *://*.mangatail.com/*
// @match *://*.titaniascans.com/reader/*/*
// @match *://*.komikstation.com/*/*/*
// @match *://*.gmanga.me/mangas/*/*/*
// -- FOOLSLIDE START
// @match *://manga.redhawkscans.com/reader/read/*
// @match *://reader.s2smanga.com/read/*
// @match *://casanovascans.com/read/*
// @match *://reader.vortex-scans.com/read/*
// @match *://reader.roseliascans.com/read/*
// @match *://mangatopia.net/slide/read/*
// @match *://www.twistedhelscans.com/read/*
// @match *://sensescans.com/reader/read/*
// @match *://reader.kireicake.com/read/*
// @match *://substitutescans.com/reader/read/*
// @match *://mangaichiscans.mokkori.fr/fs/read/*
// @match *://reader.shoujosense.com/read/*
// @match *://www.friendshipscans.com/slide/read/*
// @match *://manga.famatg.com/read/*
// @match *://www.demonicscans.com/FoOlSlide/read/*
// @match *://reader.psscans.info/read/*
// @match *://otscans.com/foolslide/read/*
// @match *://necron99scans.com/reader/read/*
// @match *://manga.inpowerz.com/read/*
// @match *://reader.evilflowers.com/read/*
// @match *://reader.cafeconirst.com/read/*
// @match *://kobato.hologfx.com/reader/read/*
// @match *://abandonedkittenscans.mokkori.fr/reader/read/*
// @match *://jaiminisbox.com/reader/read/*
// @match *://*.gomanga.co/reader/read/*
// @match *://reader.manga-download.org/read/*/*
// @match *://*.manga-ar.net/manga/*/*/*
// @match *://*.helveticascans.com/reader/read/*
// @match *://reader.thecatscans.com/read/*
// @match *://yonkouprod.com/reader/read/*
// @match *://reader.championscans.com/read/*
// @match *://reader.whiteoutscans.com/read/*
// -- FOOLSLIDE END
// ==/UserScript==

// short reference to unsafeWindow (or window if unsafeWindow is unavailable e.g. bookmarklet)
var W = (typeof unsafeWindow === 'undefined') ? window : unsafeWindow;

var scriptName = 'Manga Loader';
var pageTitle = document.title;

var IMAGES = {
  refresh_large: 'data:image/svg+xml;charset=utf-8,<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1639 1056q0 5-1 7-64 268-268 434.5t-478 166.5q-146 0-282.5-55t-243.5-157l-129 129q-19 19-45 19t-45-19-19-45v-448q0-26 19-45t45-19h448q26 0 45 19t19 45-19 45l-137 137q71 66 161 102t187 36q134 0 250-65t186-179q11-17 53-117 8-23 30-23h192q13 0 22.5 9.5t9.5 22.5zm25-800v448q0 26-19 45t-45 19h-448q-26 0-45-19t-19-45 19-45l138-138q-148-137-349-137-134 0-250 65t-186 179q-11 17-53 117-8 23-30 23h-199q-13 0-22.5-9.5t-9.5-22.5v-7q65-268 270-434.5t480-166.5q146 0 284 55.5t245 156.5l130-129q19-19 45-19t45 19 19 45z" fill="#fff"/></svg>'
};

// reusable functions to insert in implementations
var reuse = {
  encodeChinese: function(xhr) {
    xhr.overrideMimeType('text/html;charset=gbk');
  },
  na: function() {
    return 'N/A';
  }
};

/**
Sample Implementation:
{
    name: 'something' // name of the implementation
  , match: "^https?://domain.com/.*" // the url to react to for manga loading
  , img: '#image' // css selector to get the page's manga image
  , next: '#next_page' // css selector to get the link to the next page
  , numpages: '#page_select' // css selector to get the number of pages. elements like (select, span, etc)
  , curpage: '#page_select' // css selector to get the current page. usually the same as numPages if it's a select element
  , numchaps: '#chapters' // css selector to get the number of chapters in manga
  , curchap: '#chapters' // css selector to get the number of the current chapter
  , nextchap: '#next_chap' // css selector to get the link to the next chapter
  , prevchap: '#prev_chap' // same as above except for previous
  , wait: 3000 // how many ms to wait before auto loading (to wait for elements to load), or a css selector to keep trying until it returns an elem
  , pages: function(next_url, current_page_number, callback, extract_function) {
    // gets called requesting a certain page number (current_page_number)
    // to continue loading execute callback with img to append as first parameter and next url as second parameter
    // only really needs to be used on sites that have really unusual ways of loading images or depend on javascript
  }

  Any of the CSS selectors can be functions instead that return the desired value.
}
*/

var implementations = [{
  name: 'batoto',
  match: "^https?://bato.to/reader.*",
  img: function(ctx) {
    var img = getEl('#comic_page', ctx);
    if(img) {
      return img.src;
    } else {
      var imgs = getEls('#content > div:nth-child(8) > img', ctx).map(function(page) {
        return page.src;
      });
      if(imgs.length > 0) {
        this.next = function() { return imgs[0]; };
        this.numpages = function() { return imgs.length; };
        this.pages = function(url, num, cb, ex) {
          cb(imgs[num - 1], num);
        };
        return imgs[0];
      }
    }
  },
  next: function() {
    if(!this._numpage) {
      this._numpage = extractInfo(this.curpage, {type: 'index'});
      this._id = location.hash.split('_')[0].slice(1);
    }
    return '/areader?id=' + this._id + '&p=' + (++this._numpage);
  },
  numpages: '#page_select',
  curpage: '#page_select',
  curchap: 'select[name=chapter_select]',
  numchaps: 'select[name=chapter_select]',
  nextchap: function(prev) {
    //var link = extractInfo('select[name=chapter_select]', {type: 'value', val: prev ? 1 : -1});
    //return link && link.replace(/https?/, document.location.href.split(':')[0]); // fix for batotos broken https pages
    var menu = getEls('div.moderation_bar > ul > li', getEl('#reader'));
    for (var i = 0; i != menu.length; i += 1) {
      var img = getEl('img', menu[i]);
      if (img && img.title == (prev ? "Previous Chapter" : "Next Chapter")) {
        return img.parentNode.href.replace(/https?/, document.location.href.split(':')[0]);
      }
    }
    return null;
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  wait: '#comic_page'
}, {
  name: 'manga-panda',
  match: "^https?://www.mangapanda.com/.*/[0-9]*",
  img: '#img',
  next: '.next a',
  numpages: '#pageMenu',
  curpage: '#pageMenu',
  nextchap: '#mangainfofooter > #mangainfo_bas table tr:first-child a',
  prevchap: '#mangainfofooter > #mangainfo_bas table tr:last-child a'
}, {
  name: 'mangafox',
  match: "^https?://mangafox.(me|la)/manga/[^/]*/[^/]*/[^/]*",
  img: '.read_img img',
  next: '.read_img a',
  numpages: function() {
    return extractInfo('select.m') - 1;
  },
  curpage: 'select.m',
  nextchap: '#chnav p + p a',
  prevchap: '#chnav a'
}, {
  name: 'manga-stream',
  match: "^https?://(readms|mangastream).(net|com)/(r|read)/[^/]*/[^/]*",
  img: '#manga-page',
  next: '.next a',
  numpages: function() {
    var lastPage = getEl('.subnav-wrapper .controls .btn-group:last-child ul li:last-child');
    return parseInt(lastPage.textContent.match(/[0-9]/g).join(''), 10);
  },
  nextchap: function(prev) {
    var found;
    var chapters = [].slice.call(document.querySelectorAll('.controls > div:first-child > .dropdown-menu > li a'));
    chapters.pop();
    for (var i = 0; i < chapters.length; i++) {
      if (window.location.href.indexOf(chapters[i].href) !== -1) {
        found = chapters[i + (prev ? 1 : -1)];
        if (found) return found.href;
      }
    }
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'manga-reader',
  match: "^https?://www.mangareader.net/.*/.*",
  img: '#img',
  next: '.next a',
  numpages: '#pageMenu',
  curpage: '#pageMenu',
  nextchap: '#chapterMenu',
  prevchap: '#chapterMenu',
  wait: '#chapterMenu option'
}, {
  name: 'manga-town',
  match: "^https?://www.mangatown.com/manga/[^/]+/[^/]+",
  img: '#image',
  next: '#viewer a',
  numpages: '.page_select select',
  curpage: '.page_select select',
  nextchap: '#top_chapter_list',
  prevchap: '#top_chapter_list',
  wait: 1000
}, {
  name: 'manga-cow, manga-doom, manga-indo, 3asq.info, moonbunnnycafe',
  match: "^https?://(mngcow|mangadoom|mangaindo|www\\.3asq|moonbunnycafe)\\.(co|id|info|com)/[^/]+/[0-9.]+",
  img: '.prw a > img',
  next: '.prw a',
  numpages: 'select.cbo_wpm_pag',
  curpage: 'select.cbo_wpm_pag',
  nextchap: function(prev) {
    var next = extractInfo('select.cbo_wpm_chp', {type: 'value', val: (prev ? 1 : -1)});
    if(next) return window.location.href.replace(/\/[0-9.]+\/?([0-9]+\/?)?[^/]*$/, '/' + next);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'manga-here',
  match: "^https?://www.mangahere.c[oc]/manga/[^/]+/[^/]+",
  img: '#viewer img:last-child',
  next: '#viewer a',
  numpages: 'select.wid60',
  curpage: 'select.wid60',
  numchaps: '#top_chapter_list',
  curchap: '#top_chapter_list',
  nextchap: function(prev) {
    var chapter = W.chapter_list[W.current_chapter_index + (prev ? -1 : 1)];
    return chapter && chapter[1];
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  wait: function() {
    return areDefined(W.current_chapter_index, W.chapter_list, getEl('#top_chapter_list'));
  }
}, {
  name: 'manga-here mobile',
  match: "^https?://m.mangahere.c[oc]/manga/[^/]+/[^/]+",
  img: '#image',
  next: '#viewer a',
  numpages: '.mangaread-page',
  curpage: '.mangaread-page'
}, {
  name: 'manga-park',
  match: "^https?://mangapark\\.me/manga/[^/]+/[^/]+/[^/]+",
  img: '.img-link > img',
  next: '.page > span:last-child > a',
  numpages: function() {
    if(W.sel_load && W.sel_load.options[W.sel_load.selectedIndex].value) {
      return extractInfo('#sel_page_1');
    } else {
      var links = getEls('.img-link > img').map(function(img) { return img.src; });
      this.pages = function(url, num, cb, ex) {
        cb(links[num - 1], num);
      };
      return links.length;
    }
  },
  curpage: '#sel_page_1',
  nextchap: function(prev) {
    var next = extractInfo('#sel_book_1', {type: 'value', val: (prev ? -1 : 1)});
    if(next) return window.location.href.replace(/(\/manga\/[^\/]+).+$/, '$1' + next + '/1');
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  wait: '#sel_book_1 option'
}, {
  name: 'central-de-mangas',
  match: "^https?://(centraldemangas\\.org|[^\\.]+\\.com\\.br/leitura)/online/[^/]*/[0-9]*",
  img: '#manga-page',
  next: '#manga-page',
  numpages: '#manga_pages',
  curpage: '#manga_pages',
  nextchap: function(prev) {
    var next = extractInfo('#manga_caps', {type: 'value', val: (prev ? -1 : 1)});
    if(next) return window.location.href.replace(/[^\/]+$/, next);
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  pages: function(url, num, cb, ex) {
    url = url.slice(0, url.lastIndexOf('-') + 1) + ("0" + num).slice(-2) + url.slice(url.lastIndexOf('.'));
    cb(url, url);
  }
}, {
  name: 'manga-joy',
  match: "^https?://manga-joy.com/[^/]*/[0-9]*",
  img: '.prw img',
  next: '.nxt',
  numpages: '.wpm_nav_rdr li:nth-child(3) > select',
  curpage: '.wpm_nav_rdr li:nth-child(3) > select',
  nextchap: function(prev) {
    var next = extractInfo('.wpm_nav_rdr li:nth-child(2) > select', {type: 'value', val: prev ? 1 : -1});
    if(next) return window.location.href.replace(/\/[0-9.]+\/?([0-9]+(\/.*)?)?$/, '/' + next);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'dm5',
  match: "^https?://[^\\.]*\\.dm5\\.com/m[0-9]*",
  img: '#cp_image',
  next: '#cp_image',
  numpages: function () {
    return getEls('a', getEl('.pageBar')).length;
  },
  curpage: function() {
    return parseInt(getEl('.pageBar .active').dataset.pgt);
  },
  pages: function(url, num, cb, ex) {
    var cid = window.location.href.match(/m[0-9]*/g)[2].slice(1),
        xhr = new XMLHttpRequest();
    xhr.open('get', 'chapterfun.ashx?cid=' + cid + '&page=' + num);
    xhr.onload = function() {
      var images = eval(xhr.responseText);
      cb(images[0], images[0]);
    };
    xhr.send();
  },
  nextchap: 'a.logo_2',
  prevchap: 'a.logo_1',
  wait: '#cp_image'
}, {
  name: 'senmanga',
  match: "^https?://[^\\.]+\\.senmanga\\.com/[^/]*/.+",
  img: '#picture',
  next: '#reader > a',
  numpages: 'select[name=page]',
  curpage: 'select[name=page]',
  numchaps: 'select[name=chapter]',
  curchap: 'select[name=chapter]',
  nextchap: function(prev) {
    var next = extractInfo('select[name=chapter]', {type: 'value', val: (prev ? 1 : -1)});
    if(next) {
      var manga = window.location.pathname.slice(1).split('/')[0];
      return window.location.origin + '/' + manga + '/' + next + '/1';
    }
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'japscan',
  match: "^https?://www\\.japscan\\.com/lecture-en-ligne/[^/]*/[0-9]*",
  img: '#image',
  next: '#img_link',
  numpages: '#pages',
  curpage: '#pages',
  nextchap: '#next_chapter',
  prevchap: '#back_chapter'
}, {
  name: 'pecintakomik',
  match: "^https?://www\\.pecintakomik\\.com/manga/[^/]*/[^/]*",
  img: '.picture',
  next: '.pager a:nth-child(3)',
  numpages: 'select[name=page]',
  curpage: 'select[name=page]',
  nextchap: function(prev) {
    var next = extractInfo('select[name=chapter]', {type: 'value', val: (prev ? 1 : -1)});
    if(next) return window.location.href.replace(/\/([^\/]+)\/[0-9]+\/?$/, '/$1/' + next);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'manga-kaka',
  match: "^https?://www\\.(mangahen|mangamap)\\.com/[^/]+/[0-9]+",
  img: 'img.manga-page',
  next: '.nav_pag > li:nth-child(1) > a',
  numpages: 'select.cbo_wpm_pag',
  curpage: 'select.cbo_wpm_pag',
  nextchap: function(prev) {
    var chapter = extractInfo('select.cbo_wpm_chp', { type: 'value', val: (prev ? 1 : -1) });
    if(chapter) return window.location.href.replace(/\/[0-9\.]+\/?([0-9]+\/?)?$/, '/' + chapter);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'manga-wall',
  _page: null,
  match: "^https?://mangawall\\.com/manga/[^/]*/[0-9]*",
  img: 'img.scan',
  next: function() {
    if(this._page === null) this._page = W.page;
    return W.series_url + '/' + W.chapter + '/' + (this._page += 1);
  },
  numpages: '.pageselect',
  curpage: '.pageselect',
  nextchap: function(prev) {
    return W.series_url + '/' + (parseInt(W.chapter.slice(1)) + (prev ? -1 : 1)) + '/1';
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'anime-a',
  _page: null,
  match: "^https?://manga\\.animea.net/.+chapter-[0-9]+(-page-[0-9]+)?.html",
  img: '#scanmr',
  next: function() {
    if(this._page === null) this._page = W.page;
    return W.series_url + W.chapter + '-page-' + (this._page += 1) + '.html';
  },
  numpages: '.pageselect',
  curpage: '.pageselect',
  nextchap: function(prev) {
    return W.series_url + 'chapter-' + (parseInt(W.chapter.match(/[0-9]+/)[0]) + (prev ? -1 : 1)) + '-page-1.html';
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'kiss-manga',
  match: "^https?://kissmanga\\.com/Manga/[^/]+/.+",
  img: '#divImage img',
  next: '#divImage img',
  numpages: function() {
    return W.lstImages.length;
  },
  curpage: function() {
    if(getEls('#divImage img').length > 1) {
      return 1;
    } else {
      return W.currImage + 1;
    }
  },
  nextchap: '#selectChapter, .selectChapter',
  prevchap: '#selectChapter, .selectChapter',
  pages: function(url, num, cb, ex) {
    cb(W.lstImages[num - 1], num);
  }
}, {
  name: 'the-spectrum-scans',
  match: "^https?://view\\.thespectrum\\.net/series/[^\\.]+\\.html",
  img: '#mainimage',
  next: function() {
    if (++this._page < this._pages.length) {
      return this._pages[this._page];
    }
  },
  numpages: '.selectpage',
  curpage: '.selectpage',
  nextchap: function(prev) {
    var ps = document.pageSelector1;
    var chnum = ps.ch.selectedIndex + (prev ? -1 : 1);
    if (chnum < ps.ch.length && chnum > -1) {
      return ps.action.split('?')[0] + '?ch=' + ps.ch[chnum].value + '&page=1';
    } else {
      return false;
    }
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  wait: function() {
    var ps = document.pageSelector1;
    this._pages = [];
    var base = ps.action.split('?')[0];
    for (var i = 0; i < ps.page.length; i++) {
      this._pages.push(base + '?ch=' + ps.ch.value + '&page=' + ps.page[i].value);
    }
    this._page = ps.page[ps.page.selectedIndex].value - 1;
    return true;
  }
}, {
  name: 'manhua-dmzj',
  match: "^https?://manhua.dmzj.com/[^/]*/[0-9]+(-[0-9]+)?\\.shtml",
  img: '#center_box > img',
  next: '#center_box > img',
  numpages: function() {
    return W.arr_pages.length;
  },
  curpage: function() {
    var match = location.href.match(/page=([0-9]+)/);
    return match ? parseInt(match[1]) : 1;
  },
  nextchap: '#next_chapter',
  prevchap: '#prev_chapter',
  pages: function(url, num, cb, ex) {
    cb(W.img_prefix + W.arr_pages[num - 1], num);
  },
  wait: '#center_box > img'
}, {
  name: 'hqbr',
  match: "^https?://hqbr.com.br/hqs/[^/]+/capitulo/[0-9]+/leitor/0",
  img: '#hq-page',
  next: '#hq-page',
  numpages: function() {
    return W.pages.length;
  },
  curpage: function() {
    return W.paginaAtual + 1;
  },
  nextchap: function(prev) {
    var chapters = getEls('#chapter-dropdown a'),
        current = parseInt(W.capituloIndex),
        chapter = chapters[current + (prev ? -1 : 1)];
    return chapter && chapter.href;
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  pages: function(url, num, cb, ex) {
    cb(W.pages[num - 1], num);
  }
}, {
  name: 'dmzj',
  match: "^https?://www.dmzj.com/view/[^/]+/.+\\.html",
  img: '.comic_wraCon > img',
  next: '.comic_wraCon > img',
  numpages: function() {
    return parseInt(W.pic_total);
  },
  curpage: function() {
    var match = location.href.match(/page=([0-9])/);
    return match ? parseInt(match[1]) : 1;
  },
  nextchap: '.next > a',
  prevchap: '.pre > a',
  pages: function(url, num, cb, ex) {
    cb(W.img_prefix + W.picArry[num - 1], num);
  },
  wait: '.comic_wraCon > img'
}, {
  name: 'mangago',
  match: "^https?://(www.)?mangago.me/read-manga/[^/]+/[^/]+/[^/]+",
  img: '#page1',
  next: '#pic_container',
  numpages: '#dropdown-menu-page',
  curpage: function() {
    return parseInt(getEls('#page-mainer a.btn.dropdown-toggle')[1].textContent.match(/[0-9]+/)[0]);
  },
  nextchap: function(prev) {
    var chapters = getEls('ul.dropdown-menu.chapter a'),
        curName = getEls('#page-mainer a.btn.dropdown-toggle')[0].textContent,
        curIdx;
    chapters.some(function(chap, idx) {
      if(chap.textContent.indexOf(curName) === 0) {
        curIdx = idx;
        return true;
      }
    });
    var chapter = chapters[curIdx + (prev ? 1 : -1)];
    return chapter && chapter.href;
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'mangalator',
  match: "^https?://mangalator.ch/show.php\\?gallery=[0-9]+",
  img: '.image img',
  next: '#next',
  numpages: 'select[name=image]',
  curpage: 'select[name=image]',
  nextchap: function(prev) {
    var next = extractInfo('select[name=gallery]', {type: 'value', val: (prev ? 1 : -1)});
    if(next) return location.href.replace(/\?gallery=[0-9]+/, '?gallery=' + next);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'eatmanga',
  match: "^https?://eatmanga.com/Manga-Scan/[^/]+/.+",
  img: '#eatmanga_image, #eatmanga_image_big',
  next: '#page_next',
  numpages: '#pages',
  curpage: '#pages',
  nextchap: '#bottom_chapter_list',
  prevchap: '#bottom_chapter_list',
  invchap: true
}, {
  name: 'manga-cat',
  match: "^https?://www.mangacat.me/[^/]+/[^/]+/[^\\.]+.html",
  img: '.img',
  next: '.img-link',
  numpages: '#page',
  curpage: '#page',
  nextchap: '#chapter',
  prevchap: '#chapter',
  invchap: true,
  wait: '#chapter option'
}, {
  name: 'readmng.com',
  match: "^https?://www\\.readmng\\.com/[^/]+/.+",
  img: '.page_chapter-2 img',
  next: '.list-switcher-2 > li:nth-child(3) > a, .list-switcher-2 > li:nth-child(2) > a',
  numpages: '.list-switcher-2 select[name=category_type]',
  curpage: '.list-switcher-2 select[name=category_type]',
  nextchap: '.jump-menu[name=chapter_list]',
  prevchap: '.jump-menu[name=chapter_list]',
  invchap: true
}, {
  name: 'foolslide',
  match: "^https?://(" + [
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
    "helveticascans.com/reader/read/.+",
    "reader.thecatscans.com/read/.+",
    "yonkouprod.com/reader/read/.+",
    "reader.championscans.com/read/.+",
    "reader.whiteoutscans.com/read/.+",
  ].join('|') + ")",
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
}, {
  name: 'mangatraders',
  match: "^https?://mangatraders\\.biz/read-online/.+",
  img: 'img.CurImage',
  next: '.image-container a',
  numpages: '.PageSelect',
  curpage: '.PageSelect',
  nextchap: function(prev) {
    var next = extractInfo('.ChapterSelect', {type:'text', val: (prev ? -1 : 1)});
    if(next) {
      var chapter = next.match(/[0-9.]+/)[0];
      return location.href.replace(/chapter-[0-9.]+/, 'chapter-' + chapter).replace(/page-[0-9]+/, 'page-1');
    }
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'mangainn',
  match: "^https?://www.mangainn.net/manga/chapter/.+",
  img: '#imgPage',
  next: function() {
    if(!this._count) this._count = extractInfo(this.curpage, {type: 'value'});
    var url = location.href;
    if(!/page_[0-9]+/.test(url)) url += '/page_1';
    return url.replace(/page_[0-9]+/, 'page_' + (++this._count));
  },
  numpages: '#cmbpages',
  curpage: '#cmbpages',
  nextchap: function(prev) {
    var next = extractInfo('#chapters', {type:'value', val: (prev ? -1 : 1)});
    if(next) return location.href.replace(/\/chapter\/.+$/, '/chapter/' + next + '/page_1');
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'kukudm',
  match: "^https?://(www|comic|comic2|comic3).kukudm.com/comiclist/[0-9]+/[0-9]+/[0-9]+.htm",
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
}, {
  name: 'mangachapter',
  match: "^https?://www\\.mangachapter\\.me/[^/]+/[^/]+/[^/]+.html",
  img: '#mangaImg, #viewer > table > tbody > tr > td:nth-child(1) > a:nth-child(2) > img',
  next: '.page-select + a.button-page',
  numpages: '.page-select select',
  curpage: '.page-select select',
  invchap: true,
  nextchap: '#top_chapter_list',
  prevchap: '#top_chapter_list',
  wait: '#top_chapter_list'
}, {
  name: 'kawaii',
  match: "^https://kawaii.ca/reader/.+",
  img: '.picture',
  next: 'select[name=page] + a',
  numpages: 'select[name=page]',
  curpage: 'select[name=page]',
  nextchap: function(prev) {
    var next = extractInfo('select[name=chapter]', {type:'value', val: (prev ? -1 : 1)});
    if(next) return location.href.replace(/\/reader\/([^/]+)(\/.+)?$/, '/reader/$1/' + next);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'lonemanga',
  match: "^https?://lonemanga.com/manga/[^/]+/[^/]+",
  img: '#imageWrapper img',
  next: '#imageWrapper a',
  numpages: '.viewerPage',
  curpage: '.viewerPage',
  nextchap: function(prev) {
    var next = extractInfo('.viewerChapter', {type:'value', val: (prev ? 1 : -1)});
    if(next) return location.href.replace(/\/manga\/([^/]+)\/.+$/, '/manga/$1/' + next);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'madokami',
  match: "^https?://manga\\.madokami\\.al/reader/.+",
  img: 'img',
  next: 'img',
  curpage: function() {
    return parseInt(query().index) + 1;
  },
  numpages: function() {
    if(!this._pages) {
      this._pages = JSON.parse(getEl('#reader').dataset.files);
    }
    return this._pages.length;
  },
  pages: function(url, num, cb, ex) {
    url = url.replace(/file=.+$/, 'file=' + this._pages[num - 1]);
    cb(url, url);
  },
  wait: '#reader'
}, {
  name: 'egscans',
  match: '^https?://read.egscans.com/.+',
  img: '#image_frame img',
  next: '#image_frame img',
  curpage: 'select[name=page]',
  numpages: 'select[name=page]',
  nextchap: function(prev) {
    var data = getEl(this.curchap).getAttribute('onchange').match(/'[^']+'/g);
    var next = extractInfo(this.curchap, { type: 'value', val: (prev ? -1 : 1) });
    if(next) return location.origin + '/' + data[0].slice(1, -1) + '/' + next;
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  curchap: 'select[name=chapter]',
  numchaps: 'select[name=chapter]',
  pages: function(url, num, cb, ex) {
    cb('/' + W.img_url[num], num);
  }
}, {
  name: 'imperialscans',
  match: '^https?://imperialscans.com/read/.+',
  img: '#page-img',
  next: '#page-url',
  curpage: function() {
    return extractInfo('#page-select', { type: 'index', val: -1 });
  },
  numpages: function() {
    return extractInfo('#page-select') - 1;
  },
  curchap: function() {
    var options = getEls('#chapter-select option:not([disabled])');
    var chapter = 1;
    options.some(function(value, index) {
      if (location.pathname === value.value) {
        chapter = options.length - index;
        return true;
      }
    });
    return chapter;
  },
  numchaps: function() {
    return extractInfo('#chapter-select');
  },
  nextchap: '#page-control > li:nth-child(5) > a',
  prevchap: '#page-control > li:nth-child(1) > a'
}, {
  name: 'chuixue',
  match: "^https?://www.chuixue.com/manhua/[0-9]+/[0-9]+.html",
  img: '#qTcms_pic',
  next: '#qTcms_pic',
  curpage: '#qTcms_select_i',
  numpages: '#qTcms_select_i',
  pages: function(url, num, cb, ex) {
    if(!this._pages) {
      this._pages = W.qTcms_S_m_murl.split('$qingtiandy$');
    }
    cb(this._pages[num - 1], num);
  },
  nextchap: function() {
    return W.qTcms_Pic_nextArr;
  },
  wait: '#qTcms_pic'
}, {
  name: 'sh-arab',
  match: '^https?://www.sh-arab.com/manga/.+',
  img: 'img.picture',
  next: '#omv td > a',
  curpage: 'select[name=page]',
  numpages: 'select[name=page]',
  curchap: 'select[name=chapter]',
  numchaps: 'select[name=chapter]',
  nextchap: function(prev) {
    var next = extractInfo('select[name=chapter]', {type:'value', val: (prev ? -1 : 1)});
    if (next) return location.href.replace(/[^\/]+$/, next);
  },
  prevchap: function() {
    return this.nextchap(true);
  }
}, {
  name: 'br.mangahost.com',
  match: "^http(s)?://br.mangahost.com/manga/[^/]+/.+",
  img: 'img.open',
  next: '.image-content > a',
  curpage: '.viewerPage',
  numpages: '.viewerPage'
}, {
  name: 'spinybackmanga and titaniascans',
  match: '^https?://(spinybackmanga.com/\\?manga=[^&]+&chapter=.+|www\.titaniascans\.com/reader/.+/.+)',
  img: '#thePicLink img',
  next: '#thePicLink',
  curpage: function() {
    return W.current;
  },
  numpages: function() {
    return getEl('#loadingbar tr').children.length;
  },
  curchap: function() {
    return parseInt(getEls('.selector')[1].firstChild.textContent.match(/[0-9]+/)[0]);
  },
  numchaps: function() {
    return getEls('.selector .options')[1].children.length;
  },
  nextchap: function(prev) {
    var nextChap = document.scripts[2].textContent.match(/location.href = "([^"]+)"/)[1];
    if(prev) {
      [].some.call(getEls('.selector .options')[1].children, function(child, index, children) {
        if(child.href === nextChap) {
          nextChap = children[index - 2] && children[index - 2].href;
          return true;
        }
      });
    }
    return nextChap;
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  pages: function(url, num, cb, ex) {
    var next = url.replace(/(?:(\/)2\/|[0-9]*)$/, '$1' + (num + 1));
    cb(W.imageArray[num - 1], next);
  }
}, {
  name: 'manga.ae',
  match: "https?://www.manga.ae/[^/]+/[^/]+/",
  img: '#showchaptercontainer img',
  next: '#showchaptercontainer a',
  curpage: 'a.chpage',
  nextchap: '.chapter:last-child',
  prevchap: '.chapter:first-child'
}, {
  name: 'mangaforall',
  match: "https?://mangaforall.com/manga/[^/]+/[^/]+/",
  img: '#page > img',
  next: '#page > img',
  numpages: '#chapter > div:nth-child(1) > div > div.uk-width-large-1-3.uk-width-medium-1-3.uk-width-small-1-1.uk-text-left.uk-text-center-small > div > div > div > ul',
  curpage: '#chapter > div:nth-child(1) > div > div.uk-width-large-1-3.uk-width-medium-1-3.uk-width-small-1-1.uk-text-left.uk-text-center-small > div > a.uk-button.uk-button-primary.number.uk-button-danger',
  nextchap: '#chapter > div:nth-child(5) > div.uk-grid.uk-grid-collapse.uk-margin-top > div.uk-width-large-1-3.uk-width-medium-1-3.uk-width-small-1-1.uk-text-left.uk-text-center-small > a',
  prevchap: '#chapter > div:nth-child(5) > div.uk-grid.uk-grid-collapse.uk-margin-top > div.uk-width-large-1-3.uk-width-medium-1-3.uk-width-small-1-1.uk-text-right.uk-text-center-small > a',
  pages: function(url, num, cb, ex) {
    cb(W.pages[num - 1].url, num);
  }
}, {
  name: 'hellocomic',
  match: "https?://hellocomic.com/[^/]+/[^/]+/p[0-9]+",
  img: '.coverIssue img',
  next: '.coverIssue a',
  numpages: '#e1',
  curpage: '#e1',
  nextchap: '#e2',
  prevchap: '#e2',
  curchap: '#e2',
  numchaps: '#e2'
}, {
  name: 'read-comic-online',
  match: "^https?://readcomiconline\\.to/Comic/[^/]+/.+",
  img: '#divImage img',
  next: '#divImage img',
  numpages: function() {
    return W.lstImages.length;
  },
  curpage: function() {
    return getEls('#divImage img').length > 1 ? 1 : W.currImage + 1;
  },
  nextchap: '#selectEpisode, .selectEpisode',
  prevchap: '#selectEpisode, .selectEpisode',
  pages: function(url, num, cb, ex) {
    cb(W.lstImages[num - 1], num);
  }
}, {
  name: 'mangaeden',
  match: "^https?://(www\\.)?mangaeden\\.com/(en|it)/(en|it)-manga/.+",
  img: '#mainImg',
  next: '#nextA',
  numpages: '#pageSelect',
  curpage: '#pageSelect',
  numchaps: '#combobox',
  curchap: '#combobox',
  invchap: true,
  nextchap: function (prev) {
    var cbox = getEl('#combobox');
    var opt = cbox[prev ? cbox.selectedIndex + 1 : cbox.selectedIndex - 1];
    var span = getEl('span.hideM0 a');
    return opt && span && span.href + parseInt(opt.value) + '/1/';
  },
  prevchap: function () {
    return this.nextchap(true);
  }
}, {
  name: 'comicastle',
  match: "^https?://comicastle\\.org/read-.+",
  img: '.chapter-img',
  next: '.chapter-content > select + a.label',
  numpages: '.chapter-content > select',
  curpage: '.chapter-content > select',
  numchaps: '.form-control',
  curchap: '.form-control',
  nextchap: '.form-control',
  prevchap: '.form-control',
  invchap: true
}, {
  name: 'mymh8',
  match: "^https?://(www\\.)?mymh8\\.com/chapter/.+",
  img: '#viewimg',
  next: reuse.na,
  numpages: function() {
    return W.maxpages;
  },
  curpage: '#J_showpage > span',
  nextchap: function(prev) {
    var button = prev ? getEl('div.m3p > input:first-of-type') : getEl('div.m3p > input:last-of-type');
    return button && button.attributes.onclick.value.match(/\.href='([^']+)'/)[1];
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  pages: function(url, num, cb, ex) {
    cb(W.WebimgServerURL[0] + W.imageslist[num], num);
  },
  wait: function() {
    return W.imageslist.length > 0;
  }
}, {
  name: 'unionmangas',
  match: "https?://(www\\.)?unionmangas\\.net/leitor/.+",
  img: '.slick-active img.real',
  next: reuse.na,
  numpages: '.selectPage',
  curpage: '.selectPage',
  numchaps: '#cap_manga1',
  curchap: '#cap_manga1',
  nextchap: '#cap_manga1',
  prevchap: '#cap_manga1',
  pages: function(url, num, cb, ex) {
    cb(W.pages[num - 1], num);
  },
  wait: function() {
    W.pages = getEls('img.real').map(function(el) {
      return el.src || el.dataset.lazy;
    });
    return W.pages && W.pages.length > 0;
  }
}, {
  name: 'otakusmash',
  match: "https?://www\\.otakusmash\\.com/(read-comics|read-manga)/.+",
  img: 'img.picture',
  next: 'select[name=page] + a',
  curpage: 'select[name=page]',
  numpages: 'select[name=page]',
  nextchap: function(prev) {
    var nextChap = extractInfo('select[name=chapter]', {type: 'value', val: prev ? 1 : -1});
    return nextChap ? location.href.replace(/(read-(comics|manga)\/[^\/]+).*/, '$1/' + nextChap) : null;
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  numchaps: 'select[name=chapter]',
  curchap: 'select[name=chapter]',
  invchap: true
}, {
  name: 'mangahome',
  match: "https?://www\\.mangahome\\.com/manga/.+/.+",
  img: '#image',
  next: '#viewer > a',
  curpage: '.mangaread-page select',
  numpages: '.mangaread-page select',
  nextchap: function(prev) {
    var buttons = getEls('.mangaread-footer .left > .btn-three');
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].textContent.indexOf(prev ? 'Prev Chapter' : 'Next Chapter') > - 1) {
        return buttons[i].href;
      }
    }
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  wait: '#image'
}, {
  name: 'readcomics',
  match: "https?://(www\\.)?readcomics\\.tv/.+/chapter-[0-9]+(/[0-9]+|$)",
  img: '#main_img',
  next: '.nav.next',
  curpage: 'select[name=page_select]',
  numpages: 'select[name=page_select]',
  nextchap: 'select[name=chapter_select]',
  prevchap: 'select[name=chapter_select]',
  curchap: 'select[name=chapter_select]',
  numchaps: 'select[name=chapter_select]',
  wait: 'select[name=page_select]'
}, {
  name: 'cartoonmad',
  match: "https?://(www\\.)?(cartoonmad|comicnad)\.com/comic/[0-9]+\.html",
  img: 'tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td > a > img',
  next: 'a.onpage+a',
  curpage: 'a.onpage',
  numpages: function() {
    return extractInfo('select[name=jump]') - 1;
  }
}, {
  name: 'ikanman',
  match: "https?://(www|tw)\.(ikanman|manhuagui)\.com/comic/[0-9]+/[0-9]+\.html",
  img: '#mangaFile',
  next: function() {
      return W._next;
  },
  curpage: '#page',
  numpages: '#pageSelect',
  nextchap: function(prev) {
    var chap = prev ? W._prevchap : W._nextchap;
    if (chap > 0) {
      return location.href.replace(/(\/comic\/[0-9]+\/)[0-9]+\.html.*/, "$1" + chap + ".html");
    } else {
      return false;
    }
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  wait: function() {
    // fetch chapter IDs via ajax
    if (!W._ajaxdone) {
      W._ajaxdone = -1;
      ajax({
        method: 'GET',
        async: false,
        url: '/support/chapter.ashx?' + 'bid=' + W.cInfo.bid + '&cid=' + W.cInfo.cid,
        responseType: 'json',
        onload: function (e) {
          var res = e.target.response;
          console.log('res', res);
          if (!res) return log('failed to load ikanman chapters, site has probably been updated, report on forums', 'error');
          W._nextchap = res.n;
          W._prevchap = res.p;
          W._ajaxdone = 1;
        }
      });
    }
    if (W._ajaxdone == 1 && getEl('#mangaFile')) {
      var ex = extractInfo.bind(this);
      W._next = location.href.replace(/(_p[0-9]+)?\.html.*/, '_p' + (ex('curpage') + 1) + '.html');
      W._base = ex('img').replace(/[^\/]+$/, '');
      return true;
    }
  },
  pages: function(url, num, cb, ex) {
    var nexturl =  url.replace(/(_p[0-9]+)?\.html.*/, '_p' + (num + 1) + '.html');
    var imgurl = W._base + W.cInfo.files[num - 1];
    cb(imgurl, nexturl);
  }
}, {
  name: 'mangasail and mangatail',
  match: 'https?://www\.manga(sail|tail)\.com/[^/]+',
  img: '#images img',
  next: '#images a',
  curpage: '#edit-select-page',
  numpages: '#edit-select-page',
  nextchap: function(prev) {
    return location.origin + '/node/' + extractInfo('#edit-select-node', {type: 'value', val: prev ? -1 : 1});
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  curchap: '#select_node',
  numchaps: '#select_node'
}, {
  name: 'komikstation',
  match: "^https?://www\.komikstation\.com/.+/.+/.+",
  img: '#mainpage',
  next: function() {
    return W._base + '?page=' + (W.glbCurrentpage + 1);
  },
  numpages: '#index select',
  curpage: '#index select',
  pages: function(url, num, cb, ex) {
    next = W._base + '?page=' + (num + 1);
    cb(W.pages[num - 1], next);
  },
  wait: function() {
    W._base = location.href.replace(/[?#].+$/, '');
    return W.pages;
  }
}, {
  name: 'gmanga',
  match: "^https?://gmanga.me/mangas/",
  img: function() {
    return W.pages[W.firstImg - 1];
  },
  next: function() {
    return location.href + '#' + (W.firstImg + 1);
  },
  numpages: function() {
    return W.totalImgs;
  },
  curpage: function() {
    return W.firstImg;
  },
  nextchap: function(prev) {
    var num = parseInt(extractInfo('#chapter', {type: 'value', val: prev ? 1 : -1}));
    return num && location.href.replace(/(\/mangas\/[^\/]+\/)[0-9]+(\/[^\/]+)/, '$1' + num + '$2');
  },
  prevchap: function() {
    return this.nextchap(true);
  },
  numchaps: '#chapter',
  curchap: '#chapter',
  invchap: true,
  pages: function(url, num, cb, ex) {
    var nexturl = location.href + '#' + (num + 1);
    cb(W.pages[num - 1], nexturl);
  },
  wait: function() {
    W.pages = W.release_pages && W.release_pages[1];
    return W.pages;
  }
}];
// END OF IMPL

var log = function(msg, type) {
  type = type || 'log';
  if (type === 'exit') {
    log('exit: ' + msg, 'error');
    throw 'mloader error';
  } else {
    try {
      console[type]('%c' + scriptName + ' ' + type + ':', 'font-weight:bold;color:green;', msg);
    } catch(e) { }
  }
};

var getEl = function(q, c) {
  if (!q) return;
  return (c || document).querySelector(q);
};

var getEls = function(q, c) {
  return [].slice.call((c || document).querySelectorAll(q));
};

var ajax = function(obj) {
  var xhr = new XMLHttpRequest();
  xhr.open(obj.method || 'get', obj.url, obj.async || true);
  xhr.onload = obj.onload;
  xhr.onerror = obj.onerror;
  xhr.responseType = obj.responseType || 'text';
  if(obj.beforeSend) obj.beforeSend(xhr);
  xhr.send(obj.data);
};

var storeGet = function(key) {
  var res;
  if (typeof GM_getValue === "undefined") {
    res = localStorage.getItem(key);
  } else {
    res = GM_getValue(key);
  }
  try {
    return JSON.parse(res);
  } catch(e) {
    return res;
  }
};

var storeSet = function(key, value) {
  value = JSON.stringify(value);
  if (typeof GM_setValue === "undefined") {
    return localStorage.setItem(key, value);
  }
  return GM_setValue(key, value);
};

var storeDel = function(key) {
  if (typeof GM_deleteValue === "undefined") {
    return localStorage.removeItem(key);
  }
  return GM_deleteValue(key);
};

var areDefined = function() {
  return [].every.call(arguments, function(arg) {
    return arg !== undefined && arg !== null;
  });
};

var updateObj = function(orig, ext) {
  var key;
  for (key in ext) {
    if (orig.hasOwnProperty(key) && ext.hasOwnProperty(key)) {
      orig[key] = ext[key];
    }
  }
  return orig;
};

var extractInfo = function(selector, mod, context) {
  selector = this[selector] || selector;
  if (typeof selector === 'function') {
    return selector.call(this, context);
  }
  var elem = getEl(selector, context),
      option;
  mod = mod || {};
  if (elem) {
    switch (elem.nodeName.toLowerCase()) {
      case 'img':
        return (mod.altProp && elem.getAttribute(mod.altProp)) || elem.src || elem.getAttribute('src');
      case 'a':
        if(mod.type === 'index')
          return parseInt(elem.textContent);
        return elem.href || elem.getAttribute('href');
      case 'ul':
        return elem.children.length;
      case 'select':
        switch (mod.type) {
          case 'index':
            var idx = elem.options.selectedIndex + 1 + (mod.val || 0);
            if(mod.invIdx) idx = elem.options.length - idx + 1;
            return idx;
          case 'value':
          case 'text':
            option = elem.options[elem.options.selectedIndex + (mod.val || 0)] || {};
            return mod.type === 'value' ? option.value : option.textContent;
          default:
            return elem.options.length;
        }
        break;
      default:
        switch (mod.type) {
          case 'index':
            return parseInt(elem.textContent);
          default:
            return elem.textContent;
        }
    }
  }
  return null;
};

var addStyle = function(id, replace) {
  if(!this.MLStyles) this.MLStyles = {};
  if(!this.MLStyles[id]) {
    this.MLStyles[id] = document.createElement('style');
    this.MLStyles[id].dataset.name = 'ml-style-' + id;
    document.head.appendChild(this.MLStyles[id]);
  }
  var style = this.MLStyles[id];
  var css = [].slice.call(arguments, 2).join('\n');
  if(replace) {
    style.textContent = css;
  } else {
    style.textContent += css;
  }
};

var toStyleStr = function(obj, selector) {
  var stack = [],
      key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      stack.push(key + ':' + obj[key]);
    }
  }
  if (selector) {
    return selector + '{' + stack.join(';') + '}';
  } else {
    return stack.join(';');
  }
};

var throttle = function(callback, limit) {
  var wait = false;
  return function() {
    if (!wait) {
      callback();
      wait = true;
      setTimeout(function() {
        wait = false;
      }, limit);
    }
  };
};

var query = function() {
  var map = {};
  location.search.slice(1).split('&').forEach(function(pair) {
    pair = pair.split('=');
    map[pair[0]] = pair[1];
  });
  return map;
};

var createButton = function(text, action, styleStr) {
  var button = document.createElement('button');
  button.textContent = text;
  button.onclick = action;
  button.setAttribute('style', styleStr || '');
  return button;
};

var getViewer = function(prevChapter, nextChapter) {
  var viewerCss = toStyleStr({
    'background-color': 'black !important',
    'font': '0.813em monospace !important',
    'text-align': 'center',
  }, 'body'),
      imagesCss = toStyleStr({
        'margin-top': '10px',
        'margin-bottom': '10px',
        'transform-origin': 'top center'
      }, '.ml-images'),
      imageCss = toStyleStr({
        'max-width': '100%',
        'display': 'block',
        'margin': '3px auto'
      }, '.ml-images img'),
      counterCss = toStyleStr({
        'background-color': '#222',
        'color': 'white',
        'border-radius': '10px',
        'width': '30px',
        'margin-left': 'auto',
        'margin-right': 'auto',
        'margin-top': '-12px',
        'padding-left': '5px',
        'padding-right': '5px',
        'border': '1px solid white',
        'z-index': '100',
        'position': 'relative'
      }, '.ml-counter'),
      navCss = toStyleStr({
        'text-decoration': 'none',
        'color': 'white',
        'background-color': '#444',
        'padding': '3px 10px',
        'border-radius': '5px',
        'transition': '250ms'
      }, '.ml-chap-nav a'),
      navHoverCss = toStyleStr({
        'background-color': '#555'
      }, '.ml-chap-nav a:hover'),
      boxCss = toStyleStr({
        'position': 'fixed',
        'background-color': '#222',
        'color': 'white',
        'padding': '7px',
        'border-top-left-radius': '5px',
        'cursor': 'default'
      }, '.ml-box'),
      statsCss = toStyleStr({
        'bottom': '0',
        'right': '0',
        'opacity': '0.4',
        'transition': '250ms'
      }, '.ml-stats'),
      statsCollapseCss = toStyleStr({
        'color': 'orange',
        'cursor': 'pointer'
      }, '.ml-stats-collapse'),
      statsHoverCss = toStyleStr({
        'opacity': '1'
      }, '.ml-stats:hover'),
      floatingMsgCss = toStyleStr({
        'bottom': '30px',
        'right': '0',
        'border-bottom-left-radius': '5px',
        'text-align': 'left',
        'font': 'inherit',
        'max-width': '95%',
        'z-index': '101',
        'white-space': 'pre-wrap'
      }, '.ml-floating-msg'),
      floatingMsgAnchorCss = toStyleStr({
        'color': 'orange'
      }, '.ml-floating-msg a'),
      buttonCss = toStyleStr({
        'cursor': 'pointer'
      }, '.ml-button'),
      keySettingCss = toStyleStr({
        'width': '35px'
      }, '.ml-setting-key input'),
      autoloadSettingCss = toStyleStr({
        'vertical-align': 'middle'
      }, '.ml-setting-autoload');
  // clear all styles and scripts
  var title = document.title;
  document.head.innerHTML = '<meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">';
  document.title = title;
  document.body.className = '';
  document.body.style = '';
  // navigation
  var nav = '<div class="ml-chap-nav">' + (prevChapter ? '<a class="ml-chap-prev" href="' + prevChapter + '">Prev Chapter</a> ' : '') +
      '<a class="ml-exit" href="' + location.href + '" data-exit="true">Exit</a> ' +
      (nextChapter ? '<a class="ml-chap-next" href="' + nextChapter + '">Next Chapter</a>' : '') + '</div>';
  // message area
  var floatingMsg = '<pre class="ml-box ml-floating-msg"></pre>';
  // stats
  var stats = '<div class="ml-box ml-stats"><span title="hide stats" class="ml-stats-collapse">&gt;&gt;</span><span class="ml-stats-content"><span class="ml-stats-pages"></span> ' +
      '<i class="fa fa-info ml-button ml-info-button" title="See userscript information and help"></i> ' +
      '<i class="fa fa-bar-chart ml-button ml-more-stats-button" title="See page stats"></i> ' +
      '<i class="fa fa-cog ml-button ml-settings-button" title="Adjust userscript settings"></i> ' +
      '<i class="fa fa-refresh ml-button ml-manual-reload" title="Manually refresh next clicked image."></i></span></div>';
  // combine ui elements
  document.body.innerHTML = nav + '<div class="ml-images"></div>' + nav + floatingMsg + stats;
  // add main styles
  addStyle('main', true, viewerCss, imagesCss, imageCss, counterCss, navCss, navHoverCss, statsCss, statsCollapseCss, statsHoverCss, boxCss, floatingMsgCss, buttonCss, keySettingCss, autoloadSettingCss, floatingMsgAnchorCss);
  // add user styles
  var userCss = storeGet('ml-setting-css-profiles');
  var curProf = storeGet('ml-setting-css-current') || 'Default';
  if(userCss && userCss.length > 0) userCss = userCss.filter(function(p) { return p.name === curProf; });
  userCss = userCss && userCss.length > 0 ? userCss[0].css : (storeGet('ml-setting-css') || '');
  addStyle('user', true, userCss);
  // set up return UI object
  var UI = {
    images: getEl('.ml-images'),
    statsContent: getEl('.ml-stats-content'),
    statsPages: getEl('.ml-stats-pages'),
    statsCollapse: getEl('.ml-stats-collapse'),
    btnManualReload: getEl('.ml-manual-reload'),
    btnInfo: getEl('.ml-info-button'),
    btnMoreStats: getEl('.ml-more-stats-button'),
    floatingMsg: getEl('.ml-floating-msg'),
    btnNextChap: getEl('.ml-chap-next'),
    btnPrevChap: getEl('.ml-chap-prev'),
    btnExit: getEl('.ml-exit'),
    btnSettings: getEl('.ml-settings-button'),
    isTyping: false,
    ignore: false,
    moreStats: false,
    currentProfile: storeGet('ml-setting-css-current') || ''
  };
  // message func
  var messageId = null;
  var showFloatingMsg = function(msg, timeout, html) {
    clearTimeout(messageId);
    log(msg);
    if(html) {
      UI.floatingMsg.innerHTML = msg;
    } else {
      UI.floatingMsg.textContent = msg;
    }
    if(!msg) UI.moreStats = false;
    UI.floatingMsg.style.display = msg ? '' : 'none';
    if(timeout) {
      messageId = setTimeout(function() {
        showFloatingMsg('');
      }, timeout);
    }
  };
  var isMessageFloating = function() {
    return !!UI.floatingMsg.innerHTML;
  };
  // configure initial state
  UI.floatingMsg.style.display = 'none';
  // set up listeners
  document.addEventListener('click', function(evt) {
    if (evt.target.nodeName === 'A' && evt.button !== 2) {
      var shouldReload = evt.target.href.indexOf('#') !== -1 && evt.target.href.split('#')[0] === document.location.href.split('#')[0] && evt.button === 0;  // fix for batoto https weirdness
      if(evt.target.className.indexOf('ml-chap') !== -1) {
        log('next chapter will autoload');
        storeSet('autoload', 'yes');
        if(shouldReload) {
          evt.preventDefault();
          location.href = evt.target.href;
          location.reload(true);
        }
      } else if(evt.target.className.indexOf('ml-exit') !== -1) {
        log('exiting chapter, stop autoload');
        storeSet('autoload', 'no');
        if(shouldReload) {
          evt.preventDefault();
          location.reload(true);
        }
      }
    }
  });
  UI.btnMoreStats.addEventListener('click', function(evt) {
    if(isMessageFloating() && UI.lastFloat === evt.target) {
      showFloatingMsg('');
    } else {
      UI.lastFloat = evt.target;
      UI.moreStats = true;
      showFloatingMsg([
        '<strong>Stats:</strong>',
        pageStats.loadLimit + ' pages parsed',
        pageStats.numLoaded + ' images loaded',
        (pageStats.loadLimit - pageStats.numLoaded) + ' images loading',
        (pageStats.numPages || 'Unknown number of') + ' pages in chapter',
        (pageStats.curChap !== null && pageStats.numChaps !== null ? ((pageStats.curChap - 1) + '/' + pageStats.numChaps + ' chapters read ' + (((pageStats.curChap - 1) / pageStats.numChaps * 100).toFixed(2) + '%') + ' of series') : ''),
      ].join('<br>'), null, true);
    }
  });
  UI.btnManualReload.addEventListener('click', function(evt) {
    var imgClick = function(e) {
      var target = e.target;
      UI.images.removeEventListener('click', imgClick, false);
      UI.images.style.cursor = '';
      if(target.nodeName === 'IMG' && target.parentNode.className === 'ml-images') {
        showFloatingMsg('');
        if(!target.title) {
          showFloatingMsg('Reloading "' + target.src + '"', 3000);
          if(target.complete) target.onload = null;
          target.src = target.src + (target.src.indexOf('?') !== -1 ? '&' : '?') + new Date().getTime();
        }
      } else {
        showFloatingMsg('Cancelled manual reload...', 3000);
      }
    };
    showFloatingMsg('Left click the image you would like to reload.\nClick on the page margin to cancel.');
    UI.images.style.cursor = 'pointer';
    UI.images.addEventListener('click', imgClick, false);
  });
  UI.statsCollapse.addEventListener('click', function(evt) {
    var test = UI.statsCollapse.textContent === '>>';
    storeSet('ml-stats-collapsed', test);
    UI.statsContent.style.display = test ? 'none' : '';
    UI.statsCollapse.textContent = test ? '<<' : '>>';
  });
  // restore collapse state
  if(storeGet('ml-stats-collapsed')) UI.statsCollapse.click();
  UI.floatingMsg.addEventListener('focus', function(evt) {
    var target = evt.target;
    if(target.dataset.ignore) UI.ignore = true;
    if((target.nodeName === 'INPUT' && target.type === 'text') || target.nodeName === 'TEXTAREA') UI.isTyping = true;
  }, true);
  UI.floatingMsg.addEventListener('blur', function(evt) {
    var target = evt.target;
    if(target.dataset.ignore) UI.ignore = false;
    if((target.nodeName === 'INPUT' && target.type === 'text') || target.nodeName === 'TEXTAREA') UI.isTyping = false;
  }, true);
  UI.btnInfo.addEventListener('click', function(evt) {
    if(isMessageFloating() && UI.lastFloat === evt.target) {
      showFloatingMsg('');
    } else {
      UI.lastFloat = evt.target;
      showFloatingMsg([
        '<strong>Information:</strong>',
        '<strong>IMPORTANT:</strong> The script has been updated to exclude NSFW sites',
        'in order to gain access to that functionality you\'ll have to install the following addon script.',
        '<a href="https://sleazyfork.org/en/scripts/12657-manga-loader-nsfw" target="_blank">https://sleazyfork.org/en/scripts/12657-manga-loader-nsfw</a>',
        '',
        'New feature! You can now define custom CSS in the new settings panel (accessible through the gear icon at the bottom left).',
        'The CSS will be saved and reapplied each time the script loads. You can change the background color of the page,',
        'the width of the images and pretty much anything else.',
        '',
        'CSS feature has now been enhanced to support multiple profiles you can switch between.',
        '',
        '<strong>Default Keybindings:</strong>',
        'Z - previous chapter',
        'X - exit',
        'C - next chapter',
        'W - scroll up',
        'S - scroll down',
        '+ - zoom in',
        '- - zoom out',
        '0 - reset zoom',
        'Click the info button again to close this message.'
      ].join('<br>'), null, true);
    }
  });
  UI.btnSettings.addEventListener('click', function(evt) {
    if(isMessageFloating() && UI.lastFloat === evt.target) {
      showFloatingMsg('');
    } else {
      UI.lastFloat = evt.target;
      // start grid and first column
      var settings = '<table><tr><td>';
      // Custom CSS
      var cssProfiles = storeGet('ml-setting-css-profiles');
      if(!cssProfiles || cssProfiles.length === 0) {
        cssProfiles = [{name: 'Default', css: storeGet('ml-setting-css') || ''}];
        storeSet('ml-setting-css-profiles', cssProfiles);
      }
      cssProfiles.push({ name: 'New Profile...', addNew: true });
      var prof = cssProfiles.filter(function(p) { return p.name === UI.currentProfile; })[0] || cssProfiles[0];
      settings += 'CSS (custom css for Manga Loader):<br>' +
        '<select class="ml-setting-css-profile">' +
        cssProfiles.map(function(profile) { return '<option ' + (profile.name === prof.name ? 'selected' : '') + '>' + profile.name + '</option>'; }).join('') +
        '</select><button class="ml-setting-delete-profile">x</button><br>' +
        '<textarea style="width: 300px; height: 300px;" type="text" class="ml-setting-css">' + prof.css + '</textarea><br><br>';
      // start new column
      settings += '</td><td>';
      // Keybindings
      var keyTableHtml = Object.keys(UI.keys).map(function(action) {
        return '<tr><td>' + action + '</td><td><input data-ignore="true" data-key="' + action + '" type="text" value="' + UI.keys[action] + '"></td></tr>';
      }).join('');
      settings += 'Keybindings:<br><table class="ml-setting-key">' + keyTableHtml + '</table><br>';
      // Autoload
      settings += 'Auto-load: <input class="ml-setting-autoload" type="checkbox" ' + (storeGet('mAutoload') && 'checked' || '') + '><br><br>';
      // Load all or just N pages
      settings += "# of pages to load:<br>" +
        'Type "all" to load all<br>default is 10<br>' +
        '<input class="ml-setting-loadnum" size="3" type="text" value="' + (storeGet('mLoadNum') || 10) + '" /><br><br>';
      // close grid and column
      settings += '</td></tr></table>';
      // Save button
      settings += '<button class="ml-setting-save">Save</button> <button class="ml-setting-close">Close</button> <span class="ml-setting-save-flash"></span>';
      showFloatingMsg(settings, null, true);
      // handle keybinding detection
      getEl('.ml-setting-key').onkeydown = function(e) {
        var target = e.target;
        if(target.nodeName.toUpperCase() === 'INPUT') {
          e.preventDefault();
          e.stopPropagation();
          target.value = e.which || e.charCode || e.keyCode;
        }
      };
      // delete css profile
      getEl('.ml-setting-delete-profile', UI.floatingMsg).onclick = function(e) {
        if(['Default', 'New Profile...'].indexOf(prof.name) === -1) {
          if(confirm('Are you sure you want to delete profile "' + prof.name + '"?')) {
            var index = cssProfiles.indexOf(prof);
            cssProfiles.splice(index, 1);
            var sel = getEl('.ml-setting-css-profile');
            sel.remove(index);
            sel.selectedIndex = 0;
            sel.onchange({target: sel});
          }
        } else {
          alert('Cannot delete profile: "' + prof.name + '"');
        }
      };
      // change selected css profile
      getEl('.ml-setting-css-profile', UI.floatingMsg).onchange = function(e) {
        var cssBox = getEl('.ml-setting-css');
        prof.css = cssBox.value;
        prof = cssProfiles[e.target.selectedIndex];
        if(prof.addNew) {
          // enter new name
          var newName = '';
          while(!newName || cssProfiles.filter(function(p) { return p.name === newName; }).length > 0) {
            newName = prompt('Enter the name for the new profile (must be unique)');
            if(!newName) {
              e.target.selectedIndex = 0;
              e.target.onchange({target: e.target});
              return;
            }
          }
          // add new profile to array
          var last = cssProfiles.pop();
          cssProfiles.push({name: newName, css: ''}, last);
          prof = cssProfiles[cssProfiles.length - 2];
          // add new profile to select box
          var option = document.createElement('option');
          option.text = newName;
          e.target.add(option, e.target.options.length - 1);
          e.target.selectedIndex = e.target.options.length - 2;
        }
        cssBox.value = prof.css;
        UI.currentProfile = prof.name;
        addStyle('user', true, prof.css);
      };
      // handle save button
      getEl('.ml-setting-save', UI.floatingMsg).onclick = function() {
        // persist css
        var css = getEl('.ml-setting-css', UI.floatingMsg).value.trim();
        prof.css = css;
        addStyle('user', true, css);
        var last = cssProfiles.pop();
        storeSet('ml-setting-css-profiles', cssProfiles);
        cssProfiles.push(last);
        storeSet('ml-setting-css-current', UI.currentProfile);
        // keybindings
        getEls('.ml-setting-key input').forEach(function(input) {
          UI.keys[input.dataset.key] = parseInt(input.value);
        });
        storeSet('ml-setting-key', UI.keys);
        // autoload
        storeSet('mAutoload', getEl('.ml-setting-autoload').checked);
        // loadnum
        var loadnum = getEl('.ml-setting-loadnum').value;
        mLoadNum = getEl('.ml-setting-loadnum').value = loadnum.toLowerCase() === 'all' ? 'all' : (parseInt(loadnum) || 10);
        storeSet('mLoadNum', mLoadNum);
        // flash notify
        var flash = getEl('.ml-setting-save-flash');
        flash.textContent = 'Saved!';
        setTimeout(function() { flash.textContent = ''; }, 1000);
      };
      // handle close button
      getEl('.ml-setting-close', UI.floatingMsg).onclick = function() {
        showFloatingMsg('');
      };
    }
  });
  // zoom
  var lastZoom, originalZoom,newZoomPostion;
  var changeZoom = function(action, elem) {
    var ratioZoom = (document.documentElement.scrollTop || document.body.scrollTop)/(document.documentElement.scrollHeight || document.body.scrollHeight);
    var curImage = getCurrentImage();
    if(!lastZoom) {
      lastZoom = originalZoom = Math.round(curImage.clientWidth / window.innerWidth * 100);
    }
    var zoom = lastZoom;
    if(action === '+') zoom += 5;
    if(action === '-') zoom -= 5;
    if(action === '=') {
      lastZoom = originalZoom;
      addStyle('image-width', true, '');
      showFloatingMsg('reset zoom', 500);
      newZoomPostion =(document.documentElement.scrollHeight || document.body.scrollHeight)*ratioZoom;
      window.scroll(0, newZoomPostion);
      return;
    }
    zoom = Math.max(10, Math.min(zoom, 100));
    lastZoom = zoom;
    addStyle('image-width', true, toStyleStr({
      width: zoom + '%'
    }, '.ml-images img'));
    showFloatingMsg('zoom: ' + zoom + '%', 500);
    newZoomPostion =(document.documentElement.scrollHeight || document.body.scrollHeight)*ratioZoom;
    window.scroll(0, newZoomPostion);
  };
  // keybindings
  UI.keys = {
    PREV_CHAP: 90, EXIT: 88, NEXT_CHAP: 67,
    SCROLL_UP: 87, SCROLL_DOWN: 83,
    ZOOM_IN: 187, ZOOM_OUT: 189, RESET_ZOOM: 48
  };
  // override defaults for firefox since different keycodes
  if(typeof InstallTrigger !== 'undefined') {
    UI.keys.ZOOM_IN = 61;
    UI.keys.ZOOM_OUT = 173;
    UI.keys.RESET_ZOOM = 48;
  }
  UI.scrollAmt = 50;
  // override the defaults with the user defined ones
  updateObj(UI.keys, storeGet('ml-setting-key') || {});
  UI._keys = {};
  Object.keys(UI.keys).forEach(function(action) {
    UI._keys[UI.keys[action]] = action;
  });
  window.addEventListener('keydown', function(evt) {
    // ignore keybindings when text input is focused
    if(UI.isTyping) {
      if(!UI.ignore) evt.stopPropagation();
      return;
    }
    var code = evt.which || evt.charCode || evt.keyCode;
    // stop propagation if key is registered
    if(code in UI.keys) evt.stopPropagation();
    // perform action
    switch(code) {
      case UI.keys.PREV_CHAP:
        if(UI.btnPrevChap) {
          UI.btnPrevChap.click();
        }
        break;
      case UI.keys.EXIT:
        UI.btnExit.click();
        break;
      case UI.keys.NEXT_CHAP:
        if(UI.btnNextChap) {
          UI.btnNextChap.click();
        }
        break;
      case UI.keys.SCROLL_UP:
        window.scrollBy(0, -UI.scrollAmt);
        break;
      case UI.keys.SCROLL_DOWN:
        window.scrollBy(0, UI.scrollAmt);
        break;
      case UI.keys.ZOOM_IN:
        changeZoom('+', UI.images);
        break;
      case UI.keys.ZOOM_OUT:
        changeZoom('-', UI.images);
        break;
      case UI.keys.RESET_ZOOM:
        changeZoom('=', UI.images);
        break;
    }
  }, true);
  return UI;
};

var getCurrentImage = function() {
  var image;
  getEls('.ml-images img').some(function(img) {
    image = img;
    return img.getBoundingClientRect().bottom > 200;
  });
  return image;
};

var getCounter = function(imgNum) {
  var counter = document.createElement('div');
  counter.classList.add('ml-counter');
  counter.textContent = imgNum;
  return counter;
};

var addImage = function(src, loc, imgNum, callback) {
  var image = new Image(),
      counter = getCounter(imgNum);
  image.onerror = function() {
    log('failed to load ' + src);
    image.onload = null;
    image.style.backgroundColor = 'white';
    image.style.cursor = 'pointer';
    image.title = 'Reload "' + src + '"?';
    image.src = IMAGES.refresh_large;
    image.onclick = function() {
      image.onload = callback;
      image.title = '';
      image.style.cursor = '';
      image.src = src;
    };
  };
  image.onload = callback;
  image.src = src;
  loc.appendChild(image);
  loc.appendChild(counter);
};

var loadManga = function(imp) {
  var ex = extractInfo.bind(imp),
      imgUrl = ex('img', imp.imgmod),
      nextUrl = ex('next'),
      numPages = ex('numpages'),
      curPage = ex('curpage', {
        type: 'index'
      }) || 1,
      nextChapter = ex('nextchap', {
        type: 'value',
        val: (imp.invchap && -1) || 1
      }),
      prevChapter = ex('prevchap', {
        type: 'value',
        val: (imp.invchap && 1) || -1
      }),
      xhr = new XMLHttpRequest(),
      d = document.implementation.createHTMLDocument(),
      addAndLoad = function(img, next) {
        if(!img) throw new Error('failed to retrieve img for page ' + curPage);
        updateStats();
        addImage(img, UI.images, curPage, function() {
          pagesLoaded += 1;
          updateStats();
        });
        if(!next && curPage < numPages) throw new Error('failed to retrieve next url for page ' + curPage);
        loadNextPage(next);
      },
      updateStats = function() {
        updateObj(pageStats, {
          numLoaded: pagesLoaded,
          loadLimit: curPage,
          numPages: numPages
        });
        if(UI.moreStats) {
          for(var i=2;i--;) UI.btnMoreStats.click();
        }
        UI.statsPages.textContent = ' ' + pagesLoaded + (numPages ? '/' + numPages : '') + ' loaded';
      },
      getPageInfo = function() {
        var page = d.body;
        d.body.innerHTML = xhr.response;
        try {
          // find image and link to next page
          addAndLoad(ex('img', imp.imgmod, page), ex('next', null, page));
        } catch (e) {
          if (xhr.status == 503 && retries > 0) {
            log('xhr status ' + xhr.status + ' retrieving ' + xhr.responseURL + ', ' + retries-- + ' retries remaining');
            window.setTimeout(function() {
              xhr.open('get', xhr.responseURL);
              xhr.send();
            }, 500);
          } else {
            log(e);
            log('error getting details from next page, assuming end of chapter.');
          }
        }
      },
      loadNextPage = function(url) {
        if (mLoadNum !== 'all' && count % mLoadNum === 0) {
          if (resumeUrl) {
            resumeUrl = null;
          } else {
            resumeUrl = url;
            log('waiting for user to scroll further before loading more images, loaded ' + count + ' pages so far, next url is ' + resumeUrl);
            return;
          }
        }
        if (numPages && curPage + 1 > numPages) {
          log('reached "numPages" ' + numPages + ', assuming end of chapter');
          return;
        }
        if (lastUrl === url) {
          log('last url (' + lastUrl + ') is the same as current (' + url + '), assuming end of chapter');
          return;
        }
        curPage += 1;
        count += 1;
        lastUrl = url;
        retries = 5;
        if (imp.pages) {
          imp.pages(url, curPage, addAndLoad, ex, getPageInfo);
        } else {
          var colonIdx = url.indexOf(':');
          if(colonIdx > -1) {
            url = location.protocol + url.slice(colonIdx + 1);
          }
          xhr.open('get', url);
          imp.beforexhr && imp.beforexhr(xhr);
          xhr.onload = getPageInfo;
          xhr.onerror = function() {
            log('failed to load page, aborting', 'error');
          };
          xhr.send();
        }
      },
      count = 1,
      pagesLoaded = curPage - 1,
      lastUrl, UI, resumeUrl, retries;
  if (!imgUrl || (!nextUrl && curPage < numPages)) {
    log('failed to retrieve ' + (!imgUrl ? 'image url' : 'next page url'), 'exit');
  }

  // gather chapter stats
  pageStats.curChap = ex('curchap', {
    type: 'index',
    invIdx: !!imp.invchap
  });
  pageStats.numChaps = ex('numchaps');

  // do some checks on the chapter urls
  nextChapter = (nextChapter && nextChapter.trim() === location.href + '#' ? null : nextChapter);
  prevChapter = (prevChapter && prevChapter.trim() === location.href + '#' ? null : prevChapter);

  UI = getViewer(prevChapter, nextChapter);

  UI.statsPages.textContent = ' 0/1 loaded, ' + numPages + ' total';

  if (mLoadNum !== 'all') {
    window.addEventListener('scroll', throttle(function(e) {
      if (!resumeUrl) return; // exit early if we don't have a position to resume at
      if(!UI.imageHeight) {
        UI.imageHeight = getEl('.ml-images img').clientHeight;
      }
      var scrollBottom = document.body.scrollHeight - ((document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight);
      if (scrollBottom < UI.imageHeight * 2) {
        log('user scroll nearing end, loading more images starting from ' + resumeUrl);
        loadNextPage(resumeUrl);
      }
    }, 100));
  }

  addAndLoad(imgUrl, nextUrl);

};

var waitAndLoad = function(imp) {
  isLoaded = true;
  if(imp.wait) {
    var waitType = typeof imp.wait;
    if(waitType === 'number') {
      setTimeout(loadManga.bind(null, imp), imp.wait || 0);
    } else {
      var isReady = waitType === 'function' ? imp.wait.bind(imp) : function() {
        return getEl(imp.wait);
      };
      var intervalId = setInterval(function() {
        if(isReady()) {
          log('Condition fulfilled, loading');
          clearInterval(intervalId);
          loadManga(imp);
        }
      }, 200);
    }
  } else {
    loadManga(imp);
  }
};

var MLoaderLoadImps = function(imps) {
  var success = imps.some(function(imp) {
    if (imp.match && (new RegExp(imp.match, 'i')).test(pageUrl)) {
      currentImpName = imp.name;
      if (W.BM_MODE || (autoload !== 'no' && (mAutoload || autoload))) {
        log('autoloading...');
        waitAndLoad(imp);
        return true;
      }
      // setup load hotkey
      var loadHotKey = function(e) {
        if(e.ctrlKey && e.keyCode == 188) { // ctrl + , (comma)
          e.preventDefault();
          btnLoad.click();
          window.removeEventListener('keydown', loadHotKey);
        }
      };
      window.addEventListener('keydown', loadHotKey);
      // append button to dom that will trigger the page load
      btnLoad = createButton('Load Manga', function(evt) {
        waitAndLoad(imp);
        this.remove();
      }, btnLoadCss);
      document.body.appendChild(btnLoad);
      return true;
    }
  });

  if (!success) {
    log('no implementation for ' + pageUrl, 'error');
  }
};

var pageUrl = window.location.href,
    btnLoadCss = toStyleStr({
      'position': 'fixed',
      'bottom': 0,
      'right': 0,
      'padding': '5px',
      'margin': '0 10px 10px 0',
      'z-index': '9999999999'
    }),
    currentImpName, btnLoad;

// indicates whether UI loaded
var isLoaded = false;
// used when switching chapters
var autoload = storeGet('autoload');
// manually set by user in menu
var mAutoload = storeGet('mAutoload') || false;
// should we load less pages at a time?
var mLoadNum = storeGet('mLoadNum') || 10;
// holder for statistics
var pageStats = {
  numPages: null, numLoaded: null, loadLimit: null, curChap: null, numChaps: null
};

// clear autoload
storeDel('autoload');

log('starting...');

// extra check for settings (hack) on dumb firefox/scriptish, settings aren't udpated until document end
W.document.addEventListener('DOMContentLoaded', function(e) {
  if(!isLoaded) return;
  // used when switching chapters
  autoload = storeGet('autoload');
  // manually set by user in menu
  mAutoload = storeGet('mAutoload') || false;
  // should we load less pages at a time?
  mLoadNum = storeGet('mLoadNum') || 10;
  if(autoload || mAutoload) {
    btnLoad.click();
  }
});
MLoaderLoadImps(implementations);

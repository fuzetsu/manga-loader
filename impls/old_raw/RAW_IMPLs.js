ALL_IMPLS = [{
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
  match: "^https?://(fan|manga)fox.(me|la|net)/manga/[^/]*/[^/]*/[^/]*",
  img: '.reader-main img',
  next: '.pager-list-left > span > a:last-child',
  numpages: function() { return W.imagecount; },
  curpage: function () { return W.imagepage; },
  nextchap: '.pager-list-left > a:last-child',
  prevchap: '.pager-list-left > a:first-child',
  imgURLs: [],
  pages: function(url, num, cb, ex) {
    var imp = this;
    if (this.imgURLs[num])
      cb(this.imgURLs[num], num);
    else
      ajax({
        url: 'chapterfun.ashx?cid=' + W.chapterid + '&page=' + num,
        onload: function(e) {
          eval(e.target.responseText);
          for (var i = 0; i < d.length; i++) {
            imp.imgURLs[num + i] = d[i];
          }
          cb(d[0], num);
        }
      });
  },
  wait: function () {
    el = getEl('.reader-main img');

    return el && el.getAttribute('src') != el.getAttribute('data-loading-img');
  }
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
  match: "^https?://(mngcow|mangadoom|mangaindo|merakiscans|www\\.3asq|moonbunnycafe)\\.(co|id|info|com)/[^/]+/[0-9.]+",
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
  img: function (){
    return getEl('img.load-src').getAttribute('data-src');
  },
  next: function(){
    return '#';
  },
  numpages: function () {
    return W.pages.length;
  },
  pages: function(url, num, cb, ex) {
    cb(W.pages[num - 1].getAttribute('data-src'), num - 1);
  },
  nextchap: 'a.logo_2',
  prevchap: 'a.logo_1',
  wait: function (){
    W.pages = getEls('img.load-src');
    return true;
  }
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
    return (W.lstOLA || W.lstImages).length;
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
    cb((W.lstOLA || W.lstImages)[num - 1], num);
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
  name: 'mangadex.org',
  match: "^https?://mangadex\\.org/chapter/[0-9]+/[0-9]+",
  img: '#current_page',
  next: function() {
    return this._base + ++this._page;
  },
  numpages: '#jump_page',
  curpage: '#jump_page',
  nextchap: function() {
    var chapter = document.querySelector('#jump_chapter').selectedOptions[0].previousElementSibling;
     return (chapter === null) ? false : (this._base.replace(/[0-9]+\/$/, chapter.value));
  },
  prevchap: function() {
    var chapter = document.querySelector('#jump_chapter').selectedOptions[0].nextElementSibling;
     return (chapter === null) ? false : (this._base.replace(/[0-9]+\/$/, chapter.value));
  },

  wait: function() {
    var loc = document.location.toString();
    var num = loc.match(/[0-9]+$/);
    this._base = loc.slice(0, -num.length);
    this._page = parseInt(num);
    return true;
  }
}, {
  name: 'biamamscans.com',
  match: "^https?://biamamscans\\.com/read/.+", //nextchap and prevchap broken
  img: '.manga-image',
  next: 'span.float-right:nth-child(2) > div:nth-child(2) > a:nth-child(1)',
  numpages: '#page-select',
  curpage: '#page-select',
  nextchap: '#chapter-select',
  prevchap: '#chapter-select'
}, {
  name: 'lhtranslation',
  match: "^https?://read.lhtranslation\\.com/read-.+",
  img: 'img.chapter-img',
  next: '.chapter-content > select + a.label',
  numpages: '.chapter-content > select',
  curpage: '.chapter-content > select',
  numchaps: '.form-control',
  curchap: '.form-control',
  nextchap: '.form-control',
  prevchap: '.form-control',
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
    "helveticascans.com/r/read/.+",
    "reader.thecatscans.com/read/.+",
    "yonkouprod.com/reader/read/.+",
    "reader.championscans.com/read/.+",
    "reader.whiteoutscans.com/read/.+",
    "hatigarmscans.eu/hs/read/.+",
    "lector.kirishimafansub.com/lector/read/.+",
    "hotchocolatescans.com/fs/read/.+",
    "www.slide.world-three.org/read/.+",
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
  },
  nextchap: function() {
    let filter = getEls('.pages').filter(function(i) {
      return i.textContent.match('下一話');
    });
    return filter.length ? filter[0].href : null;
  },
  prevchap: function() {
    let filter = getEls('.pages').filter(function(i) {
        return i.textContent.match('上一話');
    });
    return filter.length ? filter[0].href : null;
  },
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
    if (getEl('#mangaFile')) {
      W._nextchap = W.cInfo.nextId;
      W._prevchap = W.cInfo.prevId;
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
}, {
  name: '930mh',
  match: "http://www\.930mh\.com/manhua/\\d+/\\d+.html",
  img: '#images > img',
  next: function() {
    return location.origin + location.pathname + '?p=' + (W.SinTheme.getPage() + 1);
  },
  pages: function(url, num, cb, ex) {
    cb(new URL(W.pageImage).origin + '/' + W.chapterPath + W.chapterImages[num - 1], num - 1);
  },
  curpage: function() {
    return W.SinTheme.getPage();
  },
  numpages: function() {
    return W.chapterImages.length;
  },
  nextchap: function(){
    return W.nextChapterData.id && W.nextChapterData.id > 0 ? W.comicUrl + W.nextChapterData.id + '.html' : null;
  },
  prevchap: function(){
    return W.prevChapterData.id && W.prevChapterData.id > 0 ? W.comicUrl + W.prevChapterData.id + '.html' : null;
  },
  wait: '#images > img'
}, {
  name: '漫畫王',
  match: "https://www\.mangabox\.me/reader/\\d+/episodes/\\d+/",
  img: 'img.jsNext',
  next: function() {
    return '#';
  },
  pages: function(url, num, cb, ex) {
    cb(W.pages[num - 1].src, num - 1);
  },
  numpages: function() {
    return W.pages.length;
  },
  nextchap: '.lastSlider_nextButton',
  wait: function (){
    W.pages = getEls('img.jsNext');
    return true;
  }
}, {
  name: '2comic.com 動漫易',
  match: "http://twocomic.com/view/comic_\\d+.html",
  img: '#TheImg',
  next: function() {
    return '#';
  },
  pages: function(url, num, cb, ex) {
    W.p++;
    var ss = W.ss;
    var c = W.c;
    var ti = W.ti;
    var nn = W.nn;
    var p = W.p;
    var mm = W.mm;
    var f = W.f;
    var img = 'http://img' + ss(c, 4, 2) + '.8comic.com/' + ss(c, 6, 1) + '/' + ti + '/' + ss(c, 0, 4) + '/' + nn(p) + '_' + ss(c, mm(p) + 10, 3, f) + '.jpg';
    cb(img, num - 1);
  },
  numpages: function() {
    return W.ps * 1;
  },
  curpage: function() {
    return W.p;
  },
  numchaps: function() {
    return W.chs;
  },
  curchap: function() {
    return W.ch;
  },
  nextchap: function() {
    return W.ch < W.chs ? W.replaceurl('ch', W.ni) : false;
  },
  prevchap: function() {
    return W.ch > 1 ? W.replaceurl('ch', W.pi) : false;
  },
  wait:'#TheImg'
}];

ALL_NSFW_IMPLS = [{
    name: 'geh-and-exh',
    match: "^https?://(e-hentai|exhentai).org/s/.*/.*",
    img: '.sni > a > img, #img',
    next: '.sni > a, #i3 a',
    numpages: 'div.sn > div > span:nth-child(2)',
    curpage: 'div.sn > div > span:nth-child(1)'
  }, {
    name: 'fakku',
    match: "^http(s)?://www.fakku.net/.*/.*/read",
    img: '.current-page',
    next: '.current-page',
    numpages: '.drop',
    curpage: '.drop',
    pages: function(url, num, cb, ex) {
      var firstNum = url.lastIndexOf('/'),
          lastDot = url.lastIndexOf('.');
      var c = url.charAt(firstNum);
      while (c && !/[0-9]/.test(c)) {
        c = url.charAt(++firstNum);
      }
      var curPage = parseInt(url.slice(firstNum, lastDot), 10);
      url = url.slice(0, firstNum) + ('00' + (curPage + 1)).slice(-3) + url.slice(lastDot);
      cb(url, url);
    }
  }, {
    name: 'nowshelf',
    match: "^https?://nowshelf.com/watch/[0-9]*",
    img: '#image',
    next: '#image',
    numpages: function() {
      return parseInt(getEl('#page').textContent.slice(3), 10);
    },
    curpage: function() {
      return parseInt(getEl('#page > input').value, 10);
    },
    pages: function(url, num, cb, ex) {
      cb(page[num], num);
    }
  }, {
    name: 'nhentai',
    match: "^https?://nhentai\\.net\\/g\\/[0-9]+/[0-9]+",
    img: '#image-container > a img',
    next: '#image-container > a',
    numpages: '.num-pages',
    curpage: '.current',
    imgmod: {
      altProp: 'data-cfsrc'
    },
  }, {
    name: '8muses',
    match: "^http(s)?://www.8muses.com/comix/picture/[^/]+/[^/]+/[^/]+/.+",
    img: function(ctx) {
      var img = getEl('.photo img.image', ctx);
      return img ? img.src : getEl('#imageDir', ctx).value + getEl('#imageName', ctx).value;
    },
    next: '.photo > a',
    curpage: '#page-select-s',
    numpages: '#page-select-s'
  }, {
    name: 'hitomi',
    match: "^http(s)?://hitomi.la/reader/[0-9]+.html",
    img: '#comicImages > img',
    next: '#comicImages > img',
    numpages: function() {
      return W.images.length;
    },
    curpage: function() {
      return parseInt(W.curPanel);
    },
    pages: function(url, num, cb, ex) {
      cb(W.images[num - 1].path, num);
    },
    wait: '#comicImages > img'
  }, {
    name: 'doujin-moe',
    _pages: null,
    match: "^https?://doujins\.com/.+",
    img: 'img.picture',
    next: reuse.na,
    numpages: function() {
      if (!this._pages) {
        this._pages = getEls('#gallery djm').map(function(file) {
          return file.getAttribute('file').replace('static2.', 'static.');
        });
      }
      return this._pages.length;
    },
    curpage: function() {
      return parseInt(getEl('.counter').textContent.match(/^[0-9]+/)[0]);
    },
    pages: function(url, num, cb, ex) {
      cb(this._pages[num - 1], num);
    }
  }, {
    name: 'pururin',
    match: "https?://pururin\\.us/read/.+",
    img: 'img.image-next',
    next: 'a.image-next',
    numpages: function() {
      return Object.keys(chapters).length;
    },
    curpage: 'option:checked',
    pages: function(url, num, cb, ex) {
      cb(chapters[num].image, num);
    }
  }, {
    name: 'hentai-rules',
    match: "^https?://www\\.hentairules\\.net/galleries[0-9]*/picture\\.php.+",
    img: '#theMainImage',
    next: '#linkNext',
    imgmod: {
      altProp: 'data-src'
    },
    numpages: function(cur) {
      return parseInt(getEl('.imageNumber').textContent.replace(/([0-9]+)\/([0-9]+)/, cur ? '$1' : '$2'));
    },
    curpage: function() {
      return this.numpages(true);
    }
  }, {
    name: 'ero-senmanga',
    match: "^https?://ero\\.senmanga\\.com/[^/]*/[^/]*/[0-9]*",
    img: '#picture',
    next: '#omv > table > tbody > tr:nth-child(2) > td > a',
    numpages: 'select[name=page]',
    curpage: 'select[name=page]',
    nextchap: function(prev) {
      var next = extractInfo('select[name=chapter]', {
        type: 'value',
        val: (prev ? -1 : 1)
      });
      if (next) return window.location.href.replace(/\/[^\/]*\/[0-9]+\/?$/, '') + '/' + next + '/1';
    },
    prevchap: function() {
      return this.nextchap(true);
    }
  }, {
    name: 'hentaifr',
    match: "^https?://hentaifr\\.net/.+\\.php\\?id=[0-9]+",
    img: function(ctx, next) {
      var img = getEls('img[width]', ctx).filter(function(img) {
        return img.getAttribute('src').indexOf('contenu/doujinshis') !== -1;
      })[0];
      return next ? img : (img ? img.getAttribute('src') : null);
    },
    next: function(ctx) {
      var img = this.img(ctx, true);
      return img ? img.parentNode.getAttribute('href') : null;
    },
    wait: function() {
      return this.img() &&  this.next();
    }
  }, {
    name: 'prism-blush',
    match: "^https?://prismblush.com/comic/.+",
    img: '#comic img',
    next: '#comic a'
  }, {
    name: 'hentai-here',
    match: "^https?://(www\\.)?hentaihere.com/m/[^/]+/[0-9]+/[0-9]+",
    img: '#arf-reader-img',
    next: reuse.na,
    curpage: function() {
      return parseInt(W.rff_thisIndex);
    },
    numpages: function() {
      return W.rff_imageList.length;
    },
    pages: function(url, num, cb, ex) {
      cb(W.imageCDN + W.rff_imageList[num - 1], num);
    },
    nextchap: function() {
      return W.rff_nextChapter;
    },
    prevchap: function() {
      return W.rff_previousChapter;
    },
    curchap: function() {
      var curchap;
      getEls('ul.dropdown-menu.text-left li').some(function(li, index) {
        if(getEl('a.bg-info', li)) {
          curchap = index + 1;
        }
      });
      return curchap;
    },
    numchaps: 'ul.dropdown-menu.text-left',
    wait: 'ul.dropdown-menu.text-left'
  }, {
    name: 'foolslide',
    match: "^https?://(" + [
      'reader.yuriproject.net/read/.+',
      'ecchi.japanzai.com/read/.+',
      'h.japanzai.com/read/.+',
      'reader.japanzai.com/read/.+',
      '(raws\\.)?yomanga.co(/reader)?/read/.+',
      'hentai.cafe/manga/read/.+',
      '(www\\.)?yuri-ism\\.net/slide/read/.'
    ].join('|') + ")",
    img: function() {
      return W.pages[W.current_page].url;
    },
    next: reuse.na,
    numpages: function() {
      return W.pages.length;
    },
    curpage: function() {
      return W.current_page + 1;
    },
    nextchap: function(prev) {
      var desired;
      var dropdown = getEls('ul.dropdown')[1] || getEls('ul.uk-nav')[1];
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
      if(W.location.href.indexOf('yomanga') !== -1) {
        // select all possible variable names for data structure
        var matches = [].slice.call(document.body.innerHTML.match(/\w+\s*=\s*\[\{"id"/ig));
        // extract actual variable name from match
        var tokens = matches.map(function(m) {
          var tok = m.match(/^(\w+)\s*=/i);
          return tok && tok[1];
        });
        // determine the variable that holds the largest data structure
        var largest;
        var max = 0;
        tokens.forEach(function(token) {
          var cur = W[token];
          if(cur && cur.length > max && [].every.call(cur, function(pg) { return pg.url.endsWith(pg.filename); })) {
            max = cur.length;
            largest = cur;
          }
        });
        W.pages = largest || 'fail';
      }
      return W.pages;
    }
  }, {
    name: 'tsumino',
    match: '^https?://(www\\.)?tsumino.com/Read/View/.+',
    img: '.reader-img',
    next: reuse.na,
    numpages: function(curpage) {
      return W.reader_max_page;
    },
    curpage: function() {
      return W.reader_current_pg;
    },
    pages: function(url, num, cb) {
      var self = this;
      if(!self._pages) {
        ajax({
          method: 'POST',
          url: '/Read/Load',
          data: 'q=' + W.location.href.match(/View\/(\d+)/)[1],
          responseType: 'json',
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          },
          onload: function(e) {
            var res = e.target.response;
            if(!res) return log('failed to load tsumino pages, site has probably been updated, report on forums', 'error');
            self._pages = res.reader_page_urls.map(function(page) {
              return W.reader_baseobj_url + '?name=' + encodeURIComponent(page);
            });
            cb(self._pages[num - 1], num);
          }
        });
      } else {
        cb(self._pages[num - 1], num);
      }
    },
    wait: '.reader-img'
  }, {
    name: 'dynasty-scans',
    match: "^https?://dynasty-scans.com/chapters/.*",
    img: '#image > img',
    next: reuse.na,
    numpages: function() {
      return W.pages.length;
    },
    curpage: function() {
      return parseInt(getEl('#image > div.pages-list > a.page.active').getAttribute('href').slice(1));
    },
    nextchap: '#next_link',
    prevchap: '#prev_link',
    pages: function(url, num, cb, ex) {
      url = W.pages[num - 1].image;
      cb(url, url);
    }
  }, {
    name: 'hentaibox',
    match: 'https?://www\\.hentaibox\\.net/hentai-manga/[^/]+/[0-9]+',
    img: 'td > center > a > img',
    next: 'td > center > a',
    numpages: function(cur) {
      var sel = getEl('select[name=np2]');
      if(sel) {
        var info = sel.options[0].textContent.match(/Page ([0-9]+) out of ([0-9]+)/i);
        if(info && info.length >= 3) return parseInt(cur ? info[1] : info[2]);
      }
    },
    curpage: function() {
      return this.numpages(true);
    }
  }, {
    name: 'hentai-free', // trying to only show button on manga pages, but URL scheme makes it tough.
    match: "^http://hentai-free.org/(?!(?:tag|manga-doujinshi|hentai-video|hentai-wall|tags-map)/|.*\\?).+/$",
    img: function() {
      return W.pages[0];
    },
    next: reuse.na,
    numpages: function() {
      return W.pages.length;
    },
    curpage: function() {
      return 1;
    },
    wait: function() {
      var links = getEls('.gallery-item a, a.bwg_lightbox_0');
      if (links.length > 0) {
        W.pages = links.map(function(el) {
          return el.href.replace(/\?.*$/, '');
        });
        return true;
      }
      return false;
    },
    pages: function(url, num, cb, ex) {
      cb(W.pages[num - 1], num);
    }
  }, {
    name: 'mangafap',
    match: "^https?://mangafap\\.com/image/.+",
    img: '#p',
    next: '#lbanner + div > a',
    numpages: 'select.span2',
    curpage: '.pagination li.active a'
  }, {
    name: 'hentai4manga',
    match: "^https?://hentai4manga\\.com/hentai_manga/.+/\\d+/$",
    img: '#textboxContent img',
    next: '#textboxContent a',
    numpages: '#sl',
    curpage: '#sl'
  }, {
    name: 'heymanga',
    match: "https?://(www\\.)?heymanga\\.me/manga/[^/]+/[0-9.]+/[0-9]+",
    img: '#img-content',
    next: function(context) {
      var num = this.curpage(context) + 1;
      return document.location.href.replace(/([0-9]+)$/, num);
    },
    numpages: function() {
      exUtil.clearAllTimeouts(); // site things mloader is an adblocker because it removes elems and blocks page, this removes the interval that checks for it
      return getEl('#page_list').length - 1;
    },
    curpage: function(context) {
      var match = getEls('#page_list > option[selected]', context);
      return parseInt(match[match.length - 1].value); // dumb site always marks page 1 as "selected" in addition to actual selected page
    },
    nextchap: 'section > .row.text-center > p + a, section > .row.text-center .ti-line-dotted + a',
    prevchap: 'section > .row.text-center .ti-hand-point-left + a',
    wait: '#page_list > option[selected]'
  }, {
    name: 'simply-hentai',
    match: "https?://(.+\\.)?simply-hentai\\.com/.+/page/[0-9]+",
    img: function(ctx) {
      return getEl('#image span:nth-of-type(2)', ctx).dataset.src;
    },
    next: '#nextLink',
    numpages: function() {
      return parseInt(getEl('.inner-content .row .m10b.bold').textContent.match(/Page\s*\d+\s*of\s*(\d+)/)[1]);
    },
    curpage: function() {
      return parseInt(getEl('.inner-content .row .m10b.bold').textContent.match(/Page\s*(\d+)/)[1]);
    },
    wait: '#image img'
  }, {
    name: 'gameofscanlation',
    match: "https?://gameofscanlation\.moe/projects/.+/.+",
    img: '.chapterPages img:first-of-type',
    next: function() {
      return location.href;
    },
    numpages: function() {
      return getEls('.chapterPages img').length;
    },
    nextchap: '.comicNextPageUrl',
    prevchap: '.comicPreviousPageUrl',
    curchap: 'select[name=chapter_list]',
    numchaps: 'select[name=chapter_list]',
    pages: function(url, num, cb, ex) {
      cb(W.pages[num - 1], location.href + '#' + num);
    },
    wait: function() {
      W.pages = getEls('.chapterPages img').map(function (el) {
        return el.src;
      });
      return W.pages && W.pages.length > 0;
    }
  }, {
    name: 'luscious',
    match: "https?://luscious\\.net/c/.+?/pictures/album/.+?/id/.+",
    img: '.icon-download',
    next: '#next',
    curpage: function() {
      return parseInt(getEl('#pj_page_no').value);
    },
    numpages: '#pj_no_pictures'
  }, {
    name: 'hentaifox',
    match: "https?://hentaifox\\.com/g/.+",
    img: '.gallery_content img.lazy',
    next: '.gallery_content a.next_nav',
    curpage: function() {
      return parseInt(extractInfo('.pag_info', {type: 'text'}));
    },
    numpages: function() {
      return extractInfo('.pag_info') - 2;
    }
  }, {
    name: 'hentai2read',
    match: "https?://hentai2read\\.com/.+",
    img: '#arf-reader',
    next: '#arf-reader',
    curpage: function() {
      return parseInt(ARFfwk.doReader.data.index);
    },
    numpages: function() {
      return ARFfwk.doReader.data['images'].length;
    },
    nextchap: function(){
      return ARFfwk.doReader.data.nextURL;
    },
    prevchap: function(){
      return ARFfwk.doReader.data.previousURL;
    },
    pages: function(url, num, cb, ex) {
      cb(ARFfwk.doReader.getImageUrl(ARFfwk.doReader.data['images'][num - 1]), num);
    }
  }, {
    name: 'hentai.ms',
    match: "http://www.hentai.ms/manga/[^/]+/.+",
    img: 'center > a > img',
    next: 'center > a:last-child',
    curpage: function() {
      return parseInt(getEl('center > a').parentNode.textContent.match(/([0-9]+)\//)[1]);
    },
    numpages: function() {
      return parseInt(getEl('center > a').parentNode.textContent.match(/\/([0-9]+)/)[1]);
    }
  }]
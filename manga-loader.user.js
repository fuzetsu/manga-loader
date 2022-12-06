// ==UserScript==
// @name       Manga Loader ALL
// @namespace  https://github.com/fuzetsu/manga-loader
// @version    1.11.29
// @description  Support for over 70 sites! Loads manga chapter into one page in a long strip format, supports switching chapters, minimal script with no dependencies, easy to implement new sites, loads quickly and works on mobile devices through bookmarklet
// @copyright  2016+, fuzetsu
// @noframes
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @grant GM_listValues
// @connect *
// @match  *://*/*
// ==/UserScript==

// short reference to unsafeWindow (or window if unsafeWindow is unavailable e.g. bookmarklet)
var W = (typeof unsafeWindow === 'undefined') ? window : unsafeWindow;

var scriptName = 'Manga Loader';
var pageTitle = document.title;

var IMAGES = {
  refresh_large: 'data:image/svg+xml;charset=utf-8,<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1639 1056q0 5-1 7-64 268-268 434.5t-478 166.5q-146 0-282.5-55t-243.5-157l-129 129q-19 19-45 19t-45-19-19-45v-448q0-26 19-45t45-19h448q26 0 45 19t19 45-19 45l-137 137q71 66 161 102t187 36q134 0 250-65t186-179q11-17 53-117 8-23 30-23h192q13 0 22.5 9.5t9.5 22.5zm25-800v448q0 26-19 45t-45 19h-448q-26 0-45-19t-19-45 19-45l138-138q-148-137-349-137-134 0-250 65t-186 179q-11 17-53 117-8 23-30 23h-199q-13 0-22.5-9.5t-9.5-22.5v-7q65-268 270-434.5t480-166.5q146 0 284 55.5t245 156.5l130-129q19-19 45-19t45 19 19 45z" /></svg>'
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

var exUtil = {
  clearAllTimeouts: function() {
    var id = window.setTimeout(function() {}, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
};

var default_repo_url = 'https://raw.githubusercontent.com/TsXor/manga-loader/master/impls/'

// Change this variable to control if you want to load NSFW implementations.
var repo_enabled = ["nsfw", "normal"];

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

var storeList = function() {
  if (typeof GM_listValues === "undefined") {
    var klist = [];
    for (var i = 0; i < localStorage.length; i++) {
      klist.append(localStorage.key(i));
    }
    return klist;
  }
  //return GM_listValues();
  // workaround
  return GM_listValues().filter(function(v) {return GM_getValue(v) ? true : false});
};

var storeDel = function(key) {
  if (typeof GM_deleteValue === "undefined") {
    localStorage.removeItem(key);
  }
  GM_deleteValue(key);
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
      if(target.nodeName === 'IMG') {
        showFloatingMsg('');
        if(!target.title) {
          var pgnum = target.id.substr(10)
          showFloatingMsg('Fetching URL of picture of page ' + pgnum, 3000);
          sessionStorage.setItem("RimgUrl", 'notyet');
          window.reload = function() {
            var pgsrc = sessionStorage.getItem("RimgUrl");
            log('pagenum : ' + pgnum + ', pagesrc : ' + pgsrc);
            showFloatingMsg('Reloading "' + pgsrc + '"', 3000);
            if(target.complete) target.onload = null;
            target.src = pgsrc + (pgsrc.indexOf('?') !== -1 ? '&' : '?') + new Date().getTime();
          }
          //the function reload was inserted into the function dummy_addAndLoad inside the function getUrl to make sure reload was done after URL of the picture is fetched
           getUrl(pgnum)
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
        '<textarea style="width: 500px; height: 150px;" type="text" class="ml-setting-css">' + prof.css + '</textarea><br><br>';
      // start new column
      settings += '</td><td rowspan="2">';
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
      // start new grid
      settings += '</td></tr><tr><td>';
      // repo settings
      var repo_version, repo_url;
      [repo_version, repo_url] = MLoaderGetLocalRepoInfo();
      settings += "Implementation Repository Settings<br><br>";
      settings += 'Repo URL: (current repo version: ' + repo_version + ')<br>' +
        '<input class="ml-setting-repo_url" size="50" type="text" value="' + repo_url + '" /><br><br>';
      settings += 'Manual repo update: ' +
        '<button class="ml-setting-updrepo">Fetch update from repo</button> ' +
        '<button class="ml-setting-forceupdrepo">Force update</button><br>' +
        'Note: Force update is for debugging. It will update local repo info without considering version and will erase version info of all implementations so that they will be reloaded.<br><br>';
      var imp_code, override;
      [imp_code, override] = MLoaderGetImpCode(window.impInfo[0], window.impInfo[1]);
      settings += 'Edit Implementations: <br>' +
        'Category: <select class="ml-setting-impl_filter">\
          <option value="Current">Impl being used</option>\
          <option value="RepoLocal">Impls downloaded from repo</option>\
          <option value="RepoAll">All impls available from repo</option>\
          <option value="UserOverride">Impls created or edited by user</option>\
        </select><br>' +
        'Implementation: ' + constructImplHTMLSelect(getTargetImplInfo('Current'), 'ml-setting-target_impls') +
        ' <button class="ml-setting-del_impl">Delete Impl</button><br>' +
        '<span class="ml-setting-impl_is_override">User Override: ' + (override ? 'YES' : 'NO') + ' </span>' +
        '<button class="ml-setting-new_ovrd">New User Override</button> ' +
        '<button class="ml-setting-del_ovrd">Discard User Override</button> <br>' +
        '<textarea data-modified="" data-impName="' + window.impInfo[1] + '" style="width: 500px; height: 150px;" type="text" class="ml-setting-edited_impl">' +
          imp_code +
        '</textarea><br>';
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
      // handle repo settings button
      getEl('.ml-setting-updrepo', UI.floatingMsg).onclick = MLoaderUpdateImpls;
      getEl('.ml-setting-forceupdrepo', UI.floatingMsg).onclick = MLoaderForceUpdateImpls;
      // handle repo editing
      // "Category" select
      getEl('.ml-setting-impl_filter', UI.floatingMsg).onchange = function(e) {
        var editBox = getEl('.ml-setting-edited_impl', UI.floatingMsg);
        editBox.value = '';
        var select_obj = e.target;
        var filter_name = select_obj.options[select_obj.selectedIndex].value;
        var impl_select_obj = getEl('.ml-setting-target_impls', UI.floatingMsg);
        impl_select_obj.innerHTML = constructImplHTMLSelect(getTargetImplInfo(filter_name), '', true);
        if (filter_name == 'RepoAll') {
          impl_select_obj.selectedIndex = impl_select_obj.options.length;
        }
        impl_select_obj.dispatchEvent(new Event('change'))
      };
      // impl select
      getEl('.ml-setting-target_impls', UI.floatingMsg).onchange = function(e) {
        var select_obj = e.target;
        var editBox = getEl('.ml-setting-edited_impl', UI.floatingMsg);
        if (editBox.dataset.modified) {
          if (confirm('This impl is modified, save?')) {
            saveUserOverride(editBox.dataset.impName, editBox.value);
          }
        }
        var isOverrideText = getEl('.ml-setting-impl_is_override', UI.floatingMsg);
        var imp_info = select_obj.options[select_obj.selectedIndex].value.split(',');
        var imp_code, override;
        [imp_code, override] = MLoaderGetImpCode(imp_info[0], imp_info[1]);
        editBox.value = imp_code;
        editBox.dataset.impName = imp_info[1];
        editBox.dataset.modified = '';
        isOverrideText.innerHTML = 'User Override: ' + (override ? 'YES' : 'NO');
      };
      // monitor editbox change
      getEl('.ml-setting-edited_impl', UI.floatingMsg).onchange = function(e) {e.target.dataset.modified = 'Y';};
      // delete impl
      getEl('.ml-setting-del_impl', UI.floatingMsg).onclick = function() {
        var select_obj = getEl('.ml-setting-target_impls', UI.floatingMsg);
        var selidx = select_obj.selectedIndex;
        var imp_info = select_obj.options[select_obj.selectedIndex].value.split(',');
        var imp_name = imp_info[1];
        storeDel('MLoaderImp_' + imp_name);
        storeDel('MLoaderImpVer_' + imp_name);
        // trigger refresh
        var filter_select_obj = getEl('.ml-setting-impl_filter', UI.floatingMsg);
        var filter_name = filter_select_obj.options[filter_select_obj.selectedIndex].value;
        filter_select_obj.dispatchEvent(new Event('change'));
        if (filter_name == 'RepoAll') {
          select_obj.selectedIndex = select_obj.options.length;
        } else {
          select_obj.selectedIndex = selidx;
        }
        select_obj.dispatchEvent(new Event('change'));
      };
      // discard override
      getEl('.ml-setting-del_ovrd', UI.floatingMsg).onclick = function() {
        var select_obj = getEl('.ml-setting-target_impls', UI.floatingMsg);
        var selidx = select_obj.selectedIndex;
        var imp_info = select_obj.options[select_obj.selectedIndex].value.split(',');
        var imp_name = imp_info[1];
        deleteUserOverride(imp_name);
        deleteUserMatch(imp_name);
        var editBox = getEl('.ml-setting-edited_impl', UI.floatingMsg);
        editBox.value = '';
        // trigger refresh
        var filter_select_obj = getEl('.ml-setting-impl_filter', UI.floatingMsg);
        filter_select_obj.dispatchEvent(new Event('change'));
        select_obj.selectedIndex = selidx;
        select_obj.dispatchEvent(new Event('change'));
      };
      // new override for new site
      getEl('.ml-setting-new_ovrd', UI.floatingMsg).onclick = function() {
        var imp_name = prompt('Name this impl: ');
        if (!imp_name) {alert('illegal name'); return;}
        var all_ovrd_name = getTargetImplInfo('UserOverride').map(function(i) {return i[1]});
        if (imp_name in all_ovrd_name) {alert('name is already used'); return;}
        var imp_regex = prompt('Give a regex that can match the target of this impl: ');
        try {new RegExp(imp_regex);} catch (e) {alert('invalid regex'); return;}
        saveUserOverride(imp_name, '// METADATA\n' + 
          '// name: ' + imp_name + '\n' +
          '// match: ' + imp_regex + '\n' +
          '// Your code here ...\n'
        );
        saveUserMatch(imp_name, imp_regex);
        // trigger refresh
        var select_obj = getEl('.ml-setting-target_impls', UI.floatingMsg);
        var filter_select_obj = getEl('.ml-setting-impl_filter', UI.floatingMsg);
        filter_select_obj.selectedIndex = filter_select_obj.options.length-1;
        filter_select_obj.dispatchEvent(new Event('change'));
        select_obj.selectedIndex = select_obj.options.length-1;
        select_obj.dispatchEvent(new Event('change'));
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
        // repo settings
        var input_url = getEl('.ml-setting-repo_url').value;
        storeSet('repo_url', input_url);
        // edited impl
        var editBox = getEl('.ml-setting-edited_impl', UI.floatingMsg);
        if (editBox.dataset.modified) {
            saveUserOverride(editBox.dataset.impName, editBox.value);
            getEl('.ml-setting-edited_impl', UI.floatingMsg).dataset.modified = '';
        }
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
  var goToPage = function(toWhichPage) {
  	var curId = getCurrentImage().id;
  	var nextId = curId.split('-');
  	switch (toWhichPage) {
  		case 'next':
  			nextId[2] = parseInt(nextId[2]) + 1;
  			break;
  		case 'previous':
  			nextId[2] = parseInt(nextId[2]) - 1;
  			break;
  	}
  	var nextPage = getEl('#' + nextId.join('-'));
  	if (nextPage == null) {
  		log(curId + " > " + nextId);
  		log("Reached the end!");
  	} else {
  		nextPage.scrollIntoView();
  	}
  }
  // keybindings
  UI.keys = {
    PREV_CHAP: 90, EXIT: 88, NEXT_CHAP: 67,
    SCROLL_UP: 87, SCROLL_DOWN: 83,
    ZOOM_IN: 187, ZOOM_OUT: 189, RESET_ZOOM: 48,
    PREV_PAGE: 37, NEXT_PAGE: 39,
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
      case UI.keys.NEXT_PAGE:
        goToPage('next');
        break;
      case UI.keys.PREV_PAGE:
      	goToPage('previous');
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
  image.id = 'ml-pageid-' + imgNum;
  image.onload = callback;
  image.src = src;
  var imgwithcounter = document.createElement('div');
  imgwithcounter.id = 'page-' + imgNum;
  loc.appendChild(imgwithcounter);
  imgwithcounter.appendChild(image);
  imgwithcounter.appendChild(counter);
};

window.UrlList = new Array();
window.PageList = new Array();
window.firstpage = 1
//this function re-requests image url from page number
var getUrl = function(pagenum) {
  pagenum = Number(pagenum)
  //get page url from pre-saved array
  var arrnum = pagenum - window.firstpage
  //sometimes the url of a page is not included in the UrlList so we need to do a lookup in the PageList ;)
  var Rpageurl
  if (window.PageList[arrnum] == pagenum) {
    Rpageurl = window.UrlList[arrnum]
  } else if (window.PageList.includes(pagenum)) {
    log('urllist error, but found in the pagelist')
    Rpageurl = window.UrlList[window.PageList.indexOf(pagenum)]
    log('Found '+Rpageurl)
  } else {
    //in some very rare situation, the page and its url is missing, so we need to ... REDO ;)
    log('urllist error, not found in the pagelist, re-fetching')
    var findlast = function(num) {
      var last
      for (var i in window.PageList) {
        if (i < pagenum) {
          last = pagenum
        } else {
          return last
        }
      }
    }
    var lastavail = findlast(pagenum)
    log('Last available page is ' + lastavail + ', loading from it')
    //to be done. too complicated :(
    log('This feature is not implemented, nothing is done, including refreshing. :(')
  }
  //reuse function loadNextPage and getPageInfo
  //imp all replaced with window.imp which is defined globally in function MLoaderLoadImps
  //import needed functions
  var xhr = new XMLHttpRequest();
  var ex = extractInfo.bind(window.imp)
  var retries = 5
  var d = document.implementation.createHTMLDocument()
  //getPageInfo start
  var RgetPageInfo = function() {
    var page = d.body;
    d.body.innerHTML = xhr.response;
    try {
      dummy_addAndLoad(ex('img', window.imp.imgmod, page), ex('next', null, page));
    } catch (e) {
      if (xhr.status == 503 && retries > 0) {
        log('xhr status ' + xhr.status + ' retrieving ' + xhr.responseURL + ', ' + retries-- + ' retries remaining');
        window.setTimeout(function() {
          xhr.open('get', xhr.responseURL);
          xhr.send();
        }, 500);
      } else {
        log(e);
        log('error getting details from page' + pagenum + '.');
        sessionStorage.setItem("RimgUrl", 'err');
        window.reload();
      }
    }
  }
  //getPageInfo end
  //loadNextPage start
  var RloadNextPage = function(url) {
    if (window.imp.pages) {
      window.imp.pages(url, pagenum, dummy_addAndLoad, ex, RgetPageInfo);
    } else {
      var colonIdx = url.indexOf(':');
      if(colonIdx > -1) {
        url = location.protocol + url.slice(colonIdx + 1);
      }
      xhr.open('get', url);
      window.imp.beforexhr && window.imp.beforexhr(xhr);
      xhr.onload = RgetPageInfo;
      xhr.onerror = function() {
        log('failed to load page, aborting', 'error');
        sessionStorage.setItem("RimgUrl", 'err');
        window.reload();
      };
      xhr.send();
    }
  }
  //loadNextPage end
  //dummy function used to collect url from imp.pages
  //now it also does reload. not really dummy anymore. XD
  var dummy_addAndLoad = function(img, next) {
    if (sessionStorage.getItem("RimgUrl") != 'err') {
      sessionStorage.setItem("RimgUrl", img);
      window.reload();
    }
  }
  RloadNextPage(Rpageurl)
}
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
        window.PageList.push(curPage+1)
        window.UrlList.push(url)
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
  //this log shows that variable imgUrl is the URL of image, not the URL of the page
  //and in fact this log only show up ONCE
  log ("imgUrl : " + imgUrl + ", curPage : " + curPage)
  //this indicates that function loadManga ONLY RUN ONCE
  //in fact, following changes on variable curPage is done in function loadNextPage
  //so here we can get the first page
  window.firstpage = curPage
  window.PageList.push(curPage)
  window.UrlList.push(window.location.href)
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

var version2num = function(verstr) {
  var vernum = 0;
  var verarr = verstr.split(".").reverse();
  for (var i = 0; i < verarr.length; i++) { 
    vernum += verarr[i] * Math.pow(100, i);
  }
  return vernum
}

var MLoaderGetLocalRepoInfo = function() {
  var repo_version = storeGet("repo_version");
  repo_version = repo_version ? repo_version : 0;
  repo_url = storeGet("repo_url");
  repo_url = repo_url ? repo_url : default_repo_url;
  return [repo_version, repo_url];
}

var MLoaderCheckoutImpRepo = function(force=false) {
  var repo_version, repo_url;
  [repo_version, repo_url] = MLoaderGetLocalRepoInfo();
  
  var request;
  
  request = new XMLHttpRequest();
  request.open("GET", repo_url+"version", false);
  request.send(null);
  var remote_version = request.responseText;
  remote_version = remote_version ? version2num(remote_version) : 0;
  
  if (remote_version > repo_version || !storeGet("repo_info") || force) {
    request = new XMLHttpRequest();
    request.open("GET", repo_url+"repo.json", false);
    request.send(null);
    storeSet("repo_info", request.responseText);
    storeSet("repo_version", remote_version);
    //console.log(request);
  }
}

var MLoaderGetImpName = function() {
  MLoaderCheckoutImpRepo()
  //console.log(storeGet("repo_info"));
  var repo_info = JSON.parse(storeGet("repo_info"));
  var sreponame; var subrepo; var matchregex;

  var i; var j;
  for (i = 0; i < repo_enabled.length; i++) {
    sreponame = repo_enabled[i];
    subrepo = repo_info[sreponame];
    for (var key in subrepo["direct_match"]) {
      if (pageUrl.search(key) != -1) {
        matchregex = subrepo["direct_match"][key];
        if (!(new RegExp(matchregex, 'i')).test(pageUrl)) { return [null, null]; }
        return [sreponame, key];
      }
    }
    for (var key in subrepo["regex"]) {
      matchregex = subrepo["regex"][key];
      if ((new RegExp(matchregex, 'i')).test(pageUrl)) { return [sreponame, key]; }
    }
  }
  var um = storeGet("user_match");
  for (var key in um) {
    matchregex = um[key];
    if ((new RegExp(matchregex, 'i')).test(pageUrl)) { return ['local', key]; }
  }
  return [null, null];
}

var MLoaderGetImpCode = function(srepo_name, imp_name) {
  var imp_code = storeGet("MLoaderImp_" + imp_name);
  var imp_ver = storeGet("MLoaderImpVer_" + imp_name);
  imp_ver = imp_ver ? imp_ver : 0;
  var repo_version, repo_url;
  [repo_version, repo_url] = MLoaderGetLocalRepoInfo();

  if ((!imp_code || imp_ver < repo_version) && srepo_name != "local") {
    var request = new XMLHttpRequest();
    request.open("GET", repo_url + srepo_name + "/" + imp_name + ".js", false);
    request.send(null);
    //console.log(request.status);
    imp_code = request.status == 200 ? request.responseText : '';
    //console.log(imp_code);
    storeSet("MLoaderImp_" + imp_name, imp_code);
    storeSet("MLoaderImpVer_" + imp_name, repo_version)
  }
  
  var user_override = storeGet("UserOverrideImp_" + imp_name);
  var override = false;
  if (user_override) {
    console.log('Using user override for '+ srepo_name + '->' + imp_name);
    override = true;
    imp_code = user_override;
  }
  return [imp_code, override];
}

var MLoaderGetImpObj = function(srepo_name, imp_name) {
  var imp_code = MLoaderGetImpCode(srepo_name, imp_name)[0];
  eval(imp_code); return impl_src;
}

var MLoaderLoadImps = function() {
  [currentSubRepo, currentImpName] = MLoaderGetImpName();
  if (!currentImpName) { log('no implementation for ' + pageUrl, 'error'); return; }

  //make current implementation public for other use
  window.impInfo = [currentSubRepo, currentImpName];
  window.imp = MLoaderGetImpObj(currentSubRepo, currentImpName);
  if (W.BM_MODE || (autoload !== 'no' && (mAutoload || autoload))) {
    log('autoloading...');
    waitAndLoad(imp);
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
};

var MLoaderUpdateImpls = function() {
  MLoaderCheckoutImpRepo(false);
}

var filterStoreKeyPrefix = function(prefix) {
  var ikeys = storeList();
  var prefix_len = prefix.length;
  return ikeys.filter(function(ikey) { return ikey.substr(0, prefix_len) == prefix });
}

var MLoaderForceUpdateImpls = function() {
  MLoaderCheckoutImpRepo(true);
  // flush version of all imps
  var verkeys = filterStoreKeyPrefix("MLoaderImpVer_")
  verkeys.map(function(ikey) { storeDel(ikey) });
}

var getTargetImplInfo = function(flag) {
  switch (flag) {
    case 'Current':
      return [window.impInfo];
    case 'RepoLocal':
      return filterStoreKeyPrefix("MLoaderImp_")
        .map(function(k) { return ["local", k.substr("MLoaderImp_".length)] });
    case 'RepoAll':
      var repo_info = JSON.parse(storeGet("repo_info"));
      var srepos = Object.keys(repo_info);
      return srepos
        .map(function(srname) {return [srname, [].concat(Object.keys(repo_info[srname]["direct_match"]),
                                                         Object.keys(repo_info[srname]["regex"]       ))]})
        .map(function(srlist) {return srlist[1].map(function(implname) {return [srlist[0], implname]})})
        .reduce(function(total, currentValue) {return total.concat(currentValue)}, []);
    case 'UserOverride':
      return filterStoreKeyPrefix("UserOverrideImp_")
        .map(function(k) { return ["local", k.substr("UserOverrideImp_".length)] });
    default:
      return [null];
  }
}

var constructImplHTMLSelect = function(imp_infos, classname='', inner=false) {
  var items = imp_infos
    .map(function(imp_info) {return '<option value ="'+imp_info+ '">'+imp_info[1]+' ('+imp_info[0]+')</option>'})
    .reduce(function(total, currentValue) {return total + currentValue}, '');
  return inner ? items : '<select class="' + classname + '">' + items + '</select>'
}

var saveUserOverride = function(imp_name, code) {
  storeSet("UserOverrideImp_" + imp_name, code);
}

var deleteUserOverride = function(imp_name) {
  storeDel("UserOverrideImp_" + imp_name);
}

var saveUserMatch = function(imp_name, regex) {
  var um_info = storeGet("user_match");
  um_info = um_info ? um_info : {};
  um_info[imp_name] = regex;
  storeSet("user_match", um_info);
}

var deleteUserMatch = function(imp_name) {
  var um_info = storeGet("user_match");
  um_info = um_info ? um_info : {};
  delete um_info[imp_name];
  storeSet("user_match", um_info);
}

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

// extra check for settings (hack) on dumb firefox/scriptish, settings aren't updated until document end
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


MLoaderLoadImps();

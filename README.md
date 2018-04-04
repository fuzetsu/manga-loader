# [Manga Loader](https://greasyfork.org/en/scripts/692-manga-loader)

## Contributing
I have decided to put this script on github in the hopes people start submitting their implementations for new sites to speed up the development. 

A while back I put together a video to show off the basic procedure for creating an implementation for Manga Loader, if you are interested in adding a new site yourself, but do not know how, check out [this video.](https://www.youtube.com/watch?v=zgaogJCL8xQ)

I do not have much time to work on this nowadays, but at the same time I do not want the project to be left behind, so let's see how this goes!

## About

Simple. Lightweight. Fast. 

Manga Loader allows loading of entire chapters from manga sites in a longstrip format (all images on one page).

Manga Loader tries to remove the bloat many other similar scripts have.

When visiting a page supporting Manga Loader, a button will appear with the text "Load Manga".  
Click the button or press `Ctrl+,` on the keyboard to load the manga into the current page.

To automatically load the userscript whenever possible, enable autoload from the settings menu.

The script loads 10 images at a time (by default) and loads when scrolling.  
To load all the images in the chapter at once, change the load num setting to the word "all".  
To load a specific number of pages, change the load num setting to the preferred number.  
Loading less pages at once is useful if experiencing broken images or browser slowdowns.  

Manually reload a misbehaving image (loading unusually slow, or stuck loading half way) by clicking the small refresh icon in the bottom right info/toolbar, then click on the image.

**Bookmarklet**: To use the script as a bookmark, copy the following code and create a bookmark. Make sure the `javascript:` part of the code is still there after pasting, otherwise the bookmark function will not work. **This method also works for using the script on mobile devices such as phones and tablets**.
`javascript:(function(){BM_MODE=true;document.body.appendChild(document.createElement('script')).src='https://greasyfork.org/scripts/692-manga-loader/code/Manga%20Loader.user.js';}())`

### Using the script on mobile devices
**This video demonstrates using the script on an Android phone, but Manga Loader should work on any mobile device including iPhones, iPads and other tablets/phones**
**<a href="https://www.youtube.com/watch?v=QaQt2y5G_mE">Mobile Bookmarklet Demo Video</a>**

### Default Keybindings (configurable):
- **Z**  - previous chapter
- **X**  - exit
- **C**  - next chapter
- **W**  - scroll up
- **S**  - scroll down
- **\+** - zoom in
- **\-** - zoom out
- **0**  - reset zoom

**NEW in v1.7.x: Settings panel**  
- Define custom CSS in the new settings panel (accessible through the gear icon at the bottom left).
- The CSS will be saved and reapplied each time the script loads.
- Change the background color of the page, the width of the images and anything else in the settings panel.

**NEW in v1.8.x: Custom page loading and keybindings**  
- The settings menu introduced in v1.7.x now contains all settings including number of pages to load and whether or not to autoload.
- Now possible to set exactly how many pages to lazyload instead of choosing between all or 10.
- To change the default keybindings in the settings panel, focus the corresponding textbox and press the key you would like to assign. 

**NEW in v.1.10.x: CSS profiles**
- Define multiple named css profiles you can switch between in the settings menu.

**NEW in v1.11.x: Zooming**
-  Zoom in and out of images using the +/-/0 (plus/minus/zero) keys (configurable).

### How to get to the menu options for this script

Click the gear icon at the bottom right of the screen while the script is active.

# Changelog

See a summary of changes for each new version of the script <a href="https://greasyfork.org/en/scripts/692-manga-loader/versions">here</a>.

# Supported Sites

### Manga

* http://bato.to
* http://mangafox.me
* http://readms.com
* http://mangareader.net
* http://mangahere.co
* http://mangapanda.com
* http://mangapark.me
* http://mangacow.co
* http://mangatown.com
* http://manga-joy.com
* http://mangawall.com
* http://manga.animea.net
* http://www.thespectrum.net/manga_scans
* http://kissmanga.com
* http://mangadoom.co
* http://www.mangago.me
* http://eatmanga.com
* http://mangalator.ch
* http://www.mangacat.me
* http://www.mangakaka.com
* http://www.readmanga.today
* http://raw.senmanga.com
* http://manga.redhawkscans.com
* http://reader.s2smanga.com
* http://casanovascans.com
* http://mangatraders.org
* http://mangainn.me
* http://reader.vortex-scans.com
* http://reader.roseliascans.com
* http://mangatopia.net
* http://www.twistedhelscans.com
* http://sensescans.com
* http://reader.kireicake.com
* http://substitutescans.com
* http://mangaichiscans.mokkori.fr
* http://reader.shoujosense.com
* http://www.friendshipscans.com
* http://www.mangachapter.me
* http://kawaii.ca/reader
* http://manga.famatg.com
* http://www.demonicscans.com/FoOlSlide/directory
* http://kobato.hologfx.com/reader
* http://reader.cafeconirst.com
* http://reader.evilflowers.com
* http://manga.inpowerz.com
* http://necron99scans.com/reader
* http://otscans.com/foolslide/directory
* http://reader.psscans.info
* http://kawaii.ca/reader
* http://lonemanga.com
* https://manga.madokami.com
* http://read.egscans.com
* https://jaiminisbox.com/reader
* http://imperialscans.com
* http://spinybackmanga.com
* http://www.senmanga.com
* http://www.mangaeden.com
* http://moonbunnycafe.com/comics
* http://gomanga.co
* http://www.otakusmash.com
* http://www.mangahome.com
* http://www.mangamint.com
* http://reader.manga-download.org
* http://titaniascans.com
* http://helveticascans.com/reader
* http://reader.thecatscans.com
* http://yonkouprod.com/reader
* http://www.sh-arab.com/manga (Arabic)
* http://www.manga.ae (Arabic)
* http://mangaforall.com (Arabic)
* http://www.3asq.info (Arabic)
* http://manga-ar.net (Arabic)
* http://gmanga.me (Arabic)
* http://www.japscan.com (French)
* http://abandonedkittenscans.mokkori.fr/reader (French)
* http://www.pecintakomik.com (Indonesian)
* http://mangaindo.co (Indonesian)
* http://www.komikstation.com (Indonesian)
* http://centraldemangas.net (Portuguese)
* http://br.mangahost.com/mangas (Portuguese)
* http://hqbr.com.br (Portuguese)
* http://unionmangas.net (Portuguese)
* http://manhua.dmzj.com (Chinese)
* http://www.dmzj.com (Chinese)
* http://dm5.com (Chinese)
* http://www.kukudm.com (Chinese)
* http://www.chuixue.com (Chinese)
* http://www.mymh8.com (Chinese)
* http://www.cartoonmad.com (Chinese)
* http://tw.ikanman.com (Chinese)

### Comics

* http://hellocomic.com
* http://readcomiconline.me
* http://www.comicastle.org
* http://readcomics.tv

### Pending Site Requests

Sites that people have requested implementations for that I haven't gotten around to adding yet and/or sites that I intend to add in the future.

### Foolslide Site Requests
![Analytics](https://ga-beacon.appspot.com/UA-61974780-1/greasy-fork/manga-loader/README?pixel)

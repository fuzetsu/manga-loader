# Manga Loader

## Contributing
I've decided to put this script on github in the hopes that maybe people can start submitting their own implementations for new sites and speed up the development. 

A while back I put together a video to show off the basic procedure for creating an implementation for Manga Loader, if you're interested in adding a new site yourself, but don't know how check out [this video.](https://www.youtube.com/watch?v=zgaogJCL8xQ)

I don't have too much time to work on this nowadays but at the same time I don't want the project to be left behind, so let's see how this goes!

## About

This scripts allows you to load entire chapters from manga sites in a long strip format (all images on one page).

It is very simple, lightweight and fast and it tries to do away with the bloat that many other similar scripts have.

Support the continued development of this script: <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=N7JS2HTH36S78&lc=US&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"/></a> any amount is appreciated!

Feel free to leave feedback requesting new sites, reporting bugs or suggesting new features.

When you reach a page that supports this userscript a button will appear with the text "Load Manga", click that to load the manga into the current page. You can also press `Ctrl+,` on your keyboard.

If you prefer that the userscript loads automatically whenever possible then enable autoload from the settings menu.

The script loads 10 images at a time (by default) and loads more as you scroll, you can make the script load all the images in the chapter at once by changing the load num setting to the word "all" or whatever number you like.
Loading less pages at once is useful if you're experiencing broken images or browser slowdowns, especially when loading a manga with a lot of pages in it.

Manually reload an image that is misbehaving (loading unusually slowly, or stuck loading half way) by clicking the small refresh icon in the bottom right info/toolbar and then click on the image you would like to manually reload.

**Bookmarklet**: If you would like to use the script as a bookmark that you can manually run whenever you like just copy the following code and create a bookmark out of it. Make sure that the `javascript:` part of the code is still there after pasting otherwise it will not work. **This method also works for using the script on mobile devices such as phones and tablets**.
`javascript:(function(){BM_MODE=true;document.body.appendChild(document.createElement('script')).src='https://greasyfork.org/scripts/692-manga-loader/code/Manga%20Loader.user.js';}())`

###Using the script on your phone or tablet
**This video demonstrates using the script on an Android phone, but it should work on any mobile device including iPhones, iPads and other tablets/phones**
**<a href="https://www.youtube.com/watch?v=QaQt2y5G_mE">Mobile Bookmarklet Demo Video</a>**

### Default Keybindings (configurable):
Z - previous chapter
X - exit
C - next chapter
W - scroll up
S - scroll down
\+ - zoom in
\- - zoom out
0 - reset zoom

**NEW in v1.7.x:**
You can now define custom CSS in the new settings panel (accessible through the gear icon at the bottom left).
The CSS will be saved and reapplied each time the script loads. You can change the background color of the page, the width of the images and pretty much anything else.

**NEW in v1.8.x:**
The settings menu introduced in v1.7.x now contains all settings including number of pages to load and whether or not to autoload. You can now set exactly how many pages to lazyload instead of choosing between all or 10.

You can also change the default keybindings in the settings panel. Just focus the corresponding textbox and press the key you'd like to assign. 

**NEW in v.1.10.x:**
CSS Profiles. Define multiple named css profiles you can switch between in the settings menu.

**NEW in v1.11.x:**
Zooming. You can now zoom in and out of images using the +/-/0 (plus/minus/zero) keys (configurable).

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

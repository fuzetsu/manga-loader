var impl_src = {
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

  //Any of the CSS selectors can be functions instead that return the desired value.
}
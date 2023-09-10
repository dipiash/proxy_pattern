// Proxy. Heavy objects are loaded on demand

;(function() {

  function setView(itemSelector) {
    var scrollTop = $( window ).scrollTop(),
        windowHeight = $( window ).height(),
        elementsCache = $( itemSelector ); // get all virtual objects

    elementsCache.each(function() {
      var element = $( this ),
          elementOffsetTop = element.offset().top;

      if (scrollTop + windowHeight >= elementOffsetTop) { // if a virtual object comes into scope, it creates a real object
        element.attr('src', element.attr('data-src'));
        // removing information that this is a virtual object.
        element.removeClass('preloader');
      }
    });
  }

  // Checking if there is a virtual object in the scope when loading the page
  setView('.img__item.preloader');

  // Checking if there is a virtual object in the scope when scrolling the page
  $(window).scroll(function() {
    setView('.img__item.preloader');
  });

})();

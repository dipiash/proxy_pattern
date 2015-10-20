// вирутальный заместитель. Тяжелые объекты загружаются по требованию

;(function() {

  function setView(itemSelector) {
    var scrollTop = $( window ).scrollTop(),
        windowHeight = $( window ).height(),
        elementsCache = $( itemSelector );

    elementsCache.each(function() {
      var element = $( this ),
          offsetTop = element.offset().top;

      if (scrollTop + windowHeight >= offsetTop) {
        element.attr('src', element.attr('data-src'));
        element.removeClass('preloader');
      }
    });
  }

  setView('.img__item.preloader');

  $(window).scroll(function() {
    setView('.img__item.preloader');
  });

})();

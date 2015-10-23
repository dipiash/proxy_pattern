// вирутальный заместитель. Тяжелые объекты загружаются по требованию

;(function() {

  function setView(itemSelector) {
    var scrollTop = $( window ).scrollTop(),
        windowHeight = $( window ).height(),
        elementsCache = $( itemSelector ); // получаем все виртуальные объекты

    elementsCache.each(function() {
      var element = $( this ),
          elementOffsetTop = element.offset().top;

      if (scrollTop + windowHeight >= elementOffsetTop) { // если виртуальный
        // объект попадает в область видимости, то
        // создает реальный объект
        element.attr('src', element.attr('data-src'));
        // удалемя информацию о том, что это виртуальный объект.
        element.removeClass('preloader');
      }
    });
  }

  // Проверяем, а нет ли при загрузке страницы виртуального объекта в области
  // видимости
  setView('.img__item.preloader');

  // Проверяем, а нет ли при скроллинге страницы виртуального объекта в области
  // видимости
  $(window).scroll(function() {
    setView('.img__item.preloader');
  });

})();

// Удаленный заместитель. Предоставляем локальный объект вместо удаленного
// (в БД)

;(function() {

  var User = {
    // кэшируем информацию о пользователе
    cacheUserInfo:  function (uid, info) {
                      console.log("Кэшируем информацию в Localstorage");

                      localStorage.setItem("user_id_" + uid, info);

                      console.log("Информация закеширована");

                      return;
                    },
    // получаем информацию о пользователе
    getUserInfo:  function (uid) {
                    var info = localStorage.getItem('user_id_' + uid),
                    tmp_this = this;

                    if (info) { // если есть в localstorage
                      console.log("Получена информация из кэша: " + info);

                      // возвращаем информацию о пользователе
                      return info;
                    }

                    // запрос в БД идет только в том случае, если нет кэша
                    console.log("Получаем информацию из БД")
                    $.ajax({
                      type: 'GET',
                      url: 'http://localhost:3000/users/' + uid,
                      dataType: 'json',
                      success: function(data) {
                        info = JSON.stringify(data);
                        console.log("Получена информация из БД: " + info);

                        // кэшируем полученную информацию в localStorage
                        tmp_this.cacheUserInfo(data.id, info);

                        return info;
                      }
                    });
                  },
    // обновляемя информацию о пользователе
    updateUserInfo: function(uid, data) {
                      var tmp_this = this;
                      $.ajax({
                        type: 'PATCH',
                        data: data,
                        url: 'http://localhost:3000/users/' + uid + '?&',
                        dataType: 'json',
                        success: function(data) {
                          info = JSON.stringify(data);
                          console.log("Обновлена информация в БД: " + info);

                          // в случае успешного ответа, кэшируем информацию
                          // о пользователе, чтобы не делать лишние запросы, и
                          // не поулчать устаревшую информацию
                          tmp_this.cacheUserInfo(data.id, info);

                          console.log("Обновлен кэш в localStorage");

                          return info;
                        }
                      });
                    },
    // инвалидируем кэш
    invalidateInfo: function (uid) {
                      if (!uid) { // игвалидация всего кэша
                        localStorage.clear();
                        console.log("Инвалидирован весь кэш.");
                        return;
                      }

                      // инвалидация кэша, только для указанного пользователя
                      localStorage.removeItem("user_id_" + uid);
                      console.log("Инвалидирован кэш для указнного пользователя.");
                      return;
                    }
  };


  //Обработчики --------------------------------------------

  $(document).on('click', '#getInfo', function(e) {
    User.getUserInfo( $('#get_id').val() );
  })

  $(document).on('click', '#updInfo', function(e) {
    var data = $( this ).parent().serialize();
    User.updateUserInfo( $('#patch_id').val(), data );
  })

  $(document).on('click', '#invalidateInfo', function(e) {
    var uid = $('#invalid').val() || 0;
    User.invalidateInfo( uid );
  })

})();

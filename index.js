var User = {
  cacheUserInfo:  function (uid, info) {
                    console.log("Кэшируем информацию в Localstorage");

                    localStorage.setItem("user_id_" + uid, info);

                    console.log("Информация закеширована");

                    return;
                  },
  getUserInfo:  function (uid) {
                  var info = localStorage.getItem('user_id_' + uid),
                  tmp_this = this;

                  if (info) { // если есть в localstorage
                    console.log("Получена информация из кэша: " + info);
                    return info;
                  }

                  console.log("Получаем информацию из БД")
                  $.ajax({
                    type: 'GET',
                    url: 'http://localhost:3000/users/' + uid,
                    dataType: 'json',
                    success: function(data) {
                      info = JSON.stringify(data);
                      console.log("Получена информация из БД: " + info);

                      tmp_this.cacheUserInfo(data.id, info);

                      return info;
                    }
                  });
                },
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

                        tmp_this.cacheUserInfo(data.id, info);

                        console.log("Обновлен кэш в localStorage");

                        return info;
                      }
                    });
                  },
  invalidateInfo: function (uid) {
                    var tmp_this = this;
                    if (uid == 0) {
                      localStorage.clear();
                      console.log("Инвалидирован весь кэш.");
                      return;
                    }

                    localStorage.removeItem("user_id_" + uid);
                    console.log("Инвалидирован кэш для указнного пользователя.");
                    return;
                  }
};


$(document).on('click', '#getInfo', function(e) {
  User.getUserInfo($('#get_id').val());
})

$(document).on('click', '#updInfo', function(e) {
  var data = $( this ).parent().serialize();
  User.updateUserInfo($('#patch_id').val(), data);
})

$(document).on('click', '#invalidateInfo', function(e) {
  var uid = $('#invalid').val() || 0;
  User.invalidateInfo(uid);
})

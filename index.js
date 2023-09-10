// Proxy. We provide a local object instead of a remote one (in the database)

;(function() {

  var User = {
    // caching information about user
    cacheUserInfo:  function (uid, info) {
                      console.log("Caching information in Localstorage");

                      localStorage.setItem("user_id_" + uid, info);

                      console.log("Information was cached");

                      return;
                    },
    // Get info about user
    getUserInfo:  function (uid) {
                    var info = localStorage.getItem('user_id_' + uid),
                    tmp_this = this;

                    if (info) { // if contains in localstorage
                      console.log("Get info from cache: " + info);

                      return info;
                    }

                    // request to the database is made only if there is no cache
                    console.log("Get info from DB")
                    $.ajax({
                      type: 'GET',
                      url: 'http://localhost:3000/users/' + uid,
                      dataType: 'json',
                      success: function(data) {
                        info = JSON.stringify(data);
                        console.log("Information was received: " + info);

                        // cache information in localStorage
                        tmp_this.cacheUserInfo(data.id, info);

                        return info;
                      }
                    });
                  },
    // update information about user
    updateUserInfo: function(uid, data) {
                      var tmp_this = this;
                      $.ajax({
                        type: 'PATCH',
                        data: data,
                        url: 'http://localhost:3000/users/' + uid + '?&',
                        dataType: 'json',
                        success: function(data) {
                          info = JSON.stringify(data);
                          console.log("Infomation in DB was updated: " + info);

                          // if the response is successful, cache the information
                          // about the user, so as not to make unnecessary requests, and
                          // do not retrieve outdated information
                          tmp_this.cacheUserInfo(data.id, info);

                          console.log("Cache in localStorage was updated");

                          return info;
                        }
                      });
                    },
    // Invalidate cache
    invalidateInfo: function (uid) {
                      if (!uid) { // Invalidate all cache
                        localStorage.clear();
                        console.log("Invalidate all cache");
                        return;
                      }

                      localStorage.removeItem("user_id_" + uid);
                      console.log("Invalidate the cache for the specified user.");
                      return;
                    }
  };


  // Handlers --------------------------------------------

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

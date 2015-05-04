// Search for voices
Template.navbar.events({
        "submit .search-voice": function (event) {
           var srch = event.target.srchterm.value;

           if (srch==""){
              Router.go('explore');
           } else {
              srch=srch.replace(" ","_");
              Router.go('explore.byname', {_name: srch});
           }

           // Prevent default form submit
           return false;
        },
        "click .fr": function (event) {
             Session.set("showLoadingIndicator", true);

             TAPi18n.setLanguage("fr")
               .done(function () {
                 Session.set("showLoadingIndicator", false);
               })
               .fail(function (error_message) {
                 // Handle the situation
                 console.log(error_message);
               });
        },
        "click .en": function (event) {
              Session.set("showLoadingIndicator", true);

              TAPi18n.setLanguage("en")
                .done(function () {
                  Session.set("showLoadingIndicator", false);
                })
                .fail(function (error_message) {
                  // Handle the situation
                  console.log(error_message);
                });
        },
        "click .navbar-brand": function (event) {
               $('html, body').stop().animate({
                                  scrollTop: 0
                              }, 750, 'easeInOutExpo');
        }
});

/*Template.navbar.rendered=function () {
    $(function() {
        $("#login-sign-in-link").css("font-weight", "700");
        $("#login-sign-in-link").css("letter-spacing", "1px");
    });
};*/


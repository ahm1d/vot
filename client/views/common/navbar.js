// Search for voices
Template.navbar.events({
        "submit .search-voice": function (event) {
           var srch = event.target.srchterm.value;

           if (srch==""){
              Router.go('explore');
           } else {
              Router.go('explore.byname', {_name: srch});
           }

           // Prevent default form submit
           return false;
        },
        "click .fr": function (event) {
             TAPi18n.setLanguage("fr")
               .done(function () {
                 Session.set("showLoadingIndicator", false);
               })
               .fail(function (error_message) {
                 // Handle the situation
                 console.log(error_message);
               });
             T9n.setLanguage('fr');
        },
        "click .en": function (event) {
              TAPi18n.setLanguage("en")
                .done(function () {
                  Session.set("showLoadingIndicator", false);
                })
                .fail(function (error_message) {
                  // Handle the situation
                  console.log(error_message);
                });
              T9n.setLanguage('en');
        },
        "click .navbar-brand": function (event) {
               $('html, body').stop().animate({
                                  scrollTop: 0
                              }, 750, 'easeInOutExpo');
        }
});

Template.navbar.helpers({
  isAdmin:function(){
    return Meteor.user().isAdmin;
  }
});

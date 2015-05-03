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
        }
});
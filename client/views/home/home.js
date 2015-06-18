Meteor.startup(function () {
    TAPi18n.setLanguage("fr")
      .done(function () {
        //Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
      });
    T9n.setLanguage('fr');
});


Template.home.rendered=function () {
    $(function() {
        $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top'
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Closes the Responsive Menu on Click outside Menu
    $('body > *').not('nav').click(function() {
        if(!$('button.navbar-toggle').hasClass('collapsed')) {
            $('.navbar-toggle:visible').click();
        }
    });
};

Template.home.helpers({
        popvoices: function () {
            return Voices.find({});
        }
});

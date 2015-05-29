var routerHooks = {
    // All standard subscriptions you need before anything works
    // the .wait() makes sure that it continues only if the subscription
    // is ready and the data available
    // Use: global
    baseSubscriptions: function() {
        this.subscribe('userData').wait();
    },
    // show login if a guest wants to access private areas
    // Use: {only: [privateAreas] }
    isLoggedIn: function(pause) {
        if (!(Meteor.loggingIn() || Meteor.user())) {
          Notify.setError(__('Please login.')); // some custom packages
          this.render('login');
          pause();
        }
    },
    // make sure to scroll to the top of the page on a new route
    // Use: global
    scrollUp: function() {
        $('html, body').stop().animate({
                    scrollTop: 0
                }, 750, 'easeInOutExpo');
    },
    // if this route depends on data, show the NProgess loading indicator
    // http://ricostacruz.com/nprogress/
    // Use: global
    startNProgress: function() {
        if (_.isFunction(this.data)) {
          NProgress.start();
        }
    },
    // tell google analytics that a page was viewed
    // e.g. https://github.com/datariot/meteor-ganalytics
    // Use: global
    pageview: function() {
        GAnalytics.pageview(this.path);
    },
    // only show route if you are an admin
    // using https://github.com/alanning/meteor-roles
    // Use: {only: [adminAreas]}
    isAdmin: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
          this.render('login');
          pause();
        }
    },
    // animate old content out using
    // http://daneden.github.io/animate.css/
    // Use: global
    animateContentOut: function() {
        $('#content').removeClass("animated fadeIn fadeInRight");
        $('footer').addClass("hide");
    }
};


// animate to the top of the view
Router.onAfterAction(routerHooks.scrollUp);
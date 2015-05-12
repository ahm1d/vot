// Home Route
Router.route('/', {
  name: 'home',
  action: function () {
    this.render('header', {to: 'header'});
    this.render('home');
    SEO.set({ title: Meteor.App.NAME });
  }
});

// Creation of a new Voice
Router.route('/newvoice', {
    loadingTemplate: 'loading',

    waitOn: function () {
        Meteor.subscribe('voices');
       return Meteor.subscribe('images');
    },

    action: function () {
       this.render('newvoice');
    }
});

// Explore all voices in db
Router.route('/explore', {
    // this template will be rendered until the subscriptions are ready
      loadingTemplate: 'loading',

      waitOn: function () {
        // return one handle, a function, or an array
        return Meteor.subscribe('voices');
      },

      action: function () {
        this.render('explore');
      }
});

Router.route('/explore/:_name', {
    name:'explore.byname',

    loadingTemplate:'loading',

    waitOn: function(){
        return Meteor.subscribe('voicesbyname', this.params._name);
    },

    action: function(){
        this.render('explore');
    }
});
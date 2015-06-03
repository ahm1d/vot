// Router configuration
Router.configure({
  layoutTemplate: 'basicLayout',
  notFoundTemplate: 'notFound'
});

// Home Route
Router.route('/', {
  name: 'home',

  loadingTemplate: 'loading',

  waitOn: function () {
     Meteor.subscribe('favorites');
     Meteor.subscribe('voices');
     return Meteor.subscribe('images');
  },

  action: function () {
    this.render('header', {to: 'header'});
    this.render('home');
    SEO.set({ title: Meteor.App.NAME });
  }
});

// Creation of a new Voice
Router.route('/newvoice', {
    name:'newvoice',

    loadingTemplate: 'loading',

    waitOn: function () {
       return Meteor.subscribe('images');;
    },

    action: function () {
       this.render('newvoice');
    }
});

// Explore all voices in db
Router.route('/explore', {
    name:'explore',

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

Router.route('/profile', {
  name: 'profile',

  loadingTemplate:'loading',

  action: function(){
      this.render('home');
  }
});

Router.route('/account', {
  name: 'account',

  loadingTemplate:'loading',

  action: function(){
      this.render('home');
  }
});

Router.route('/sign-out', {
  name: 'sign-out',

  loadingTemplate:'loading',

  onBeforeAction: function() {
    Meteor.logout();
    this.redirect('/');
    return this.next();
  }
});

Router.onBeforeAction(function() {
  if (!Meteor.user()) {
    this.redirect('/');
  } else
  {
    this.next();
  }
}, {only: ['newvoice']});

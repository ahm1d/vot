// Router configuration
Router.configure({
  layoutTemplate: 'basicLayout',
  notFoundTemplate: 'notFound'
});

// Home Route
Router.route('/', {
  name: 'home',

  subscriptions: function(){
    this.subscribe('images');
  },

  waitOn: function () {
     return Meteor.subscribe('popularvoices');;
  },

  action: function () {
    this.render('home');
    //SEO.set({ title: Meteor.App.NAME });
  }
});

// Creation of a new Voice
Router.route('/newvoice', {
    name:'newvoice',

    subscriptions: function(){
      this.subscribe('images');
    },

    waitOn: function () {
      return Meteor.subscribe('voices');
    },

    action: function () {
       this.render('newvoice');
    }
});

Router.route('/backvoice/:_id', {
    name:'backvoice',

    subscriptions: function(){
      this.subscribe('images');
    },

    waitOn: function () {
      return Meteor.subscribe('voice', this.params._id);
    },

    data: function () { return Voices.findOne() },

    action: function () {
      this.render('backvoice');
    }
});

// Explore all voices in db
Router.route('/explore', {
    name:'explore',

    // this template will be rendered until the subscriptions are ready
    loadingTemplate: 'loading',

    subscriptions: function(){
      this.subscribe('images');
    },

    waitOn: function () {
      return Meteor.subscribe('voices');
    },

    action: function () {
      this.render('explore');
    }
});

Router.route('/explore/:_name', {
    name:'explore.byname',

    loadingTemplate:'loading',

    subscriptions: function(){
      this.subscribe('images');
    },

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
      this.render('profile');
  }
});

Router.route('/account', {
  name: 'account',

  loadingTemplate:'loading',

  action: function(){
      this.render('home');
  }
});

Router.route('/newvoices', {
    name:'newvoices',

    // this template will be rendered until the subscriptions are ready
    loadingTemplate: 'loading',

    subscriptions: function(){
      this.subscribe('images');
    },

    waitOn: function () {
      return Meteor.subscribe('newvoices');
    },

    action: function () {
      this.render('newvoices');
    }
});

Router.route('/sign-out', {
  name: 'sign-out',

  onBeforeAction: function() {
    Meteor.logout();
    this.redirect('/');
    return this.next();
  }
});


Router.onBeforeAction(function() {
  if (!Meteor.user()) {
    this.redirect('/sign-in');
  } else
  {
    this.next();
  }
}, {except: ['home', 'atSignIn', 'atSignOut', 'explore', 'explore.byname']});


// Ensures that the user is signed in before having access to the creation form
/*
Router.plugin('ensureSignedIn', {
    only: ['newvoice', 'backvoice']
});
*/

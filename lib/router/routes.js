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
     return Meteor.subscribe('popularVoices');
  },

  data:function(){
    return Voices.find().fetch();
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
      return Meteor.subscribe('voiceById', this.params._id);
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

    data: function(){
      return Voices.find().fetch();
    },

    action: function () {
      this.render('explore');
    }
});

Router.route('/explore/:_title', {
    name:'explore.bytitle',

    loadingTemplate:'loading',

    subscriptions: function(){
      this.subscribe('images');
    },

    waitOn: function(){
      return Meteor.subscribe('voicesByTitle', this.params._title);
    },

    data: function(){
      return Voices.find().fetch();
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

Router.route('/newvoices', {
    name:'newvoices',

    // this template will be rendered until the subscriptions are ready
    loadingTemplate: 'loading',

    subscriptions: function(){
      this.subscribe('images');
    },

    waitOn: function () {
      return Meteor.subscribe('voicesNotPublished');
    },

    data: function() {
      return Voices.find().fetch();
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
}, {except: ['home', 'atSignIn', 'atSignUp', 'atSignOut', 'explore', 'explore.bytitle']});


// Ensures that the user is signed in before having access to the creation form
/*
Router.plugin('ensureSignedIn', {
    only: ['newvoice', 'backvoice']
});
*/

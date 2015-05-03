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
Router.route('/newvoice', function () {
  this.render('newvoice');
});

// Explore all voices in db
Router.route('/explore', function () {
    this.wait(Meteor.subscribe("voices"));

    if (this.ready()){
        this.render('explore');
    }
});

Router.route('/explore/:_name', function () {
    // add the subscription handle to our waitlist
    this.wait(Meteor.subscribe('voicesbyname', this.params._name));

    if (this.ready()) {
        this.render('explore');
    }
}, {name : 'explore.byname'});
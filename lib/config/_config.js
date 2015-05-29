// These values get propagated through the app
// E.g. The 'name' and 'subtitle' are used in seo.coffee

this.Config = {

	// Basic Details
  name: 'Voice of Tangier',
  title: function() {
    return TAPi18n.__('configTitle');
  },
  subtitle: function() {
    return TAPi18n.__('configSubtitle');
  },
  logo: function() {
    return '<b>' + this.name + '</b>';
  },
  footer: function() {
    return this.name + ' - Copyright ' + new Date().getFullYear();
  },

	// Emails
  emails: {
    from: 'no-reply@' + Meteor.absoluteUrl(),
    contact: 'hello' + Meteor.absoluteUrl()
  },

	// Username - if true, users are forced to set a username
  username: false,

	// Localisation
  defaultLanguage: 'en',
  dateFormat: 'D/M/YYYY',

	// Meta / Externnal content
  privacyUrl: 'http://vot.meteor.com',
  termsUrl: 'http://vot.meteor.com',

  socialMedia: {
    facebook: {
      url: 'http://facebook.com/',
      icon: 'facebook'
    },
    twitter: {
      url: 'http://twitter.com/',
      icon: 'twitter'
    },
    github: {
      url: 'http://github.com/',
      icon: 'github'
    },
    info: {
      url: 'http://vot.meteor.com',
      icon: 'link'
    }
  },

	//Routes
  homeRoute: '/',
  publicRoutes: ['home']
};

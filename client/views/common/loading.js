Template.loading.rendered = function () {
  if ( ! Session.get('loadingSplash') ) {
    this.loading = window.pleaseWait({
      logo: 'img/logos/voice.jpeg',
      backgroundColor: '#7f8c8d',
      loadingHtml: message + spinner
    });
    //Session.set('loadingSplash', true); // just show loading splash once

    var loading = this.loading;
  Meteor.setTimeout(function () {
    loading.finish();
    Session.set('splashLoaded', true);
  }, 3000);
  }
};

Template.loading.destroyed = function () {
  if ( this.loading ) {
    this.loading.finish();
  }
};

var message = '<p class="loading-message">Voix de Tanger</p>';
var spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';

var options;

if (Meteor.isServer) {
  // Set SMTP conf
  Meteor.startup(function () {
    smtp = {
      username: 'flyflop85@gmail.com',   // eg: server@gentlenode.com
      password: 'watchyourback',   // eg: 3eeP1gtizk5eziohfervU
      server:   'smtp.gmail.com',  // eg: mail.gandi.net
      port: 25
    }

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  });
  
  options = {
    siteName: Config.name
  };
  if (Config.socialMedia) {
    _.each(Config.socialMedia, function(v, k) {
      return options[k] = v.url;
    });
  }
  if (Config.legal) {
    options.companyAddress = Config.legal.address;
    options.companyName = Config.legal.name;
    options.companyUrl = Config.legal.url;
  }
  PrettyEmail.options = options;
}

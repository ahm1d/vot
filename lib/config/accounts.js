AccountsTemplates.configure({
  // Behaviour
  confirmPassword: false,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: false,
  lowercaseUsername: false,

  // Appearance
  showAddRemoveServices: true,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: false,

  // Client-side Validation
  continuousValidation: false,
  negativeFeedback: false,
  negativeValidation: true,
  positiveValidation: false,
  positiveFeedback: true,
  showValidating: true,

  // Privacy Policy and Terms of Use
  privacyUrl: Config.privacyUrl || null,
  termsUrl: Config.termsUrl || null,

  // Redirects
  homeRoutePath: Config.homeRoute || null,

  // Hooks
  onLogoutHook: function() {
    return console.log('logout');
  },

  onSubmitHook: function(error, state) {
    if (!error){
      if (state === 'signUp'){
        console.log('Successfully signed up:'+Meteor.userId());
      }
    } else {
      console.error(error);
    }
  }
});

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('verifyEmail');

if (Meteor.isServer){
  // Completes user profile after user creation
  Accounts.onCreateUser(function(options, user) {
    // We still want the default hook's 'profile' behavior.
    console.log('options : ');
    console.log(options);

    if (options.profile){
      user.profile = options.profile;
    }

    var mail = '';
    if (options.email){
      mail = options.email;
    }

    var picture = '';
    if (user.services){
      if(user.services.facebook && user.services.facebook.email){
        mail=user.services.facebook.email;
        picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
      }
      //  TODO fix this! when twitter will be integrated
      //  else if (user.services.twitter && user.services.twitter.email){
      //  mail=user.services.twitter.email; // non existant
      //  picture = user.services.twitter.profile_img_url;
      //  }
    }

    var name = mail.split("@")[0];
    if (user.services){
      if(user.services.facebook && user.services.facebook.name){
        name=user.services.facebook.name;
      }
    }

    if (!user.profile){
      user.profile = {};
    }

    user.profile.name = name;
    user.profile.mail = mail;
    user.profile.upvotes = 0;
    user.profile.backed = 0;
    user.profile.picture = picture;

    var now = new Date();
    user.profile.joined = now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear();

    return user;
  });

  // validates new user : checks if not already existant.
  Accounts.validateNewUser(function (user) {
    console.log('user validation : ');
    console.log(user);
    if (user.profile && user.profile.mail){
      if (Meteor.users.find({'profile.name':user.profile.name}).count()==0){
        return true;
      }
    } else {
      throw new Meteor.Error(2, TAPi18n.__("err_user_creation",null,currentLang));
    }

    throw new Meteor.Error(1, TAPi18n.__("err_user_already_exists",null,currentLang));
  });
}

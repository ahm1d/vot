AccountsTemplates.configure({
  // Behaviour
  confirmPassword: false,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: true,
  lowercaseUsername: false,

  // Appearance
  showAddRemoveServices: true,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: true,

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
    console.log('submitting form');
    if (!error){
      if (state === 'signUp'){
        console.log('Successfully signed up:'+Meteor.userId());
      }
    }

  }
});

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('verifyEmail');

if (Meteor.isServer){
  // validates new user : checks if not already existant.
  Accounts.validateNewUser(function (user) {
    console.log('validation:'+JSON.stringify(user));
    if (user.username){
      if (Meteor.users.find({'username':user.username}).count()==0){
        return true;
      }
    }
    throw new Meteor.Error(1, "Username with the same email address already exists.");
  });

  // Completes user profile after user creation
  Accounts.onCreateUser(function(options, user) {
    console.log(user);
    console.log(JSON.stringify(options));

    // We still want the default hook's 'profile' behavior.
    if (options.profile){
      user.profile = options.profile;
    }

    var mail = '';
    if (options.email){
      mail = options.email;
    } else if (user.services){
      if(user.services.facebook && user.services.facebook.email){
        mail=user.services.facebook.email;
      }
    }
    if (user.profile && !user.profile.name){
      user.profile = {'name':mail};
    }

    if (!user.username){
      user.username=mail;
    }

    return user;
  });
}

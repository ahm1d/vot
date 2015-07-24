Template.registerHelper('log', function(){
  return console.log(this);
});

Template.registerHelper('session', function(v){
    return Session.get(v);
});

Template.registerHelper('getProfilePictureById', function(userId){
  var user = Meteor.users.findOne({_id:userId});
  if (user){
    return user.profile.picture;
  } else {
    return '';
  }
});

Template.registerHelper('getUsernameById', function(userId){
  var user = Meteor.users.findOne({_id:userId});
  if (user){
    return user.profile.name;
  } else {
    return '';
  }
});

// returns a formatted human readable time DD/MM/YYYY HH24:min
Template.registerHelper('formatTime',
  function(time){
    if (!time){
      return;
    }
    var minutes = time.getMinutes();
    if (minutes<10){
      minutes = '0' + minutes;
    }
    return (time.getDate()+'/'+(time.getMonth()+1)+'/'+time.getFullYear()+' - '+time.getHours()+':'+minutes);
  }
);

// returns a formatted human readable date DD/MM/YYYY
Template.registerHelper('formatDate',
  function(date){
    if (!date){
      return;
    }
    return (date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear());
  }
);

// true if route is ready.
Template.registerHelper ('isRouteReady', function(){
  return Router
          && Router.current
          && Router.current()
          && (Router.current()._waitlist._notReadyCount == 0);
});

// if the current voice is upvoted by current user, return true
Template.registerHelper('voted',
  function(id){
    return (Voices.find({_id:id, voters:Meteor.userId()}).count() != 0);
  }
);

// if the current voice is backed by current user, return true
Template.registerHelper('backed',
  function(id){
    return (Voices.find({_id:id, "backers.id":Meteor.userId()}).count() != 0);
  }
);

// returns a text preview
Template.registerHelper('preview',
  function(description){
    return (description.substring(0,300)+'...');
  }
);

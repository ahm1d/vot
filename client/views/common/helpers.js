Template.registerHelper('log', function(){
  return console.log(this);
});

Template.registerHelper('session', function(v){
    return Session.get(v);
});

// returns a formatted human readable time DD/MM/YYYY HH24:min
Template.registerHelper('formatTime',
  function(time){
    return (time.getDate()+'/'+(time.getMonth()+1)+'/'+time.getFullYear()+' - '+time.getHours()+':'+time.getMinutes());
  }
);

// returns a formatted human readable date DD/MM/YYYY
Template.registerHelper('formatDate',
  function(date){
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

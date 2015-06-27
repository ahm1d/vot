// true if route is ready.
Template.registerHelper ('isRouteReady', function(){
  return Router
          && Router.current
          && Router.current()
          && (Router.current()._waitlist._notReadyCount == 0);
});

// if a voice has no votes, return true
Template.registerHelper('voted',
  function(id){
    return (Voices.find({_id:id, voters:Meteor.userId()}).count() != 0);
  }
);

// if a voice has no votes, return true
Template.registerHelper('backed',
  function(id){
    return (Voices.find({_id:id, backers:Meteor.userId()}).count() != 0);
  }
);

// returns a text preview
Template.registerHelper('preview',
  function(description){
    return (description.substring(0,300)+'...');
  }
);

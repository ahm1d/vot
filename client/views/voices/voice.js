Template.modalvoice.events({
  "click .vote": function (event) {
    // This function is called when an upvote is submitted
    Meteor.call("upvote", event.target.name.split("voteBtn_")[1]);
  },

  "click .voted": function (event) {
    // This function is called when a downvote is submitted
    Meteor.call("downvote", event.target.name.split("voteBtn_")[1]);
  }
  /*
  ,

  "click .back": function(event) {
    Router.go('/backvoice/'+event.target.name.split("backBtn_")[1]);

    // Prevent default form submit
    return false;
  }*/

});

Template.modalvoice.helpers({
  comments:function(id){
    return Voices.find({_id:id},{_id:0, comments:1});
  }

});

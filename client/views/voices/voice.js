Template.modalvoice.events({
  "click .vote": function (event) {
    // This function is called when an upvote is submitted
    console.log('Upvoting ' + event.target.name.split("voteBtn")[1]);

    Meteor.call("upvote", event.target.name.split("voteBtn_")[1]);

    // Prevent default form submit
    return false;
  },

  "click .voted": function (event) {
    // This function is called when a downvote is submitted
    console.log('Downvoting ' + event.target.name.split("voteBtn_")[1]);

    Meteor.call("downvote", event.target.name.split("voteBtn_")[1]);

    // Prevent default form submit
    return false;
  },

  "click .back": function(event) {
    Router.go('/backvoice/'+event.target.name.split("backBtn_")[1]);
  }

});

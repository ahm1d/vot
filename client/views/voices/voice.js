Template.modalvoice.events({
  "click .vote": function (event) {
    Meteor.call("upvote", event.target.name.split("voteBtn_")[1]);
  },

  "click .voted": function (event) {
    Meteor.call("downvote", event.target.name.split("voteBtn_")[1]);
  },

  "click .backvoice": function(event) {
    var that=this;
    $('#modal_'+this._id)
        .on('hidden.bs.modal', function() {
            Router.go('backvoice', {_id: that._id}, null);
        })
        .modal('hide');
  },

  "submit .comment-form": function (event) {
      Meteor.call("commentVoice", this._id,
                                  event.target.inputComment.value);
      event.preventDefault();
  },


});

Template.modalvoice.events({
  "click .vote": function (event) {
    console.log("Vote : ");
    console.log(this._id);
    Meteor.call("upvote", this._id);
  },

  "click .voted": function (event) {
    console.log("DownVote : ");
    console.log(this._id);
    Meteor.call("downvote", this._id);
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
  }
});

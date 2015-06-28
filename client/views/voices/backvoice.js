Template.backvoice.helpers({
        author: function() {
          //console.log(this);
          var user = Meteor.users.findOne({'_id' : this.owner});
          if (user){
            return user.profile.name;
          } else {
            return 'Unknown';
          }
        }
});

Template.backvoice.events({
        "submit .backvoice-form": function(event){
          var type="V";
          if (event.target[1].checked=='true'){
            type="D";
          }

          Meteor.call('backvoice', this._id, type);
          event.preventDefault();
        }
});

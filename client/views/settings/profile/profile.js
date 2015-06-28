Template.profile.events({
        "submit .profile-form": function (event) {
            Meteor.users.update(
              { _id : Meteor.userId()},
              {
                $set: { "profile.name" : event.target.inputName.value  }
              }
            );
            Session.set("editMode", false);
            event.preventDefault();
        },

        "click .editModeBtn": function(event){
          var value = !Session.get('editMode');
          Session.set('editMode', value);
        }
});

Template.profile.helpers({
  editMode: function(){
    return Session.get('editMode');
  }
});

Template.profile.onRendered(function(){
  Session.set("editMode", false);
});

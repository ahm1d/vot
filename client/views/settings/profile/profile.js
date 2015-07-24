Template.profile.events({
        "submit .profile-form": function (event) {

          var oldProfileName = Meteor.user().profile.name;
            console.log("Old Profile name : "+oldProfileName);

            Meteor.users.update(
              { _id : Meteor.userId()},
              {
                $set: { "profile.name" : event.target.inputName.value  }
              }
            );

            //Meteor.call('updateVoicesWithNewUsername', oldProfileName, event.target.inputName.value);

            Session.set("editMode", false);
            event.preventDefault();
        },

        "click .editModeBtn": function(event){
          Session.set('editMode', !Session.get('editMode'));
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

Template.backvoice.helpers({
        voice: function () {
            return Voices.findOne();
        },

        owner: function() {
          return Meteor.users.findOne({'_id' : Voices.findOne().owner}).profile.name;
        }
});

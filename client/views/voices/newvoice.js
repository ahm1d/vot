// Create a new voice
Template.newvoice.events({
        "submit .new-voice": function (event) {
          Meteor.call("addVoice", event.target.name.value,
                                    event.target.category.value,
                                    event.target.description.value,
                                    event.target.location.value);
        }
});


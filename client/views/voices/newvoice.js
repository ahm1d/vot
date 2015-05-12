// Create a new voice
Template.newvoice.events({
        'submit': function (event) {
           Meteor.call("addVoice", event.target.name.value,
                                    event.target.category.value,
                                    event.target.description.value,
                                    event.target.location.value,
                                    event.target.picture.value);

           Router.go('explore.byname', {_name: event.target.name.value});
        }
});


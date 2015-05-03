// Methods
Meteor.methods({
  addVoice: function (name, category, description, location) {
    // Make sure the user is logged in before inserting a Voice
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    voices.insert({
      name: name,
      category: category,
      description: description,
      location:location,
      owner: Meteor.userId(),
      createdAt: new Date()
    });

    //TODO : message when duplicate
  },

  deleteVoice: function (voiceId) {
    // TODO : add user id and permission controls
    voices.remove(voiceId);
  }
});

// limit what client sees.
Meteor.publish("voices", function () {
                   return voices.find({}, {limit: 10});
                 });

Meteor.publish("voicesbyname", function (name) {
                   return voices.find({$text : {$search : name}});
                 });
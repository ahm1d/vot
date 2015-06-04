// Methods
Meteor.methods({
  addVoice: function (name, category, description, location, picture) {
    // Make sure the user is logged in before inserting a Voice
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Voices.insert({
      name: name,
      category: category,
      description: description,
      location:location,
      picture:picture,
      owner: Meteor.userId(),
      createdAt: new Date()
    });

    //TODO : message when duplicate
  },

  deleteVoice: function (voiceId) {
    // TODO : add user id and permission controls
    Voices.remove(voiceId);
  }
});

// limit what the client sees.
Meteor.publish("voices", function () {
    return Voices.find({}, {limit: 10});
});

Meteor.publish("voicesbyname", function (name) {
    return Voices.find({$text : {$search : name}});
});

Meteor.publish("images", function(){
    return Images.find();
});

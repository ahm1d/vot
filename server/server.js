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
      voters:[],
      votes:0,
      picture:picture,
      owner: Meteor.userId(),
      createdAt: new Date(),
      closed:false
    });

    //TODO : message when duplicate
  },

  deleteVoice: function (voiceId) {
    // TODO : add user id and permission controls
    Voices.remove(voiceId);
  },

  upvote: function (voiceId) {
    Voices.update(
      { _id:voiceId},
      {
        $addToSet: { voters: this.userId },
        $inc : {votes : 1}
      }
    );
  },

  downvote: function(voiceId) {
    Voices.update(
      { _id:voiceId},
      {
        $pull: { voters: this.userId },
        $inc : {votes : -1}
      }
    );
  }
});

////////////////
// Publishing //
////////////////
Meteor.publish("voices", function () {
  return Voices.find({closed:false},{sort:{createdAt:-1}});
});

Meteor.publish("popularvoices", function(){
  return Voices.find({closed:false},{sort:{votes:-1}, limit:3});

  /*
  self = this;

  // Get the 3 most voted voices
  var pipeline = [
    {$unwind: "$voters"},
    {$match : { closed : false } },
    {$group: {_id: {_id: "$_id",
                    description: "$description",
                    category: "$category",
                    picture: "$picture",
                    name: "$name"},
              votes: {$sum: "$voters"}}},
    {$sort: {votes : -1}},
    {$limit: 3}
  ];

  var result = Voices.aggregate(pipeline);

  if (result.length == 0) {
      return Voices.find({closed:false},{sort:{createdAt:-1}, limit:3});
  } else {
    _(result).each(function(voice) {
      self.added('voices', voice._id._id, {description: voice._id.description,
                                        picture: voice._id.picture,
                                        name: voice._id.name,
                                          category: voice._id.category,
                                          votes: voice.votes});
    });
  }
  */
});

Meteor.publish("voicesbyname", function (name) {
    return Voices.find({$text : {$search : name}});
});

Meteor.publish("images", function(){
    return Images.find();
});

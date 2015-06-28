currentLang = 'fr';

// Methods
Meteor.methods({
  updateLang : function(lang) {
    currentLang = lang;
  },

  upvote: function (voiceId) {
    var isVoter = Voices.findOne({'voters':Meteor.user().profile.name});
    if (isVoter){
      return;
    }

    Voices.update(
      { _id:voiceId},
      {
        $addToSet: { voters: Meteor.user().profile.name },
        $inc : {votes : 1}
      }
    );
  },

  downvote: function(voiceId) {
    var isVoter = Voices.findOne({'voters':Meteor.user().profile.name});
    if (!isVoter){
      return;
    }

    Voices.update(
      { _id:voiceId},
      {
        $pull: { voters: Meteor.user().profile.name },
        $inc : {votes : -1}
      }
    );
  },

  backvoice: function(voiceId, type) {
    var backer = Voices.findOne({'backers.name':Meteor.user().profile.name});
    if (backer){
      return;
    }

    Voices.update(
      { _id:voiceId},
      {
        $addToSet: {  backers : {
                                  name : Meteor.user().profile.name,
                                  type : type
                                }
                   },
        $inc : {totalBackers : 1}
      }
    );

    var voter = Voices.findOne({'voters':Meteor.user().profile.name});

    if (!voter){
      Voices.update(
        { _id:voiceId},
        {
          $addToSet: { voters : Meteor.user().profile.name },
          $inc : {votes : 1}
        }
      );
    }
  }
});

////////////////
// Publishing //
////////////////
Meteor.publish("voice", function (id) {
  return Voices.find({_id:id, public:true, closed:false});
});

Meteor.publish("voices", function () {
  return Voices.find({public:true, closed:false},{sort:{createdAt:-1}});
});

Meteor.publish("voicesbyname", function (name) {
    return Voices.find({$text : {$search : name}, public:true, closed:false},{sort:{createdAt:-1}});
});

Meteor.publish("images", function(){
    return Images.find();
});

Meteor.publish("newvoices", function () {
  return Voices.find({public:false},{sort:{createdAt:-1}});
});

Meteor.publish("popularvoices", function(){
  return Voices.find({public:true, closed:false},{sort:{votes:-1}, limit:3});
});

  /*
  Meteor.publish("popularvoices", function(){

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

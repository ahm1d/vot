currentLang = 'fr';

// Methods
Meteor.methods({
  updateLang : function(lang) {
    currentLang = lang;
  },

  isUserAdmin : function(){
    return Admins.findOne({_id:Meteor.userId()});
  },

  upvote: function (voiceId) {
    var isVoter = Voices.findOne({_id:voiceId, 'voters':Meteor.userId()});
    if (isVoter){
      return;
    }

    Voices.update(
      { _id:voiceId},
      {
        $addToSet: { voters: Meteor.userId() },
        $inc : {votes : 1}
      }
    );
  },

  downvote: function(voiceId) {
    var isVoter = Voices.findOne({_id:voiceId, 'voters':Meteor.userId()});
    if (!isVoter){
      return;
    }

    Voices.update(
      { _id:voiceId},
      {
        $pull: { voters: Meteor.userId() },
        $inc : {votes : -1}
      }
    );
  },

  backvoice: function(voiceId, type) {
    var backer = Voices.findOne({_id:voiceId, 'backers.id':Meteor.userId()});
    if (backer){
      return;
    }

    Voices.update(
      { _id:voiceId},
      {
        $addToSet: {  backers : {
                                  id : Meteor.userId(),
                                  type : type
                                }
                   },
        $inc : {totalBackers : 1}
      }
    )
  },

  commentVoice: function(voiceId, comment){
    Voices.update(
      { _id:voiceId},
      {
        $addToSet: { comments :
                    {
                      authorId : Meteor.userId(),
                      author : Meteor.user().profile.name,
                      content : comment,
                      time : new Date()
                    }
                   },
        $inc : {totalComments : 1}
      }
    );
  },

  newVoicesToNotif : function(lastConnectionDate){
    var v = Voices.find({public:false, createdOn:{$gt:Date(lastConnectionDate)}}).fetch();
    if (v.length>0){
      return true;
    } else {
      return false;
    }
  }
});

////////////////
// Publishing //
////////////////
Meteor.publish("voices", function () {
  return Voices.find({public:true, closed:false},{sort:{createdOn:-1}});
});

Meteor.publish("voiceById", function (id) {
  return Voices.find({_id:id, public:true, closed:false});
});

Meteor.publish("voicesByTitle", function (title) {
  if (title){
    title=title.replace(new RegExp('['-']', 'g'), ' ');
  }
    return Voices.find({$text : {$search : title}, public:true, closed:false},{sort:{createdOn:-1}});
});

Meteor.publish("voicesNotPublished", function () {
  return Voices.find({public:false},{sort:{createdOn:-1}});
});

Meteor.publish("images", function(){
    return Images.find();
});

Meteor.publish("popularVoices", function(){
  return Voices.find({public:true, closed:false},{sort:{totalBackers:-1}, limit:3});
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
                    title: "$title"},
              votes: {$sum: "$voters"}}},
    {$sort: {votes : -1}},
    {$limit: 3}
  ];

  var result = Voices.aggregate(pipeline);

  if (result.length == 0) {
      return Voices.find({closed:false},{sort:{createdOn:-1}, limit:3});
  } else {
    _(result).each(function(voice) {
      self.added('voices', voice._id._id, {description: voice._id.description,
                                        picture: voice._id.picture,
                                        title: voice._id.title,
                                          category: voice._id.category,
                                          votes: voice.votes});
    });
  }
  */

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

    Meteor.users.update(
      { _id : Meteor.userId() },
      {
        $inc : {"profile.upvotes" : 1}
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

    Meteor.users.update(
      { _id : Meteor.userId() },
      {
        $inc : {"profile.upvotes" : -1}
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
    );

    Meteor.users.update(
      { _id : Meteor.userId() },
      {
        $inc : {"profile.backed" : 1}
      }
    );
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
    title = title.replace(new RegExp('['-']', 'g'), ' ');
  } else {
    title = '';
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

// allUsersData is used to get users profile pic...etc for comments
Meteor.publish("allUserData", function () {
  return Meteor.users.find({},
                    {fields :{"profile.name":1, "profile.picture":1}});
});

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId});
});

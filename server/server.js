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
  var voices = Voices.find({public:true, closed:false},{sort:{createdOn:-1}});

  return [voices,
          UsersInfos.find({_id: {$in : getVoicesUsersIds(voices)}})];
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
  var popVoices = Voices.find({public:true, closed:false},{sort:{totalBackers:-1}, limit:3});


  return [popVoices, UsersInfos.find({_id: {$in : getVoicesUsersIds(popVoices)}})];
});

Meteor.publish("usersInfos", function (usersIdArray) {
  if (!usersId){
    this.ready();
  }

  return UsersInfos.find({_id: {$in : usersIdArray}});
});

// Server local Methods
getVoicesUsersIds = function (voices){
  var usersIds = new Array();

  voices.forEach(function (voice) {

    if (!_.contains(usersIds,voice.owner.id)){
      usersIds.push(voice.owner.id);
    }

    if (voice.comments && voice.comments.length>0){
      _.each(voice.comments, function(e, i, list){
        if (!_.contains(usersIds,e.authorId)){
          usersIds.push(e.authorId);
        }
      });
    }
  });

  return usersIds;
}

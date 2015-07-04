////////////////////////////
// AutoForm Configuration //
////////////////////////////

// Uncomment for debug logs
AutoForm.debug();

var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    Router.go('explore');
  }
  /*,

  before: {
    insert:function(doc){
          console.log(doc);
          console.log(this);

          profileName = Meteor.users.findOne({_id:Meteor.userId()}).profile.name;
          doc.owner={id:Meteor.userId(),name:profileName};
          console.log(doc);
          return doc;
    }
  }*/
}

AutoForm.hooks({
  insertVoiceForm: hooksObject
});

Voices = new Mongo.Collection('voices');

Voices.attachSchema(
    new SimpleSchema({
    title: {
       type: String,
       max : 60
    },
    category: {
       type: String
    },
    description: {
       type: String,
       max:2000
    },
    location: {
       type: String
    },
    // using the yogiben:autoform-file plugin
    picture: {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images',
                accept: 'image/jpeg'
            }
        }
    },
    voters:{
      type: [String],
      defaultValue: []
    },
    votes:{
      type: Number,
      defaultValue: 0,
      min:0
    },
    backers:{
      type: [Object],
      defaultValue: []
    },
    "backers.$.id": {
        type: String
    },
    "backers.$.type": {
        type: String
    },
    totalBackers:{
      type: Number,
      defaultValue: 0,
      min:0
    },
    comments: {
        type: [Object],
        optional: true
    },
    "comments.$.authorId": {
        type: String
    },
    "comments.$.author": {
        type: String
    },
    "comments.$.content": {
        type: String
    },
    "comments.$.time": {
        type: Date
    },
    totalComments:{
      type: Number,
      defaultValue: 0,
      min:0
    },
    owner:{
      type: Object,
      autoValue: function(){
        if (this.isInsert){
          return {id:this.userId,name:Meteor.user().profile.name};
        }
      }
    },
    "owner.id": {
       type: String
    },
    "owner.name":{
      type: String
    },
    createdOn: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date;
        }
      },
      denyUpdate: true
    },
    updatedOn: {
      type: Date,
      autoValue: function() {
        if (this.isUpdate) {
          return new Date();
        }
      },
      denyInsert: true,
      optional: true
    },
    public :{
      type: Boolean,
      defaultValue: true
    },
    closed:{
      type: Boolean,
      defaultValue: false
    }
  })
  //.i18n("schemas.voices")
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Voices.allow({
    insert : function (userId, doc) {
      // the user must be logged in, and the document must be owned by the user
      console.log("Allow method : Insert operation ");
      console.log("doc");
      console.log(doc);
      console.log("userId");
      console.log(userId);
      return (userId && doc.owner.id === userId);
    },

    update: function (userId, doc, fields, modifier) {
      // can only change your own documents
      console.log("Allow method : Update operation ");
      console.log("doc");
      console.log(doc);
      console.log("userId");
      console.log(userId);
      return doc.owner.id === userId;
    },

    remove: function (userId, doc) {
      console.log("Allow method : Remove operation ");
      console.log("doc");
      console.log(doc);
      console.log("userId");
      console.log(userId);
      return doc.owner.id === userId;
    }
  });
}

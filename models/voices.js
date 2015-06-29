Voices = new Mongo.Collection('voices');

Voices.attachSchema(
    new SimpleSchema({
    name: {
       type: String,
       max : 60
    },
    category: {
       type: String,
       allowedValues: ["Art", "Music"],
       autoform: {
         afFieldInput: {
           firstOption: ""
         }
       }
    },
    description: {
       type: String,
       max:2000
    },
    location: {
       type: String,
       allowedValues: ["Tanger", "Casablanca"],
       autoform: {
         afFieldInput: {
           firstOption: ""
         }
       }
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
      optional : true
    },
    "backers.$.name": {
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
    owner: {
       type: String,
       autoValue: function() {
         return this.userId;
       }
    },
    createdAt: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date;
        }
      },
      denyUpdate: true
    },
    updatedAt: {
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
      defaultValue: false
    },
    closed:{
      type: Boolean,
      defaultValue: false
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Voices.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}

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
    voters:{
      type: [String],
      defaultValue: []
    },
    votes:{
      type: Number,
      defaultValue: 0,
      min:0
    },
    picture: {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images',
                accept: 'image/*'
            }
        }
    },
    owner: {
       type: String,
       autoValue: function() {
         return this.userId;
       }
    },
    createdAt: {
       type: Date,
       defaultValue: new Date(),
       denyUpdate: true
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

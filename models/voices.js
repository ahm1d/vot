Voices = new Mongo.Collection('voices');

Voices.attachSchema(
    new SimpleSchema({
    name: {
       type: String,
       max : 60
    },
    category: {
       type: String
    },
    description: {
       type: String
    },
    location: {
       type: String
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
       type: String
    },
    createdAt: {
       type: Date,
       denyUpdate: true
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




voices = new Mongo.Collection('voices');

voices.attachSchema(
    new SimpleSchema({
    name: {
      type: String
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
  voices.allow({
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




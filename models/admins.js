Admins = new Mongo.Collection('admins');

if (Meteor.isServer) {
  Admins.deny({
    insert : function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fields, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
};

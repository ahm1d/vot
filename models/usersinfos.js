UsersInfos = new Mongo.Collection('users_infos');

if (Meteor.isServer) {
  UsersInfos.deny({
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

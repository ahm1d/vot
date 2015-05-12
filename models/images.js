var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
  //stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
  stores: [imageStore]
});

if (Meteor.isServer) {
  Images.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return false;
    },
    remove : function () {
      return false;
    },
    download : function () {
      return true;
    }
  });
}

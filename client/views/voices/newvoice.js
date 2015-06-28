////////////////////////////
// Dropzone configuration //
////////////////////////////
Meteor.Dropzone.options.maxFiles = 1;
Meteor.Dropzone.options.maxFilesize = 1;
Meteor.Dropzone.options.addRemoveLinks = true;
Meteor.Dropzone.options.previewsContainer = '.dropzone-preview';
Meteor.Dropzone.options.resize= function(file) {
        var resizeInfo = {
            srcX: 0,
            srcY: 0,
            trgX: 0,
            trgY: 0,
            srcWidth: file.width,
            srcHeight: file.height,
            //trgWidth: this.options.thumbnailWidth,
            //trgHeight: this.options.thumbnailHeight
            trgWidth: file.width,
            trgHeight: file.height
        };

        return resizeInfo;
};

//Meteor.Dropzone.options.previewTemplate= document.querySelector('#preview-template').innerHTML;

////////////////////////////
// AutoForm Configuration //
////////////////////////////

// Uncomment for debug logs
/*AutoForm.debug();*/

var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {Router.go('explore');}
}

AutoForm.hooks({
  insertVoiceForm: hooksObject
});


// Manual insert.
/*
Template.newvoice.events({
        'submit': function (event) {
           Meteor.call("addVoice", event.target.name.value,
                                    event.target.category.value,
                                    event.target.description.value,
                                    event.target.location.value,
                                    event.target.picture.value);

           Router.go('explore');
        }
});
*/

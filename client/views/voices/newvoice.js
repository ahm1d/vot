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

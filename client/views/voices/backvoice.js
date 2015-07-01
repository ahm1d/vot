Template.backvoice.events({
        "submit .backvoice-form": function(event){
          event.preventDefault();

          var type = "V";

          if (event.target[0].checked==true && event.target[1].checked==true){
            type="VD";
          } else if (event.target[0].checked==true) {
            type="V";
          } else if (event.target[1].checked==true) {
            type="D";
          }

          Meteor.call('backvoice', this._id, type);

          // TODO: find a way to call this path and replace ' ' by '-' automatically everywhere in the code.
          Router.go('explore.byname', {_name:this.name.replace(new RegExp('[\' \']', 'g'), '-')})
        }
});

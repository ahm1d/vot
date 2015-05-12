Template.explore.helpers({
        voices: function () {
            return Voices.find({}, {sort: {createdAt: -1}});
        }
});
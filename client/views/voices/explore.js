Template.explore.helpers({
        voices: function () {
            return voices.find({}, {sort: {createdAt: -1}});
        }
});
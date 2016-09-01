import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Userdata } from '../../api/userdata/Userdata.js';
Template.registerHelper("formatdate", function(d) {

    return moment.utc(d).format('YYYY-MM-DD');
});

Template.registerHelper("getslotbynum", function(s) {
    var found = Timeslots.findOne({num: parseInt(s)}) || {};

    return found.slot && found.slot;
});

Template.registerHelper("getuserdata", function(s) {
    return Userdata.findOne({_id: Meteor.userId()});
});

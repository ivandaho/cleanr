import { Timeslots } from '/imports/api/timeslots/Timeslots.js';
import { Userdata } from '/imports/api/userdata/Userdata.js';
import { Sessions } from '/imports/api/sessions/Sessions.js';
import { Bookings } from '/imports/api/bookings/Bookings.js';

Template.registerHelper("getslotbynum", function(s) {
    var ts = Timeslots.findOne({num: parseInt(s)}) || {};
    return ts.slot;
});

Template.registerHelper("getuserdata", function() {
    return Userdata.findOne({_id: Meteor.userId()});
});

// shared SessionDetails helpers
// TODO: find proper inheritance instead of making these global


Template.registerHelper("custremarkfound", function(sess) {
    return sess.custremarks;
});
Template.registerHelper("vendremarkfound", function(sess) {
    return sess.vendremarks;
});
Template.registerHelper("getsessionstatus", function(thesess) {
    if (thesess.sessionstatus == 0) {
        return true;
    }
});
Template.registerHelper("thebooking", function(sess) {
    var found = Bookings.findOne({_id: sess.bookingID}) || {};
    return found;
});
Template.registerHelper("cust", function(sess) {
    var found = Userdata.findOne({_id: sess.custID}) || {};
    return found;
});
Template.registerHelper("sess", function() {
    var sid = FlowRouter.getParam('sessid');
    // might break later?
    var found = Sessions.findOne({_id: sid}) || {};
    return found;
});

Template.registerHelper("dateToDay", function(date) {
    return moment.utc(date).format('dddd');
});
Template.registerHelper("dateFormat", function(date) {
    return moment.utc(date).format('YYYY-MM-DD');
});
Template.registerHelper("getsubstatus", function(booking) {
    if (booking.jobstatus == 2 || booking.jobstatus == 3) {
        return true;
    }
});
Template.registerHelper("sess_nextsessdate", function(sess) {
    // this sorts dates on the server, client cant sort Date
    // to sort dates on client we need some other way
    var allsess = Sessions.find({bookingID: sess.bookingID, date: {$gt: sess.date}}, {sort: {date: 1}}) || {};
    var arr = [];
    allsess.forEach(function (item) {
        arr.push(item);
    });

    if (arr.length > 0) {
        return moment.utc(arr[0].date).format('YYYY-MM-DD');
    }
});
Template.registerHelper("nextsessid", function(sess, direction) {
    var dir;

    if (direction == 'prv') {
        var allsess = Sessions.find({bookingID: sess.bookingID, date: {$lt: sess.date}}, {sort: {date: -1}}) || {};
    } else {
        var allsess = Sessions.find({bookingID: sess.bookingID, date: {$gt: sess.date}}, {sort: {date: 1}}) || {};
    }

    var arr = [];

    allsess.forEach(function (item) {
        arr.push(item);
    });

    if (arr.length > 0) {
        return arr[0]._id;
    }
});

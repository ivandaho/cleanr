import './VendorSessionDetails.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Sessions } from '../../api/sessions/Sessions.js';
import { Userdata } from '../../api/userdata/Userdata.js';
import { Bookings } from '../../api/bookings/Bookings.js';
    //Meteor.subscribe('recipes');

Template.VendorSessionDetails.onCreated(function VendorSessionDetailsOnCreated() {
    Meteor.subscribe('timeslots');
    Meteor.subscribe('sessions');
    Meteor.subscribe('userdata');
    Meteor.subscribe('bookings');

    tss = Timeslots.find({});
});

var tss;

Template.VendorSessionDetails.helpers({
    isvendor(sess) {
        return Meteor.call('userdata.checkIsVendor', sess) || {};
    },
    iscustomer(sess) {
        return Meteor.call('userdata.checkIsCustomer', sess) || {};
    },
    custremarkfound(sess) {
        return sess.custremarks;
    },
    vendremarkfound(sess) {
        return sess.vendremarks;
    },
    overdate(sess) {
        // get sessiond date and slot
        var sd = sess.date;
        var ss = sess.timeslot;
        strdate = moment.utc(sd).format('YYYY-MM-DD');
        thetimeslot = Timeslots.findOne({num: parseInt(ss)});
        slotend = thetimeslot.timeend;
        strcheck = strdate + ' ' + slotend;

        var check = moment.utc(strcheck, 'YYYY-MM-DD HHmm');
        if (moment.utc() > check) {
            return true;
        }
    },
    getsessionstatus(thesess) {
        if (thesess.sessionstatus == 0) {
            return true;
        }
    },
    timeslots() {
        if (tss != undefined) {
            return tss;
        }
    },
    formatdate(d) {
        return moment.utc(d).format('YYYY-MM-DD');
    },
    thebooking(sess) {
        var found = Bookings.findOne({_id: sess.bookingID}) || {};
        return found;
    },
    cust(sess) {
        var found = Userdata.findOne({_id: sess.custID}) || {};
        return found;
    },
    sess() {
        var sid = FlowRouter.getParam('sessid');
        // might break later?
        var found = Sessions.findOne({_id: sid}); //  || {};
        return found;
    },
    sess_day(sess) {
        return moment.utc(sess.date).format('dddd');
    },
    sess_date(sess) {
        return moment.utc(sess.date).format('YYYY-MM-DD');
    },
    sess_slotstr(sess) {
        var ts = Timeslots.findOne({num: parseInt(sess.timeslot)}) || {};
        return ts.slot;
    },
    sess_nextsessdate(sess) {
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
    },
    nextsessid(sess, direction) {
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
    },
});

Template.VendorSessionDetails.events({
    'click .btn-mark-completed' (event) {
        event.preventDefault();
        Meteor.call('sessions.markCompleted', FlowRouter.getParam('sessid'));
    },
    'click .btn-mark-not-completed' (event) {
        event.preventDefault();
        Meteor.call('sessions.markNotCompleted', FlowRouter.getParam('sessid'));
    },
    'click .cedit' (event) {
        event.preventDefault();
        var sid = FlowRouter.getParam('sessid');
        var oldcomment = event.target.id;
        bootbox.prompt({
            title: "Edit Comment",
            value: oldcomment,
            callback: function(result) {
                if (result === null) {
                    console.log("Prompt dismissed");
                } else {
                    Meteor.call('sessions.custEditComment', sid, oldcomment, result);
                }
            }
        });
    },
    'click .vedit' (event) {
        event.preventDefault();
        var sid = FlowRouter.getParam('sessid');
        var oldcomment = event.target.id;
        bootbox.prompt({
            title: "Edit Comment",
            value: oldcomment,
            callback: function(result) {
                if (result === null) {
                    console.log("Prompt dismissed");
                } else {
                    Meteor.call('sessions.vendEditComment', sid, oldcomment, result);
                }
            }
        });
    },
    'click .crm' (event) {
        var sid = FlowRouter.getParam('sessid');
        comment = event.target.id;
        Meteor.call('sessions.custDeleteComment', sid, comment);
    },
    'click .vrm' (event) {
        var sid = FlowRouter.getParam('sessid');
        comment = event.target.id;
        Meteor.call('sessions.vendDeleteComment', sid, comment);
    },
    'click .cadd' (event) {
        var sid = FlowRouter.getParam('sessid');
        bootbox.prompt({
            title: "Add Comment",
            callback: function(result) {
                if (result === null) {
                    console.log("Prompt dismissed");
                } else {
                    Meteor.call('sessions.custAddComment', sid, result);
                }
            }
        });
    },
    'click .vadd' (event) {
        var sid = FlowRouter.getParam('sessid');
        bootbox.prompt({
            title: "Add Comment",
            callback: function(result) {
                if (result === null) {
                    console.log("Prompt dismissed");
                } else {
                    Meteor.call('sessions.vendAddComment', sid, result);
                }
            }
        });
    },

});


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
        return moment(d).format('YYYY-MM-DD');
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
        return moment(sess.date).format('dddd');
    },
    sess_date(sess) {
        return moment(sess.date).format('YYYY-MM-DD');
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
            return moment(arr[0].date).format('YYYY-MM-DD');
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

Template.vwschedtable.helpers({
    days(num) {

        var jdate = Session.get('currweek');
        var mdate = moment(jdate);

        var mondate = mdate.clone().add(0, 'days');
        var tuedate = mdate.clone().add(1, 'days');
        var weddate = mdate.clone().add(2, 'days');
        var thudate = mdate.clone().add(3, 'days');
        var fridate = mdate.clone().add(4, 'days');
        var satdate = mdate.clone().add(5, 'days');
        var satdate = mdate.clone().add(6, 'days');
        // var d =  mdate.add(i, 'days').format("YYYY-MM-DD");

        return [
            {day:'mon',date: mdate.clone().add(0, 'days').format("YYYY-MM-DD"),n: num},
            {day:'tue',date: mdate.clone().add(1, 'days').format("YYYY-MM-DD"),n: num},
            {day:'wed',date: mdate.clone().add(2, 'days').format("YYYY-MM-DD"),n: num},
            {day:'thu',date: mdate.clone().add(3, 'days').format("YYYY-MM-DD"),n: num},
            {day:'fri',date: mdate.clone().add(4, 'days').format("YYYY-MM-DD"),n: num},
            {day:'sat',date: mdate.clone().add(5, 'days').format("YYYY-MM-DD"),n: num},
            {day:'sun',date: mdate.clone().add(6, 'days').format("YYYY-MM-DD"),n: num}];
    },
});

Template.vweachslot.helpers({
    testsess(date, n) {
        var jdate = moment(date).toDate();
        // find a session that is assigned to this vendor
        var sess = Sessions.findOne({
                                    date: jdate,
                                    timeslot: parseInt(n),
                                    vendorID: Meteor.userId()
                                });
        // search for customer details
        if (sess != undefined) {
            var customer = Userdata.findOne({_id: sess.custID});
            sess.cus = customer;
            return sess;
        }
    },
});

Template.VendorSessionDetails.events({
    /*
    'click .nextsess' (event) {
        event.preventDefault();
        var nextsessid
        var str = 'vendorsessiondetails/' + nextsessid;
        FlowRouter.go(str);
    },
    */
    'click .btn-mark-completed' (event) {
        event.preventDefault();
        Meteor.call('sessions.markCompleted', FlowRouter.getParam('sessid'));
    },
    'click .btn-mark-not-completed' (event) {
        event.preventDefault();
        Meteor.call('sessions.markNotCompleted', FlowRouter.getParam('sessid'));
    },
    'click .resetweekbtn' (event) {
        event.preventDefault();
        var mdate = moment().startOf('week').add(1, 'days');
        tempjdate = mdate.toDate();
        Session.set('currweek', tempjdate);
    },
    'click .nextweekbtn' (event) {
        event.preventDefault();
        var tempjdate = Session.get('currweek');
        var mdate = moment(tempjdate).add(1, 'weeks'); // monday
        tempjdate = mdate.toDate();
        if (tempjdate > moment().add(5, 'weeks')) {
            return;
        } else {
            Session.set('currweek', tempjdate);
        }
    },

});


import './VendorWorkSchedule.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Vendorslots } from '../../api/vendorslots/Vendorslots.js';
import { Sessions } from '../../api/sessions/Sessions.js';
import { Userdata } from '../../api/userdata/Userdata.js';
    //Meteor.subscribe('recipes');
import '/imports/startup/client/config/velocity_callouts.js';

Template.VendorWorkSchedule.onCreated(function VendorWorkScheduleOnCreated() {
    Meteor.subscribe('timeslots');
    Meteor.subscribe('vendorslots');
    var mdate = moment.utc().startOf('week').add(1, 'days'); // this week's monday
    var jdate = mdate.toDate();
    Session.set('currweek', jdate);
    tss = Timeslots.find({});
    Meteor.subscribe('sessions');
    Meteor.subscribe('userdata');
});

var tss;

Template.VendorWorkSchedule.helpers({
    timeslots() {
        if (tss != undefined){
            return tss;
        }
    },
    weekdates(i) {
        var jdate = Session.get('currweek');
        var mdate = moment.utc(jdate);
        return mdate.add(i, 'days').format("DD-MM");
    },
});

Template.vwschedtable.helpers({
    days(num) {

        var jdate = Session.get('currweek');
        var mdate = moment.utc(jdate);

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

Template.vssession.helpers({
    dateover(sess) {
        if (moment.utc(sess.date) < moment.utc()) {
            return 'vs-passdate-cust';
        }
    },

    getsessionstatus(sess) {
        var ss = sess.sessionstatus;
        if (ss == 0) {
            return true;
        }
    },
    getcuss(sess) {
        // customer userdata accesible to vendor
        var customer = Userdata.findOne({_id: sess.custID});

        return customer && customer;
    },
});
Template.vweachslot.helpers({
    getsess(date, n) {
        var jdate = moment.utc(date).toDate();
        var sess = Sessions.findOne({
                                    date: jdate,
                                    timeslot: parseInt(n),
                                    vendorID: Meteor.userId()
                                });
        if (sess!= undefined) {
            return sess;
        } else {
            return false;
        }
    },
});

Template.vsempty.helpers({
    dateover(date, n) {
        //console.log(n);
        var endtime = Timeslots.findOne({num: n});
        datestr = moment.utc(date).format('YYYY-MM-DD');
        checkstr = datestr + ' ' + endtime.timeend;
        if (moment.utc(checkstr, 'YYYY-MM-DD HHmm') < moment.utc()) {
            return 'vs-passdate';
        }
        return 'test';
    },
});

Template.VendorWorkSchedule.events({
    'click .prevweekbtn' (event) {
        event.preventDefault();
        var tempjdate = Session.get('currweek');
        var mdate = moment.utc(tempjdate).subtract(1, 'weeks'); // monday
        tempjdate = mdate.toDate();
        Session.set('currweek', tempjdate);
        /* disabled the limit backwards, so vendors can view their history
        if (tempjdate < moment().subtract(1, 'weeks')) {
            return;
        } else {
            Session.set('currweek', tempjdate);
        }
        */
    },
    'click .resetweekbtn' (event) {
        event.preventDefault();
        var mdate = moment.utc().startOf('week').add(1, 'days');
        tempjdate = mdate.toDate();
        Session.set('currweek', tempjdate);
        $("td").velocity("stop");
        $("td").velocity("callout.emerge");
    },
    'click .nextweekbtn' (event) {
        event.preventDefault();
        var tempjdate = Session.get('currweek');
        var mdate = moment.utc(tempjdate).add(1, 'weeks'); // monday
        tempjdate = mdate.toDate();
        if (tempjdate > moment.utc().add(5, 'weeks')) {
            return;
        } else {
            Session.set('currweek', tempjdate);
        }
    },

});


import './Schedule.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Vendorslots } from '../../api/vendorslots/Vendorslots.js';
    //Meteor.subscribe('recipes');

Template.Schedule.onCreated(function ScheduleOnCreated() {
    Meteor.subscribe('timeslots');
    Meteor.subscribe('vendorslots');
    var mdate = moment().startOf('week').add(1, 'days'); // this week's monday
    var jdate = mdate.toDate();
    Session.set('currweek', jdate);
    tss = Timeslots.find({});
    //Meteor.subscribe('sessions');
});

var tss;

Template.Schedule.helpers({
    timeslots() {
        if (tss != undefined){
            return tss;
        }
    },
    weekdates(i) {
        var jdate = Session.get('currweek');
        var mdate = moment(jdate);
        return mdate.add(i, 'days').format("DD-MM");
    },
});

Template.schedtable.helpers({
    days(num) {

        var jdate = Session.get('currweek');
        var mdate = moment(jdate);
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

Template.eachslot.helpers({
    hasopen(date, n) {
        var jdate = moment(date).toDate();

        // console.log(date + ' ' + jdate);

        //var ds = Vendorslots.find({d: new Date(jdate)});
        var ds = Vendorslots.find({
                                    $and: [
                                        {d: new Date(jdate)},
                                        {s: parseInt(n)}
                                    ]
                                }); // find for that day
        var count = ds.count();
        if (count > 0) {
            return true;
        } else {
            return false;
        }

    },
});
Template.Schedule.events({
    'click .bookbtn' (event) {
        event.preventDefault();

        return;
        /*
        var mdate = moment().startOf('week').add(1, 'days'); // monday
        var jdate = mdate.toDate();
        var st = "uYNw5K2ZcTuWfxcXG";

        var query = { mondayDate: jdate};
        tw = weeks.findOne(query);

        console.log(tw.timeslots);
        return;
        */
        var date = event.target.id.substring(0,10);
        var slot = event.target.id.substring(11,23);
        mdate = moment(date);
        msg_day = mdate.format('dddd ');
        msg_date = mdate.format('MMMM D');
        var bb_msg = "You have selected the " + msg_day + slot + " time slot. Session will start on " + msg_date;
        //bootbox.alert('test');
        bootbox.dialog({
            message: bb_msg,
            title: "Booking Confirmation",
            onEscape: function() {} // allows for esc to close modal
        });

    },
    'click .prevweekbtn' (event) {
        event.preventDefault();
        var tempjdate = Session.get('currweek');
        var mdate = moment(tempjdate).subtract(1, 'weeks'); // monday
        tempjdate = mdate.toDate();
        if (tempjdate < moment().subtract(1, 'weeks')) {
            return;
        } else {
            Session.set('currweek', tempjdate);
        }

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


import './Schedule.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Weeks } from '../../api/weeks/Weeks.js';
    //Meteor.subscribe('recipes');

Template.Schedule.onCreated(function ScheduleOnCreated() {
    Meteor.subscribe('timeslots');
    Meteor.subscribe('weeks');
    window.weeks = Weeks;

    var mdate = moment().startOf('week').add(1, 'days'); // monday
    var jdate = mdate.toDate();
    Session.set('currweek', jdate);
    //Meteor.subscribe('sessions');
});

Template.Schedule.helpers({
    thisweekdata() {
        // get this week's data
        var jdate = Session.get('currweek');


        var query = { mondayDate: jdate};
        tw = weeks.findOne(query);
        if (tw != undefined){
            return tw.timeslots;
        }
    },
    weekdates(i) {
        var jdate = Session.get('currweek');
        var mdate = moment(jdate);
        return mdate.add(i, 'days').format("DD-MM");
    },
});

Template.Schedule.events({
    'click .bookbtn' (event) {
        event.preventDefault();
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
        var mdate = moment(tempjdate).subtract(1, 'week'); // monday
        tempjdate = mdate.toDate();
        console.log(tempjdate);
        Session.set('currweek', tempjdate);

    },
    'click .nextweekbtn' (event) {
        event.preventDefault();
        var tempjdate = Session.get('currweek');
        var mdate = moment(tempjdate).add(1, 'week'); // monday
        tempjdate = mdate.toDate();
        console.log(tempjdate);
        Session.set('currweek', tempjdate);

    },

});


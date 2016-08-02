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

        var date = event.target.id.substring(0,10);
        var slot = event.target.id.substring(11,23);
        Session.set('date', date);
        Session.set('slot', slot);
        mdate = moment(date);
        msg_day = mdate.format('dddd ');
        msg_date = mdate.format('MMMM D');
        var ts = Timeslots.findOne({num: parseInt(slot)});

        var bb_msg = '<div class="row text-center"><h4>You have selected the ' + msg_day + '(' + msg_date + ') ' + ts.slot + ' time slot.</h4><br>Please select a session type.</div>';
        //bootbox.alert('test');
    //'<input type="range" min="0" max="3" step="1" value="1" data-orientation="horizontal" >' +
        var contenthtml = '<div class="row">  ' +
                            '<div class="text-center">' +
                              'Single session: a once-off cleaning session.' +
                            '</div>' +
                          '</div>' +
                          '<div class="row">  ' +
                            '<div class="text-center">' +
                              'or:' +
                            '</div>' +
                          '</div>' +
                          '<div class="row">  ' +
                            '<div class="text-center">' +
                              'Weekly Sessions: Billed once a month. Cancel anytime.' +
                            '</div>' +
                          '</div>';

        bootbox.dialog({
            title: "Booking",
            message: bb_msg + '<br>' + contenthtml,
            buttons: {
                'single': {
                    label: 'Single Session',
                    className: 'btn-success',
                    callback: function() {
                        Session.set('repeat', false);
                        FlowRouter.go('/confirmation');
                        return true;
                    }
                },
                'weekly': {
                    label: 'Weekly Sessions',
                    className: 'btn-success',
                    callback: function() {
                        Session.set('repeat', true);
                        FlowRouter.go('/confirmation');
                        return true;
                    }
                }
            },
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


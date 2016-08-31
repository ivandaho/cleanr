import './VendorSpecify.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Vendordata } from '../../api/vendordata/Vendordata.js';
import { Vendorslots } from '../../api/vendorslots/Vendorslots.js';
import { Generatedweeks } from '../../api/generatedweeks/Generatedweeks.js';
    //Meteor.subscribe('recipes');

Template.VendorSpecify.onCreated(function VendorSpecifyOnCreated() {
    Meteor.subscribe('timeslots');
    Meteor.subscribe('vendordata');
    Meteor.subscribe('vendorslots');
    Meteor.subscribe('generatedweeks');
    var mdate = moment().startOf('week').add(1, 'days');
    var jdate = mdate.toDate();
    Session.set('currweek', jdate);
    tss = Timeslots.find({});

});

var tss;

Template.VendorSpecify.helpers({
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

Template.vcalschedtable.helpers({
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

Template.vcaleachslot.helpers({
    datenotover(date, n) {
        var jdate = moment(date).toDate();
        //console.log(n);
        var starttime = Timeslots.findOne({num: n});
        datestr = moment(date).format('YYYY-MM-DD');
        checkstr = datestr + ' ' + starttime.timestart;
        if (moment(checkstr, 'YYYY-MM-DD HHmm') < moment().add(2, 'days')) {
            // if date passed
            return false;
        }
        return true;
    },
    hasopen(date, n) {
        var jdate = moment(date).toDate();
        var ds = Vendorslots.find({
                                    $and: [
                                        {d: new Date(jdate)},
                                        {ownerID: Meteor.userId()},
                                        {s: parseInt(n)}
                                    ]
                                }); // find for that day
        var count = ds.count();
        return count;
        /*
        if (count > 0) {
            return true;
        } else {
            return false;
        }
        */

    },
});


Template.VendorSpecify.events({
    'click .slotincrease' (event) {
        event.preventDefault();
        str = event.target.id;
        jdate = moment(str.substring(0,10)).toDate();
        slot = str.substring(11,12);
        Meteor.call('vendorslots.addSlot', jdate, slot);
    },
    'click .slotdecrease' (event) {
        event.preventDefault();
        str = event.target.id;
        jdate = moment(str.substring(0,10)).toDate();
        slot = str.substring(11,12);
        Meteor.call('vendorslots.removeSlot', jdate, slot);
    },
    'click .selectbtn' (event) {
        event.preventDefault();
        str = "vsched " + event.target.id;

        if (event.target.classList.contains("btn-success")) {
            Session.set(str, false);
            event.target.classList.remove("btn-success");
            event.target.classList.add("btn-danger");
        } else {
            Session.set(str, true);
            event.target.classList.remove("btn-danger");
            event.target.classList.add("btn-success");
        }
    },
    /*
    // unneeded because the - + buttons do it already
    'click .btn-proceed' (event) {
        event.preventDefault();
        var vendorSlots = [];
        var ts = Timeslots.find({});
        ts.forEach(function(sl){
            var days =["mon","tue","wed","thu","fri","sat","sun"];
            days.forEach(function(dayvar){
                var ss = "vsched " + dayvar + " " + sl.slot;
                if (Session.get(ss) == undefined || Session.get(ss) == true) {
                    vendorSlots.push(ss.substring(7,99));
                }
            });
        });
        Meteor.call('vendordata.pushSlot', vendorSlots);
    },
    */
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

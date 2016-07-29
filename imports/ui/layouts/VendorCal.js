import './VendorCal.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Vendordata } from '../../api/vendordata/Vendordata.js';
import { Vendorslots } from '../../api/vendorslots/Vendorslots.js';
    //Meteor.subscribe('recipes');

Template.VendorCal.onCreated(function VendorCalOnCreated() {
    Meteor.subscribe('timeslots');
    Meteor.subscribe('vendordata');
    Meteor.subscribe('vendorslots');
    var mdate = moment().startOf('week').add(1, 'days');
    var jdate = mdate.toDate();
    Session.set('currweek', jdate);
    tss = Timeslots.find({});
    
});

var tss;

Template.VendorCal.helpers({
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


Template.VendorCal.events({
    'click .slotopen' (event) {
        event.preventDefault();
        console.log('sdf');
    },
    'click .newbtn' (event) {
        event.preventDefault();
        console.log('sdf');
        Meteor.call('vendordata.updateSlots', data);
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
    'click .prevweekbtn' (event) {
        event.preventDefault();
        var tempjdate = Session.get('currweek');
        var mdate = moment(tempjdate).subtract(1, 'week'); // monday
        tempjdate = mdate.toDate();
        Session.set('currweek', tempjdate);

    },
    'click .nextweekbtn' (event) {
        event.preventDefault();
        var tempjdate = Session.get('currweek');
        var mdate = moment(tempjdate).add(1, 'week'); // monday
        tempjdate = mdate.toDate();
        Session.set('currweek', tempjdate);

    },
    

});


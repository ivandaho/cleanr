import './VendorRegistration.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Vendordata } from '../../api/vendordata/Vendordata.js';
import { Vendorslots } from '../../api/vendorslots/Vendorslots.js';
    //Meteor.subscribe('recipes');

Template.VendorRegistration.onCreated(function VendorRegistrationOnCreated() {
    Meteor.subscribe('timeslots');
    Meteor.subscribe('vendordata');
    Meteor.subscribe('vendorslots');
    //Meteor.subscribe('weeks');
});

Template.VendorRegistration.helpers({
    tsdata() {
        return Timeslots.find({});
    },
});

Template.vschedtable.helpers({
    dayhelper(n) {
        return [
            {day:'mon',num:n},
            {day:'tue',num:n},
            {day:'wed',num:n},
            {day:'thu',num:n},
            {day:'fri',num:n},
            {day:'sat',num:n},
            {day:'sun',num:n}];
    },
});


Template.VendorRegistration.events({
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
        var vs = [];
        var ts = Timeslots.find({});
        ts.forEach(function(sl){
            var days =["mon","tue","wed","thu","fri","sat","sun"];
            days.forEach(function(dayvar){
                var ss = "vsched " + dayvar + " " + sl.num;
                if (Session.get(ss) == undefined || Session.get(ss) == true) {
                    vs.push(ss.substring(7,99));
                }
            });
        });
        Meteor.call('vendordata.pushSlots', vs);
    }

});


import './VendorRegistration.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Timeslots } from '../../api/timeslots/Timeslots.js';
    //Meteor.subscribe('recipes');

Template.VendorRegistration.onCreated(function VendorRegistrationOnCreated() {
    Meteor.subscribe('timeslots');
    //Meteor.subscribe('weeks');
});

Template.VendorRegistration.helpers({
    tsdata() {
        return Timeslots.find({});
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
        var vendorSlots = [];
        var ts = Timeslots.find({});
        ts.forEach(function(sl){
            var days =["mon","tue","wed","thu","fri","sat","sun"];
            days.forEach(function(dayvar){
                var ss = "vsched " + dayvar + " " + sl.slot;
                if (Session.get(ss) == undefined || Session.get(ss) == true) {
                    vendorSlots.push(ss.substring(6,99));
                }
            });
        });

    }

});


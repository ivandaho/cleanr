import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Jobs } from '../../api/jobs/Jobs.js';
import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Bookings } from '../../api/bookings/Bookings.js';
import { Sessions } from '../../api/sessions/Sessions.js';

import '../../api/jobs/Jobs.js';
import './Confirmation.html';

// this is for meteor session variables, not cleaning session
import { Session } from 'meteor/session';
import { Userdata } from '../../api/userdata/Userdata.js';

Template.Confirmation.onCreated(function ConfirmationOnCreated() {
  Meteor.subscribe('jobs');
  Meteor.subscribe('bookings');
  Meteor.subscribe('sessions');
  this.state = new ReactiveDict();
});


Template.Confirmation.helpers({
    userdata() {
        return Userdata.findOne({});
    },
    schedSlotTime() {
        // time slot
        var slot = parseInt(Session.get('slot'));
        var tsdata = Timeslots.findOne({"num": slot});
        if (tsdata != undefined) {
            var slotstr = tsdata.slot;
            return slotstr;
        } else {
            return null;
        }
    },
    schedSlotDay() {
        // time slot
        var date = Session.get('date');
        var mdate = moment(date);
        if (mdate != undefined) {
            var str = 'Every ' + mdate.format('dddd');
            return str;
        } else {
            return null;
        }
    },
    schedSlotDate() {
        // time slot
        var date = Session.get('date');
        var mdate = moment(date);
        if (mdate != undefined) {
            var str = mdate.format('YYYY-MM-DD');
            return str;
        } else {
            return null;
        }
    },
    weekly() {
        if (Session.get('repeat') == true) {
            return true;
        } else {
            return false;
        }
    },
    firstSession() {
        var date = Session.get('date');
        var slot = Session.get('slot');
        // parse

        return slot;
    },
    addMCBtn() {
        if (Session.get('addMC', true)) {
            return 'btn-default';
        } else {
            return 'btn-success';
        }
    },
    addCCBtn() {
        if (Session.get('addCC', true)) {
            return 'btn-default';
        } else {
            return 'btn-success';
        }
    },
    addMCStatus() {
        if (Session.get('addMC', true)) {
            return 'Added';
        } else {
            return 'Add';
        }
    },
    addCCStatus() {
        if (Session.get('addCC', true)) {
            return 'Added';
        } else {
            return 'Add';
        }
    },
});
Template.Confirmation.events({
    'submit .ip' (event) {
        event.preventDefault();
        const target = event.target;
    },

    'click #addMC' (event) {
        if (event.target.classList.contains("btn-default")) {
            // if client wants to remove
            Session.set('addMC', false);
        } else {
            // add the service
            Session.set('addMC', true);
        }
    },
    'click #addCC' (event) {
        if (event.target.classList.contains("btn-default")) {
            // if client wants to remove
            Session.set('addCC', false);
        } else {
            // add the service
            Session.set('addCC', true);
        }
    },
    'click #proceedPayment' () {
        var date = moment(Session.get('date')).toDate();
        var slot = Session.get('slot');
        var repeat = Session.get('repeat');
        var mc = Session.get('addMC');
        var cc = Session.get('addCC');
        Meteor.call('bookings.insert', date, slot, repeat, mc, cc);
    },
});

Meteor.methods({
});

import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Jobs } from '../../api/jobs/Jobs.js';
import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Sessions } from '../../api/sessions/Sessions.js';

import '../../api/jobs/Jobs.js';
import './Confirmation.html';

// this is for meteor session variables, not cleaning session
import { Session } from 'meteor/session';
import { Userdata } from '../../api/userdata/Userdata.js';

Template.Confirmation.onCreated(function ConfirmationOnCreated() {
    Meteor.subscribe('jobs');
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
    'click .changeAddress' (event) {
        event.preventDefault();
        var i = (event.target.id);
        bootbox.dialog({
                title: "Change Address",
                message:
                  '<div class="row">  ' +
                    '<div class="col-md-4"> ' +
                      '<input id="street" name="street" placeholder="Street" type="text" class="input-street"> ' +
                      '<input id="city" name="city" placeholder="City" type="text" class="input-street"> ' +
                      '<input id="state" name="state" placeholder="State" type="text" class="input-street"> ' +
                      '<input id="zip" name="zip" placeholder="ZIP" type="text" class="input-street"> ' +
                    '</div>' +
                  '</div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var index = parseInt(i);
                            var street = $("#street").val();
                            var city = $("#city").val();
                            var state = $("#state").val();
                            var zip = $("#zip").val();
                            Meteor.call('userdata.changeAddress', index, street, city, state, zip);
                        }
                    }
                }
            }
        );
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

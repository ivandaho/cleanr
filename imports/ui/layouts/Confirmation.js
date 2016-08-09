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
    Meteor.subscribe('timeslots');
    this.state = new ReactiveDict();
});


Template.Confirmation.helpers({
    userdata() {
        return Userdata.findOne({});
    },
    schedSlotTime() {
        // time slot
        var slot = parseInt(FlowRouter.getQueryParam('slot'));
        var tsdata = Timeslots.findOne({"num": slot});
        if (tsdata != undefined) {
            var slotstr = tsdata.slot;
            return slotstr;
        } else {
            return 'invalid slot.';
            return null;
        }
    },
    schedSlotDay() {
        var date = FlowRouter.getQueryParam('date');
        var mdate = moment(date);
        if (mdate != undefined) {
            var str = 'Every ' + mdate.format('dddd');
            return str;
        } else {
            return null;
        }
    },
    schedSlotDate() {
        var date = FlowRouter.getQueryParam('date');
        var mdate = moment(date);
        if (mdate != undefined) {
            var str = mdate.format('YYYY-MM-DD');
            return str;
        } else {
            return null;
        }
    },
    weekly() {
        if (FlowRouter.getQueryParam('repeat') == 'true') {
            return true;
        } else {
            return false;
        }
    },
    wantMC() {
        if (FlowRouter.getQueryParam('addMC') == 'true') {
            return true;
        }
    },
    wantCC() {
        if (FlowRouter.getQueryParam('addCC') == 'true') {
            return true;
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
        event.preventDefault();
        if (FlowRouter.getQueryParam('addMC') == 'true') {
            // if client wants to remove
            FlowRouter.withReplaceState(function() {
                FlowRouter.setQueryParams({'addMC': false});
            });
        } else {
            // add the service
            FlowRouter.withReplaceState(function() {
                FlowRouter.setQueryParams({'addMC': true});
            });
        }
    },
    'click #addCC' (event) {
        event.preventDefault();
        if (FlowRouter.getQueryParam('addCC') == 'true') {
            // if client wants to remove
            FlowRouter.withReplaceState(function() {
                FlowRouter.setQueryParams({'addCC': false});
            });
        } else {
            // add the service
            FlowRouter.withReplaceState(function() {
                FlowRouter.setQueryParams({'addCC': true});
            });
        }
    },
    'click #proceedPayment' () {
        var date = moment(FlowRouter.getQueryParam('date')).toDate();
        var slot = FlowRouter.getQueryParam('slot');
        var repeat = Boolean(FlowRouter.getQueryParam('repeat'));
        var cc = Boolean(FlowRouter.getQueryParam('addCC'));
        var mc = Boolean(FlowRouter.getQueryParam('addMC'));
        Meteor.call('bookings.insert', date, slot, repeat, mc, cc);
    },
});

Meteor.methods({
});

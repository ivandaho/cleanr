import { Template } from 'meteor/templating';

import './Account.html';

// this is for meteor session variables, not cleaning session
import { Userdata } from '../../api/userdata/Userdata.js';
import { Sessions } from '../../api/sessions/Sessions.js';
import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Bookings } from '../../api/bookings/Bookings.js';
/*
import { Session } from 'meteor/session';
*/

Template.Account.onCreated(function AccountOnCreated() {
    Meteor.subscribe('userdata');
    Meteor.subscribe('sessions');
    Meteor.subscribe('timeslots');
    Meteor.subscribe('bookings');
});


Template.Account.helpers({
    subdate(date) {
        return moment(date).format('YYYY-MM-DD HH:MM');
    },
    loginredirect() {
        FlowRouter.go('login');
    },
    substatus(booking) {
        var ss = booking.jobstatus;
        if (ss == 2 || ss == 3) {
            return "Active";
        }
        return "Inactive";
    },
    morebookings() {
        return Bookings.find({custID: Meteor.userId()});
    },
    booking() {
        // get most recent session
        var d = moment().subtract(6, 'months').toDate();
        var mrs = Sessions.findOne({custID: Meteor.userId(),
                                    date: {$gt: d}},
                                    {sort: {date: -1}}) || {};
        var found = Bookings.findOne({_id: mrs.bookingID});
            if (found){
              if (found.jobstatus == 3 || found.jobstatus == 2) {
                return found;
              }
            }
    },
    userdata() { // TODO: is this secure? #22
        return Userdata.findOne({_id: Meteor.userId()});
    },
    sesses() { // TODO: is this secure? #22
        return Sessions.find({custID: Meteor.userId()});
    },
    d(p) {
        return moment(p).format('YYYY-MM-DD');
    },
    s(p) {
        var found = Timeslots.findOne({num: parseInt(p)}) || {};

        return found.slot && found.slot;
    },
});
Template.Account.events({
    'click .setaddress' (event) {
        event.preventDefault();
        var i = (event.target.id);
        Meteor.call('userdata.setMainAddress', i);
    },
    'click .changeEmail' (event) {
        event.preventDefault();
        bootbox.dialog({
                title: "Change E-mail",
                message:
                    // TODO: change account login also
                  '<div class="row">  ' +
                    '<div class="col-md-4"> ' +
                      '<input id="mail" name="street" placeholder="enter new email" type="text" class="input-street"> ' +
                    '</div>' +
                  '</div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var newmail = $("#mail").val();
                            Meteor.call('userdata.changeEmail', newmail);
                        }
                    }
                }
            }
        );
    },
    'click .changeTel' (event) {
        event.preventDefault();
        bootbox.dialog({
                title: "Change Phone Number",
                message:
                  '<div class="row">  ' +
                    '<div class="col-md-4"> ' +
                      '<input id="tel" name="street" placeholder="enter new phone number" type="text" class="input-street"> ' +
                    '</div>' +
                  '</div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var newtel = $("#tel").val();
                            Meteor.call('userdata.changeTel', newtel);
                        }
                    }
                }
            }
        );
    },
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
    'click .lessbtn' (event) {
        event.preventDefault();
        console.log('TODO: change treshold for recent sessions');
    },
});

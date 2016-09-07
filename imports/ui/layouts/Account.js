import { Template } from 'meteor/templating';

import './Account.html';

// this is for meteor session variables, not cleaning session
import { Sessions } from '../../api/sessions/Sessions.js';
import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Bookings } from '../../api/bookings/Bookings.js';
import { Userdata } from '../../api/userdata/Userdata.js';
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
    parsess(status) {
        if (status == 1) {
            return true;
        } else if (status == 0) {
            return false;
        }
    },
    subdate(date) {
        return moment.utc(date).format('YYYY-MM-DD HH:MM');
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
        // get most recent booking with active subscription
        var d = moment.utc().subtract(6, 'months').toDate();
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
    sesses() { // TODO: is this secure? #22
        return Sessions.find({custID: Meteor.userId()});
    },
    d(p) {
        return moment.utc(p).format('YYYY-MM-DD');
    },
    s(p) {
        var found = Timeslots.findOne({num: parseInt(p)}) || {};

        return found.slot && found.slot;
    },
});
Template.Account.events({
    'click .setaddress' (event) {
        event.stopPropagation();
        event.preventDefault();
        var i = (event.target.id);
        Meteor.call('userdata.setMainAddress', i);
    },
    'click .changeEmail' (event) {
        event.preventDefault();
        bootbox.dialog({
                size: "small",
                title: "Change E-mail",
                message:
                    // TODO: change account login also
                '<div class="row">' +
                  '<div class="col-centered col-md-12">' +
                    '<form class="form-horizontal register">' +
                      '<div class="form-group">' +
                        '<div class="col-centered col-sm-12">' +
                          '<input type="text" id="mail" placeholder="Enter new e-mail address" class="form-control">' +
                        '</div>' +
                      '</div>' +
                    '</form>' +
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
                },
                onEscape: function() {}
            }
        );
    },
    'click .changeTel' (event) {
        event.preventDefault();
        bootbox.dialog({
                size: "small",
                title: "Change Phone Number",
                message:
                '<div class="row">' +
                  '<div class="col-centered col-md-12">' +
                    '<form class="form-horizontal register">' +
                      '<div class="form-group">' +
                        '<div class="col-centered col-sm-12">' +
                          '<input type="text" id="tel" placeholder="Enter new phone number" class="form-control">' +
                        '</div>' +
                      '</div>' +
                    '</form>' +
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
                },
                onEscape: function() {}
            }
        );
    },
    'click .changeAddress' (event) {
        event.stopPropagation();
        event.preventDefault();
        var i = (event.target.id);
        bootbox.dialog({
                size: "small",
                title: "Change Address",
                message:
                '<div class="row">' +
                  '<div class="col-centered col-md-12">' +
                    '<form class="form-horizontal register">' +
                      '<div class="form-group">' +
                        '<div class="col-centered col-sm-12">' +
                          '<input type="text" id="street" placeholder="Street" class="form-control">' +
                        '</div>' +
                      '</div>' +
                      '<div class="form-group">' +
                        '<div class="col-centered col-sm-12">' +
                          '<input type="text" id="city" placeholder="City" class="form-control">' +
                        '</div>' +
                      '</div>' +
                      '<div class="form-group">' +
                        '<div class="col-centered col-sm-12">' +
                          '<input type="text" id="state" placeholder="State" class="form-control">' +
                        '</div>' +
                      '</div>' +
                      '<div class="form-group">' +
                        '<div class="col-centered col-sm-12">' +
                          '<input type="text" id="zip" placeholder="ZIP" class="form-control">' +
                        '</div>' +
                      '</div>' +
                    '</form>' +
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
                },
                onEscape: function() {}
            }
        );
    },
    'click .delAddress' (event) {
        event.stopPropagation();
        event.preventDefault();
        var i = (event.target.id);

        var index = parseInt(i);

        var usr = Userdata.findOne({_id: Meteor.userId()});
        var adds = [];
        adds = usr.user_address;
        delthis = adds[i];

        var street = delthis.street;
        var city = delthis.city;
        var state = delthis.state;
        var zip = delthis.zip;
        Meteor.call('userdata.delAddress', index, street, city, state, zip);
    },
    'click .lessbtn' (event) {
        event.preventDefault();
        console.log('TODO: change treshold for recent sessions');
    },
});

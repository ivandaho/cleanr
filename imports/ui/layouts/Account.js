import { Template } from 'meteor/templating';

import './Account.html';

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
    Session.set('rslimit', 5);
    Session.set('mblimit', 5);
});


Template.Account.helpers({
    parsess(status) {
        if (status == 1) {
            return true;
        } else if (status == 0) {
            return false;
        }
    },
    morebookings() {
        var mblimit = Session.get('mblimit');
        var thing = Bookings.find({
                                custID: Meteor.userId()
                            },
                            {
                                sort: {subdate: 1, timeslot: 1},
                                limit: mblimit
                            });
        // counts the number of sessions found
        var newcount = thing.count();
        // sets the number of sessions found
        Session.set('mbcount', newcount);

        // if the new count is same as the old count
        if (newcount < Session.get('mblimit')) {
            Session.set('mbmaxed', true);
        } else {
            Session.set('mbmaxed', false);
        }
        if (thing.count() != 0) {
            return thing;
        } else {
            return false;
        }
    },
    booking() {
        // get most recent booking with active subscription
        const d = moment.utc().subtract(6, 'months').toDate();
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
        var rslimit = Session.get('rslimit');
        var thing = Sessions.find({
                                custID: Meteor.userId()
                            },
                            {
                                sort: {date: 1, timeslot: 1},
                                limit: rslimit
                            });
        // counts the number of sessions found
        var newcount = thing.count();
        // sets the number of sessions found
        Session.set('rscount', newcount);

        // if the new count is same as the old count
        if (newcount < Session.get('rslimit')) {
            Session.set('rsmaxed', true);
        } else {
            Session.set('rsmaxed', false);
        }
        if (thing.count() != 0) {
            return thing;
        } else {
            return false;
        }
    },
});
Template.Account.events({
    'click .vm-rs' (event) {
        event.preventDefault();
        var newrslimit = Session.get('rslimit') + 5;
        if (Session.get('rsmaxed') != true) {
            Session.set('rslimit', Session.get('rslimit') + 5);
            setTimeout(function () {
            $(".rs-row").velocity("stop");
            $(".rs-row").velocity("callout.emerge", {stagger: 5});
            }, 10);
        }
    },
    'click .vl-rs' (event) {
        event.preventDefault();
        if (Session.get('rslimit') - 5 < 5) {
            Session.set('rslimit', 5)
        } else {
            Session.set('rslimit', Session.get('rslimit') - 5);
        }
    },
    'click .vm-mb' (event) {
        event.preventDefault();
        var newmblimit = Session.get('mblimit') + 5;
        if (Session.get('mbmaxed') != true) {
            Session.set('mblimit', Session.get('mblimit') + 5);
            setTimeout(function () {
            $(".mb-row").velocity("stop");
            $(".mb-row").velocity("callout.emerge", {stagger: 5});
            }, 10);
        }
    },
    'click .vl-mb' (event) {
        event.preventDefault();
        if (Session.get('mblimit') - 5 < 5) {
            Session.set('mblimit', 5)
        } else {
            Session.set('mblimit', Session.get('mblimit') - 5);
        }
    },
    'click #demobtn' (event) {
        event.preventDefault();
        var tour = {
            showCloseButton: false,
            id: "acctour",
            i18n:{stepNums: ["", "", "", "", "", "", ""]},
            steps: [
            {
                content: "Mouseover account details and click the edit icon to change account details",
                target: "#useremail",
                placement: "left"
            },
            {
                content: "Change your password here",
                target: "#changepwd",
                placement: "left"
            },
            {
                content: "View, add, edit, or swap your addresses here",
                target: "#useradds",
                placement: "top"
            },
            {
                content: "View your sessions & bookings here",
                target: "#usersbs",
                placement: "top"
            }
            ]
        };
        hopscotch.startTour(tour);
    },
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
                        className: "btn-success btn-primary",
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
        $(event.target.parentElement.parentElement.parentElement.parentElement).removeClass("panel-info");
    },
    'click .lessbtn' (event) {
        event.preventDefault();
        console.log('TODO: change treshold for recent sessions');
    },
});

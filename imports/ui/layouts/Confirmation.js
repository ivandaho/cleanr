import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Jobs } from '../../api/jobs/Jobs.js';
import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Sessions } from '../../api/sessions/Sessions.js';
import { Userdata } from '../../api/userdata/Userdata.js';

import '../../api/jobs/Jobs.js';
import './Confirmation.html';

// this is for meteor session variables, not cleaning session
import { Session } from 'meteor/session';

Template.Confirmation.onCreated(function ConfirmationOnCreated() {
    sm.subscribe('jobs');
    sm.subscribe('sessions');
    sm.subscribe('timeslots');
    sm.subscribe('userdata');
    this.state = new ReactiveDict();
});

Template.Confirmation.helpers({
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
        var mdate = moment.utc(date);
        if (mdate != undefined) {
            var str = 'Every ' + mdate.format('dddd');
            return str;
        } else {
            return null;
        }
    },
    schedSlotDate() {
        var date = FlowRouter.getQueryParam('date');
        var mdate = moment.utc(date);
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
        var usr = Userdata.findOne({_id: Meteor.userId()});
        var show = 0;
        var count = 0;
        var street = "street placeholder";
        var city = "city placeholder";
        var state = "state placeholder";
        var zip = "zip placeholder";
        var add1str = "";
        if (usr.user_address[1]) {
            add1str = usr.user_address[1].street + "<br>" +
                      usr.user_address[1].city + "<br>" +
                      usr.user_address[1].state + "<br>" +
                      usr.user_address[1].zip;
            count++;
        }
        if (usr.user_address[2]) {
            add2str = usr.user_address[2].street + "<br>" +
                      usr.user_address[2].city + "<br>" +
                      usr.user_address[2].state + "<br>" +
                      usr.user_address[2].zip;
            count++;
        }

        var moreadds = '';
        if (count == 1) {
              moreadds =
              '<div class="row text-center padded">' +
                'Or choose another address:' +
              '</div>' +
              '<div class="row">' +
                '<div class="col-sm-12">' +
                  '<div class="col-sm-6">' +
                    add1str +
                  '</div>' +
                '</div>' +
              '</div>';
        } else if (count == 2) {
              moreadds =
              '<div class="row text-center padded">' +
                'Or choose another address:' +
              '</div>' +
              '<div class="row">' +
                '<div class="col-sm-12 nopadding">' +
                  '<div class="col-sm-6 modal-box modal-box-left">' +
                    add1str + '<br>' +
                    '<button class="btn btn-success btn-xs btn-block" id="1">' +
                      'Choose' +
                    '</button>' +
                  '</div>' +
                  '<div class="col-sm-6 modal-box modal-box-right">' +
                    add2str + '<br>' +
                    '<button class="btn btn-success btn-xs btn-block" id="2">' +
                      'Choose' +
                    '</button>' +
                  '</div>' +
                '</div>' +
              '</div>';
        }

        var i = (event.target.id);
        bootbox.dialog({
                title: "Change Address",
                message:
                    '<div class="container-fluid">' +
                      '<div class="row">' +
                        '<form class="form-horizontal register">' +
                          '<input type="text" id="street" placeholder="Street" class="formpad form-control">' +
                          '<input type="text" id="city" placeholder="City" class="formpad form-control">' +
                          '<input type="text" id="state" placeholder="State" class="formpad form-control">' +
                          '<input type="text" id="zip" placeholder="ZIP" class="formpad form-control">' +
                        '</form>' +
                      '</div>' + moreadds +
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
        if(!Meteor.userId()) {
            bootbox.dialog({
                title: "Please Log In",
                message: "Hi there! Please log in or register to continue with the booking process. Thank you.",
                buttons: {
                    'LogIn': {
                        label: 'Log In',
                        className: 'btn-success',
                        callback: function() {
                            FlowRouter.go('/login');
                        }
                    },
                },
                onEscape: function() {} // allows for esc to close modal
            });
            return;
        }
        var date = moment.utc(FlowRouter.getQueryParam('date')).toDate();
        var slot = FlowRouter.getQueryParam('slot');
        var repeat;
        if (FlowRouter.getQueryParam('repeat') == 'true') {
            repeat = true;
        } else {
            repeat = false;
        }

        if (FlowRouter.getQueryParam('addCC') == 'true') {
            cc = true;
        } else {
            cc = false;
        }

        if (FlowRouter.getQueryParam('addMC') == 'true') {
            mc = true;
        } else {
            mc = false;
        }
        let bid;
        let sid;
        Meteor.call('bookings.insert', date, slot, repeat, mc, cc, function(error, result){
            bid = result.b;
            sid = result.s[0];

            Meteor.call('email.bookingSuccess_cust', date, slot, repeat, bid, sid);
            Meteor.call('email.bookingSuccess_vend', bid, sid);
            bootbox.dialog({
                size: 'small',
                message: 'Success!',
                buttons: {
                    'account': {
                        label: 'OK',
                        className: 'btn-success',
                        callback: function() {
                            FlowRouter.go('/account');
                        }
                    },
                },
                onEscape: function() {} // allows for esc to close modal
            });
        });
    },
});

Meteor.methods({
});

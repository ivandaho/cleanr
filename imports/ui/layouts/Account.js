import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './Account.html';

// this is for meteor session variables, not cleaning session
import { Userdata } from '../../api/userdata/Userdata.js';
/*
import { Session } from 'meteor/session';
import { Sessions } from '../../api/sessions/Sessions.js';
import { Timeslots } from '../../api/timeslots/Timeslots.js';
*/

Template.Account.onCreated(function AccountOnCreated() {
    /*
    Meteor.subscribe('sessions');
    Meteor.subscribe('timeslots');
    */
    Meteor.subscribe('userdata');
});


Template.Account.helpers({
    userdata() { //TODO: is this secure? #22
        return Userdata.findOne({_id: Meteor.userId()});
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
    'click .changeaddress' (event) {
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
                            Meteor.call('userdata.changeEmail', index, street, city, state, zip);
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
      // TODO: actual payment stuff
        var date = moment(Session.get('date')).toDate();
        var slot = Session.get('slot');
        var repeat = Session.get('repeat');
        var mc = Session.get('addMC');
        var cc = Session.get('addCC');
        Meteor.call('bookings.insert', date, slot, repeat, mc, cc);
    },
});

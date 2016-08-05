import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './VendorCustomer.html';

// this is for meteor session variables, not cleaning session
import { Session } from 'meteor/session';
import { Userdata } from '../../api/userdata/Userdata.js';
import { Sessions } from '../../api/sessions/Sessions.js';
import { Timeslots } from '../../api/timeslots/Timeslots.js';

Template.VendorCustomer.onCreated(function VendorCustomerOnCreated() {
  Meteor.subscribe('sessions');
  Meteor.subscribe('userdata');
  Meteor.subscribe('timeslots');
});


Template.VendorCustomer.helpers({
    cust() {
        return Userdata.findOne({_id: FlowRouter.getParam('custid')});
    },
    sesses(cust) {
        // gets sessions more recent than 6 months old
        var d = moment().subtract(6, 'months').toDate();
        return Sessions.find({custID: cust._id, date: {$gt: d}}, {sort: {date: -1}});
    },
    d(p) {
        return moment(p).format('YYYY-MM-DD');
    },
    s(p) {
        var found = Timeslots.findOne({num: parseInt(p)}) || {};

        return found.slot && found.slot;
    },
    userdata() {
        return Userdata.findOne({});
    },
});
Template.VendorCustomer.events({
    'click .morebtn' (event) {
        event.preventDefault();
        console.log('TODO: change treshold for recent sessions');
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
        var date = moment(Session.get('date')).toDate();
        var slot = Session.get('slot');
        var repeat = Session.get('repeat');
        var mc = Session.get('addMC');
        var cc = Session.get('addCC');
        Meteor.call('bookings.insert', date, slot, repeat, mc, cc);
    },
});

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
});

import './CustomerSessionDetails.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Sessions } from '../../api/sessions/Sessions.js';
import { Userdata } from '../../api/userdata/Userdata.js';
import { Bookings } from '../../api/bookings/Bookings.js';

Template.CustomerSessionDetails.onCreated(function CustomerSessionDetailsOnCreated() {
    Meteor.subscribe('timeslots');
    Meteor.subscribe('sessions');
    Meteor.subscribe('userdata');
    Meteor.subscribe('bookings');

    tss = Timeslots.find({});
});

var tss;

Template.CustomerSessionDetails.helpers({
    iscustomer(sess) {
        return Meteor.call('userdata.checkIsCustomer', sess) || {};
    },
    timeslots() {
        if (tss != undefined) {
            return tss;
        }
    },
});

Template.CustomerSessionDetails.events({
    'click .btn-cancel-sub' (event) {
        event.preventDefault();
        var bid = event.target.id;

        Meteor.call('bookings.stopSubscription', bid);
    },
    'click .btn-re-sub' (event) {
        event.preventDefault();
        var bid = event.target.id;

        Meteor.call('bookings.reSubscribe', bid);
    },
    'click .cedit' (event) {
        event.preventDefault();
        var sid = FlowRouter.getParam('sessid');
        var oldcomment = event.target.id;
        bootbox.prompt({
            title: "Edit Comment",
            value: oldcomment,
            callback: function(result) {
                if (result === null) {
                    console.log("Prompt dismissed");
                } else {
                    Meteor.call('sessions.custEditComment', sid, oldcomment, result);
                }
            }
        });
    },
    'click .crm' (event) {
        var sid = FlowRouter.getParam('sessid');
        comment = event.target.id;
        Meteor.call('sessions.custDeleteComment', sid, comment);
    },
    'click .cadd' (event) {
        var sid = FlowRouter.getParam('sessid');
        bootbox.prompt({
            title: "Add Comment",
            callback: function(result) {
                if (result === null) {
                    console.log("Prompt dismissed");
                } else {
                    Meteor.call('sessions.custAddComment', sid, result);
                }
            }
        });
    },
});



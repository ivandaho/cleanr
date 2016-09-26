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
    notoverdate(sess) {
        // get sessiond date and slot
        var sd = sess.date;
        var ss = sess.timeslot;
        strdate = moment.utc(sd).subtract(1, 'day').format('YYYY-MM-DD');
        thetimeslot = Timeslots.findOne({num: parseInt(ss)});
        slotend = thetimeslot.timeend;
        strcheck = strdate + ' ' + slotend;

        var check = moment.utc(strcheck, 'YYYY-MM-DD HHmm');
        if (moment.utc() < check) {
            return true;
        }
    },
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
    'click .btn-cancelsession' (event) {
        event.preventDefault();
        bootbox.dialog({
            title: "Confirm Cancellation",
            message: "Are you sure you want to cancel your session?",
            buttons: {
                'NO, I don\'t want to cancel my session': {
                    className: 'btn btn-default',
                    callback: function() {
                        return false;
                    }
                },
                'Yes, cancel my session': {
                    className: 'btn-danger',
                    callback: function() {
                        let sid = FlowRouter.getParam('sessid');
                        Meteor.call('sessions.cancelsession', sid, function(error) {
                            if (error) {
                                console.log(error);
                            } else {
                                bootbox.alert('Your session has been cancelled.');
                                Meteor.call('email.markCanceled', sid);
                            }
                        });
                    }
                },
            },
            onEscape: function() {} // allows for esc to close modal
        });
    },
    'click #demobtn' (event) {
        event.preventDefault();
        var tour = {
            showCloseButton: false,
            id: "custsessdtour",
            i18n:{stepNums: ["", "", "", "", "", "", ""]},
            steps: [
            {
                content: "View Session details in this window; go to the previous/next session (if the session is part of a multi-session booking) with these buttons.",
                target: ".nextprevbtn",
                placement: "left"
            },
            {
                content: "View details for the corresponding booking here. Click this link to view all sessions in the corresponding booking.",
                target: ".bookingidhdr",
                placement: "top"
            },
            {
                content: "View, add, or edit any remarks if needed. Both customers and vendors can utilize this section.",
                target: ".remarkshdr",
                placement: "bottom"
            }
            ]
        };
        hopscotch.startTour(tour);
    },
    'click .btn-cancel-sub' (event) {
        event.preventDefault();
        bootbox.confirm({
            message: 'Are you sure you want to cancel your subscription? You might not be able to book the same time slot in the future.',
            size: 'small',
            buttons: {
                confirm: {
                    label: "Yes, cancel it",
                    className: "btn-danger"
                },
                cancel: {
                    label: "No",
                    className: "btn-default"
                }
            },
            callback: function(result) {
                if (result) {
                    console.log(result);
                    Meteor.call('bookings.stopSubscription', event.target.id, function(error) {
                        if (error) {
                            console.log(error);
                        };
                    });
                }
            },
            onEscape: function() {}
        });
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



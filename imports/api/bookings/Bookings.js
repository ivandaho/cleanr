import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Sessions } from '../sessions/Sessions.js';
import { Vendorslots } from '../vendorslots/Vendorslots.js';
import { Timeslots } from '../timeslots/Timeslots.js';
import { Notifications } from '../notifications/Notifications.js';

export const Bookings = new Mongo.Collection('bookings');

BookingsSchema = new SimpleSchema({
    subdate: {
        type: Date,
        label: "Submitted date",
               /*
        autoValue: function() {
            return new Date()
        },
        */
        autoform: {
            type: "hidden"
        },
    },
    custID: {
        type: String,
        autoValue: function() {
            return this.userId
        },
        autoform: {
            type: "hidden"
        }
    },
    packageID: {
        type: Number,
        label: "package id number"
    },
    jobstatus: {
        type: Number
        // 0 - SUBSCRIPTION INACTIVE
        // 1 - SUBSCRIPTION ACTIVE
        // 2 - SINGLE SESSION

        // shouldnt be able to rebook (schedule conflicts)

        // TODO: when vendor marks a session as complete, it will check
        // the booking for jobstatus and change it accordingly
    },
    mc: {
        type: Boolean
    },
    cc: {
        type: Boolean
    },
    timeslot: {
        type: Number
    },
    day: {
        type: String
    }
});

Bookings.attachSchema(BookingsSchema);

Meteor.methods({
    'bookings.pending' (date, package) {
        /*
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        FlowRouter.go('/confirmation');
        */
    },
    'bookings.insert'(date, slot, repeat, mc, cc){
        // handle session generation
        var sess = [];
        // push into array
        // check for weekly schedule
        var y = 0;
        if (repeat) {
            y = 3;
        }

        var error = false;

        for (var x = 0; x <= y; x++) { // generate for 3 more weeks
            if (!error) {
                var newdate = moment.utc(date).add(x, 'weeks').toDate();
                var found = Vendorslots.find({d: newdate, s: slot})
                var onesess = Meteor.call('sessions.createSession',
                        newdate, slot, this.userId, 1, 0, '--', null);

                if (onesess == null) {
                    //TODO: add warning to client user
                    // no vendor available for that slot
                    error = true;
                } else {
                    sess.push(onesess);
                }
            } else {
                // catch problem
            }
        }
        // process mattress cleaning and carpet cleaning
        if (!error) {
            var pmc;
            var pcc;
            if (mc == undefined) {
                pmc = false;
            } else {
                pmc = mc;
            }
            if (cc == undefined) {
                pcc = false;
            } else {
                pcc = cc;
            }
            // create doc for booking
            var daystr = moment.utc(date).clone().format('ddd').toLowerCase();
            var js; // weekly subscription
            if (repeat) {
                js = 1; // subscription active
            } else {
                js = 2 // single booking
            }
            var doc = {packageID: 1,
                    jobstatus: js,
                    mc: pmc,
                    cc: pcc,
                    timeslot: parseInt(slot),
                    day: daystr,
                    subdate: new Date()
                  }

            // create booking
            let bid = Bookings.insert(doc);

            // get bookingID
            var bookingid = Bookings.findOne(doc)._id;

            // each Booking

            // add Sessions
            var sids = [];

            sess.forEach(function(each) {
                // add booking id into session array
                each.bookingID = bookingid;
                // add to session Collection
                let sx = Sessions.insert(each);
                sids.push(sx);
                // CONTINUE:

                // COMMENTED OUT FOR EASY DEV PROCESS
                // remove vendorslot
                // Vendorslots.remove({
                //     ownerID: each.vendorID,
                //     d: each.date,
                //     s: each.timeslot
                //     });

                // send notification
                Notifications.insert({
                    createdDate: moment.utc().toDate(),
                    uid: each.vendorID,
                    type: 0,
                    sid: sx,
                    seen: false
                });

            });
            const returnobj = {
                b: bid,
                s: sids
            };
            return returnobj;
        } else {
            var able = sess.length;
            var sessword = 'sessions';
            var slotstr = Timeslots.findOne({num: parseInt(slot)}).slot;
            var day = moment.utc(date).format('dddd');
            if (able == 1) {
                var sessword =  'session';
            }

            // TODO: make proper messages.
            var msg = 'We were only able to schedule ' + sess.length +
                ' ' + sessword +
                    ' for the ' + slotstr + ' slot on ' + day + 's. ' +
                    'Do you want to proceed with ' + able +
                    ' scheduled ' + sessword + ' for this booking?' +
                    ' (We will not renew your subscription after.)';
            console.log(msg);

        }

        // LATER:
        // notify vendor
    },
    'bookings.reSubscribe' (bid) {
        // find the booking
        var thebooking = Bookings.findOne({_id: bid});

        if (thebooking.custID == Meteor.userId()) {
            // booking's owner is the logged in customer. ok to resub
            var newstatus;

            if (thebooking.jobstatus == 0) {
                newstatus = 2;
            } else if (thebooking.jobstatus == 1) {
                newstatus = 3;
            }
            Bookings.update(thebooking, {$set: {jobstatus: newstatus}});
        }
    },
    'bookings.stopSubscription' (bid) {
        // find the booking
        var thebooking = Bookings.findOne({_id: bid});

        if (thebooking.custID == Meteor.userId()) {
            // booking's owner is the logged in customer. ok to cancel
            var newstatus;

            if (thebooking.jobstatus == 2) {
                throw new Meteor.Error('custom', 'Unable to cancel a single session booking');
            } else if (thebooking.jobstatus == 1) {
                newstatus = 0;
            }
            Bookings.update(thebooking, {$set: {jobstatus: newstatus}});
        }
    },
});

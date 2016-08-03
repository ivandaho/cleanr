import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Sessions } from '../sessions/Sessions.js';

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
    sessionIDs: {
        type: [String]
    },
    jobstatus: {
        type: Number,
        label: "0 = unpaid, 1 = paid, 2 = scheduled, 3 = all sessions completed"
    },
    mc: {
        type: Boolean
    },
    cc: {
        type: Boolean
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
        // TODO: parse date slot for weekly sessions, with repeat var
        // TODO: assign vendor

        // LATER:
        // notify vendor

        var pmc;
        var pcc;
        if (mc == undefined) {
            pmc = false;
        }
        if (mc == undefined) {
            pcc = false;
        }
        var doc = {packageID: 1,
                sessionIDs: [],
                jobstatus: 1,
                mc: pmc,
                cc: pcc,
                subdate: new Date()
              }

        Bookings.insert(doc);
        /*
            packageID: 1,
            sessionIDs: [],
            jobstatus: 1,
            mc: pmc,
            cc: pcc
        });
            */
        var found = Bookings.findOne(doc);
        //console.log(found);

        var bookingid = found._id;

        // handle session generation
        var sess = [];
        var sessids = [];

        // create one session
        var firstsess = Meteor.call('sessions.createSession',
                date, slot, this.userId, 1, bookingid, 0, '--');
        /*
        var firstsess = {
            date: date,
            timeslot: slot,
            custID: this.userId,
            packageID: 1,
            bookingID: bookingid,
            sessionstatus: 0,
            feedback: '--'
        };
        */
        // push into array
        sess.push(firstsess);
        // check for weekly schedule
        if (repeat) {
            for (var x = 1; x < 4; x++) {
                var newdate = moment(date).add(x, 'weeks').toDate();
                var anothersess = Meteor.call('sessions.createSession',
                        newdate, slot, this.userId, 1, bookingid, 0, '--');
                sess.push(anothersess);
            }
        }
        // for each item in array
        sess.forEach(function(each) {
            // add to session Collection
            Sessions.insert(each);
            // find that item in the Collection, and get the _id
            sessids.push(Sessions.findOne(each)._id);
            // push the _id into a new array
            });
        
        // assign vendor

        // udate the booking with session ids
        Bookings.update(doc, {$set: {sessionIDs: sessids}});

    },
    'bookings.single'(){
        FlowRouter.go('/confirmation');
    },
    'bookings.weekly'(){
        FlowRouter.go('/confirmation');
    },
});

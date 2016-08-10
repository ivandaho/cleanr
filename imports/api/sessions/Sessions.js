import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Vendorslots } from '../vendorslots/Vendorslots.js';

export const Sessions = new Mongo.Collection('sessions');

Sessions.allow({
    // if userId exists, means we are signed in, and able to insert
    insert: function(userId, doc) {
        return !!userId;
    }
});

SessionSchema = new SimpleSchema({
    date: {
        type: Date
    },
    timeslot: {
        type: Number
    },
    custID: {
        type: String
    },
    packageID: {
        type: Number
    },
    vendorID: {
        type: String
    },
    bookingID: {
        type: String
    },
    sessionstatus: {
        type: Number,
        label: "0 = not yet completed, 1 = completed, 2 = warn"
    },
    feedback: {
        type: String
    }
});

Sessions.attachSchema(SessionSchema);

Meteor.methods({
    'sessions.markNotCompleted' (sid) {
        // check if vendor is authorized
        var thesession = Sessions.findOne({_id: sid});

        if (thesession.vendorID == Meteor.userId()) {
            var newstatus = 0;

            // "0 = not yet completed, 1 = completed, 2 = warn"
            Sessions.update(thesession, {$set: {sessionstatus: newstatus}});
        }
    },
    'sessions.markCompleted' (sid) {
        // check if vendor is authorized
        var thesession = Sessions.findOne({_id: sid});

        if (thesession.vendorID == Meteor.userId()) {
            var newstatus = 1;

            // "0 = not yet completed, 1 = completed, 2 = warn"
            Sessions.update(thesession, {$set: {sessionstatus: newstatus}});
        }
    },
    'sessions.createSession' (dt, st, c, p, ss, f, b) {
        // date, slot, custID, packageID, vendorID, sessionstatus, feedback, bid
        var v;
        // find available vendors

    // default slot string
    // // dss = moment(dt).format('ddd').toLowerCase() + ' ' + st;
        var avds = [];
        Vendorslots.find({d: dt, s:parseInt(st)}).forEach(function (each) {
            avds.push(each);
        })

        if (avds.length < 1) {
            // no vendors found on that date. abort
            return null;
        }

        // sets vendor to a random available vendor.
        // TODO: algorithm based on recent Sessions
        v = avds[Math.floor(Math.random()*avds.length)];
        var doc = {};
        if (b != null) {
            doc = {
                date: dt,
                timeslot: st,
                custID: c,
                packageID: p,
                vendorID: v.ownerID,
                sessionstatus: ss,
                feedback: f,
                bookingID: b
            };
        } else {
            doc = {
                date: dt,
                timeslot: st,
                custID: c,
                packageID: p,
                vendorID: v.ownerID,
                sessionstatus: ss,
                feedback: f
            };
        }
        return doc;
    },
});

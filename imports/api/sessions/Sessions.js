import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Vendorslots } from '../vendorslots/Vendorslots.js';
import { Notifications } from '../notifications/Notifications.js';

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
        label: "0 = not yet completed, 1 = completed, 2 = cancelled"
    },
    feedback: {
        type: String
    },
    custremarks: {
        type: [String]
    },
    vendremarks: {
        type: [String]
    }
});

Sessions.attachSchema(SessionSchema);

Meteor.methods({
    'sessions.cancelsession' (sid) {
        var thesession = Sessions.findOne({_id: sid});

        if (thesession.custID == Meteor.userId()) {
            // customer is the one that booked the session
            var newstatus = 2;

            // "0 = not yet completed, 1 = completed, 2 = cancelled"
            Sessions.update(thesession, {$set: {sessionstatus: newstatus}});
        }
    },
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

            // insert notification for customer
            Notifications.insert({
                createdDate: moment.utc().toDate(),
                uid: thesession.custID,
                type: 1,
                sid: thesession._id,
                seen: false
            });

        }
    },
    'sessions.createSession' (dt, st, c, p, ss, f, b, cr, vr) {
        // date, slot, custID, packageID, vendorID, sessionstatus, feedback, bid
        // custremarks, vendremarks
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
                bookingID: b,
                custremarks: [],
                vendremarks: []
            };
        } else {
            doc = {
                date: dt,
                timeslot: st,
                custID: c,
                packageID: p,
                vendorID: v.ownerID,
                sessionstatus: ss,
                feedback: f,
                custremarks: [],
                vendremarks: []
            };
        }
        return doc;
    },
    'sessions.custEditComment' (sid, oldcomment, newcomment) {
        var thesess = Sessions.findOne(sid);
        if (thesess.custID == Meteor.userId()) {
            // current user authorized as customer of the session
            console.log('trying to edit this cust comment');
            Sessions.update({_id: sid,
                            custremarks:
                                {$in: [oldcomment]}
                            },
                            {$set:
                                {"custremarks.$": newcomment}
                            });
        }
    },
    'sessions.vendEditComment' (sid, oldcomment, newcomment) {
        var thesess = Sessions.findOne(sid);
        if (thesess.vendorID == Meteor.userId()) {
            // current user authorized as vendor of the session
            Sessions.update({_id: sid,
                            vendremarks:
                                {$in: [oldcomment]}
                            },
                            {$set:
                                {"vendremarks.$": newcomment}
                            });
        }
    },
    'sessions.custDeleteComment' (sid, comment) {
        var thesess = Sessions.findOne(sid);
        if (thesess.custID == Meteor.userId()) {
            Sessions.update(thesess, {$pull: {custremarks: comment}});
        }
    },
    'sessions.vendDeleteComment' (sid, comment) {
        var thesess = Sessions.findOne(sid);
        if (thesess.vendorID == Meteor.userId()) {
            Sessions.update(thesess, {$pull: {vendremarks: comment}});
        }
    },
    'sessions.custAddComment' (sid, comment) {
        var thesess = Sessions.findOne(sid);
        if (thesess.custID == Meteor.userId()) {
            Sessions.update(thesess, {$push: {custremarks: comment}});
        }
    },
    'sessions.vendAddComment' (sid, comment) {
        var thesess = Sessions.findOne(sid);
        if (thesess.vendorID == Meteor.userId()) {
            Sessions.update(thesess, {$push: {vendremarks: comment}});
        }
    },

});

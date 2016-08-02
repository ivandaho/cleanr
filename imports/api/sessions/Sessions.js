import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

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


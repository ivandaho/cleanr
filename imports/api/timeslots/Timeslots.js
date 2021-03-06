import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Timeslots = new Mongo.Collection('timeslots');

Timeslots.allow({
    // if userId exists, means we are signed in, and able to insert
    insert: function(userId, doc) {
        return !!userId;
    }
});

TimeslotsSchema = new SimpleSchema({
    slot: {
        type: String
    },
    num: { 
        type: Number
    },
    timestart: {
        type: String
    },
    timeend: {
        type: String
    },
});

Timeslots.attachSchema(TimeslotsSchema);


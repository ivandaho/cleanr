import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Generatedweeks = new Mongo.Collection('generatedweeks');

Generatedweeks.allow({
    // if userId exists, means we are signed in, and able to insert
    insert: function(userId, doc) {
        return !!userId;
    }
});

DaySchema = new SimpleSchema({
    d: {
        type: String
    },
    free: {
        type: Number
    }
});
TimeslotsSchema = new SimpleSchema({
    slot: {
        type: String
    },
    days: { 
        type: [DaySchema]
    }
});


GeneratedweeksSchema = new SimpleSchema({
    mondayDate: {
        type: Date
    }
});

Generatedweeks.attachSchema(GeneratedweeksSchema);


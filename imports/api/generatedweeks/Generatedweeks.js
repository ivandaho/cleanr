import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Generatedweeks = new Mongo.Collection('generatedweeks');

GeneratedweeksSchema = new SimpleSchema({
    mondayDate: {
        type: Date
    }
});

Generatedweeks.attachSchema(GeneratedweeksSchema);


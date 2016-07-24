import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Packages = new Mongo.Collection('packages');

PackageSchema = new SimpleSchema({
    date: {
        type: Date,
        autoform: {
            type: "bootstrap-datepicker"
        }
    },
    desc: {
        type: String,
        label: "Description"
    }
});

Packages.attachSchema(PackageSchema);


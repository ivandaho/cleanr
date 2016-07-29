import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Vendorslots = new Mongo.Collection('vendorslots');

VendorslotsSchema = new SimpleSchema({
    d: {
        type: Date
    },
    s: {
        type: Number
    },
    ownerID: {
        type: String
    }
});

Vendorslots.attachSchema(VendorslotsSchema);

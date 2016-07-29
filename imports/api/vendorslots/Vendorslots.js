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

Meteor.methods({
    'vendorslots.addSlot' (date, slot) {
        Vendorslots.insert({
            d: date,
            s: slot,
            ownerID: Meteor.userId()
        });
    },
    'vendorslots.removeSlot' (date, slot) {
        var doc = Vendorslots.findOne({
            d: date,
            s: parseInt(slot),
            ownerID: Meteor.userId()
        })
        if (doc) {
            Vendorslots.remove(doc);
            } else {
                console.log('cant find, cant remove!');
        }
    },
});

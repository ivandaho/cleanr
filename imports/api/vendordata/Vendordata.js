import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Vendordata = new Mongo.Collection('vendordata');

VendordataSchema = new SimpleSchema({
    ownerID: {
        type: String
    },
    defaultSlots: {
        type: [String]
    },
    recentSessions: {
        type: Number
    },
});

Vendordata.attachSchema(VendordataSchema);

Meteor.methods({
    'vendordata.pushSlots' (slots) {
        doc = Vendordata.findOne({ownerID: this.userId});
        doc ? Vendordata.update({_id: doc._id},
            {$set: {defaultSlots: slots}}):
            Vendordata.insert({
                ownerID: this.userId,
                defaultSlots: slots
            });

    },
    'vendordata.updateSlots' (data) {
        // get doc for current logged in vendor
        doc = Vendordata.findOne({ownerID: this.userId});
        //console.log(doc.vendorWeeks);
        doc.vendorWeeks.forEach(function(vendorweek) {
            // traverses each week data
            vendorweek.timeslots.forEach(function(timeslot) {
                // traverses each timeslot data
                timeslot.days.forEach(function(dayoftimeslot) {
                    // traverses each day of each timeslot
                });
            });
        });
            /*
        doc ? Vendordata.update({_id: doc._id},
            {$set {vendorWeeks: slots
            */

    },
});

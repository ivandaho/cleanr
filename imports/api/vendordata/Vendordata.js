import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Vendordata = new Mongo.Collection('vendordata');

import { Vendorslots } from '/imports/api/vendorslots/Vendorslots.js';
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
    'vendordata.releaseSchedule' () {
        //script to create weeks data. does not handle updates from vendors, only initial creations

        if (Meteor.user().profile.donesetup == true) {
            return;
        } else {
            vend = Vendordata.findOne({ownerID:Meteor.userId()});
            var today = moment();
            var y = 5; // how many weeks in advance
            var twm = today.clone().startOf('week').add(1,'day'); // this week monday
            for (var w = 0; w <= y; w++) {
                // for each week...
                var ywm = twm.clone().add(w, 'weeks'); // y week monday
                var jywm = ywm.clone().toDate(); // java Date y week monday
                // generate 7 days, starting from the monday of that week.
                for (var x = 0; x < 7; x++) {

                    var currday = moment(jywm).clone().add(x, 'days'); // start from...

                    vend.defaultSlots.forEach(function(slot) {
                        // for each slot
                        var daystring = slot.substring(0,3); // day
                        if (daystring == currday.clone().format('ddd').toLowerCase()) {
                            // if its the wanted day of the week
                            var slotstring = slot.substring(4,5);
                            var slotforinsert = parseInt(slotstring);
                            var csd = currday.clone().toDate();

                            Vendorslots.insert({
                                d: csd,
                                s: slotforinsert,
                                ownerID: vend.ownerID
                            });
                        };
                    });
                };
            }
            Meteor.users.update({_id: Meteor.userId()},
                    {$unset: {profile: {} }
                    });
        } // end if 
    },
    'vendordata.pushSlots' (slots) {
        doc = Vendordata.findOne({ownerID: this.userId});
        doc ? Vendordata.update({_id: doc._id},
            {$set: {defaultSlots: slots}}):
            Vendordata.insert({
                ownerID: this.userId,
                defaultSlots: slots,
                recentSessions: 0
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

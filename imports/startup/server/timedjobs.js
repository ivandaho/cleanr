import { Vendordata } from '/imports/api/vendordata/Vendordata.js';
import { Vendorslots } from '/imports/api/vendorslots/Vendorslots.js';
import { Generatedweeks } from '/imports/api/generatedweeks/Generatedweeks.js';

import { Bookings } from '/imports/api/bookings/Bookings.js';
import { Sessions } from '/imports/api/sessions/Sessions.js';

var later = require('later');

SyncedCron.add({
    name: 'test new named sc job',
    schedule: function(parser) {
        return parser.text('at 3:00 am every Monday');
        // return parser.text('every 15 seconds'); for debug
    },
    job: function() {
        timed_UpdateWeeks();
    }
});

// SyncedCron.add({
//     name: 'removeOldVendorslots',
//     schedule: function(parser) {
//         return parser.text('at 3:00 am every Thursday');
//     },
//     job: function() {
//         removeOldVendorslots();
//     }
// });

SyncedCron.add({
    name: 'sendOutCustomerSessionReminders',
    schedule: function(parser) {
        return later.parse.recur().on('00:00:00').time();
        // return parser.text('every 15 seconds'); for debug
        // return parser.text('every 15 seconds'); for debug
    },
    job: function() {
        sendOutCustomerSessionReminders();
    }
});
SyncedCron.add({
    name: 'sendOutVendorSessionUnmarkedReminders',
    schedule: function(parser) {
        return later.parse.recur().on('22:00:00').time();
    },
    job: function() {
        sendOutVendorSessionUnmarkedReminders();
    }
});

SyncedCron.config({
    log: false
});
SyncedCron.start();

const removeOldVendorslots = function() {
    let date = moment.utc().subtract(10, 'w').toDate();
    Vendorslots.remove({d : {$lt: date}});
    console.log('removing old vendorslots');
};

const sendOutVendorSessionUnmarkedReminders = function() {
    let today = moment.utc().startOf('day').toDate();
    let allsessions = Sessions.find({date: {$lte: today}}, {sort: {date: 1}});
    allsessions.forEach(function (asess) {
        if (asess.sessionstatus == 0) {
            Meteor.call('notifications.createReminderVendorSessionUnmarked', asess);
            // Meteor.call('email.sessionReminder', asess);
        }
    });
};

const sendOutCustomerSessionReminders = function() {
    let next = moment.utc().startOf('day').add(2, 'day').toDate();
    var allsessions = Sessions.find({date: {$eq: next}}, {sort: {date: 1}});
    allsessions.forEach(function (asess) {
        Meteor.call('email.sessionReminder', asess);
    });
};

var timed_UpdateWeeks = function() {

    //script to create weeks data. does not handle updates from vendors, only initial creations

    vd = Vendordata.find({});
    // vd = Vendordata.find({_id: "6WXGGorhWRTGvdEfW"});

    var today = moment.utc();
    var y = 5; // how many weeks in advance
    var twm = today.clone().startOf('week').add(1,'day'); // this week monday
    for (var w = 0; w <= y; w++) {
        // for each week...
        var ywm = twm.clone().add(w, 'weeks'); // y week monday
        var jywm = ywm.clone().toDate(); // java Date y week monday
        // generate 7 days, starting from the monday of that week.
        var thisweekadded = false;
        for (var x = 0; x < 7; x++) {

            var currday = moment.utc(jywm).clone().add(x, 'days'); // start from...
            if (x == 0) {
                gi = Generatedweeks.find({mondayDate: currday.clone().toDate()});
                // if found one of this week
                // TODO: check if can change to findOne() instead of find()
                gi.forEach(function (item) {
                    thisweekadded = true;
                });
            }

            if (!thisweekadded) {
                console.log('generating for ' + currday.format('YYYY-MM-DD'));
                // if still need to generate for this week
                vd.forEach(function(vend) {
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
                    }); // foreach slot
                }); // foreach vend

                // settle subs and sessions
                // find subs on that day
                var subs = Bookings.find({jobstatus: 1,
                    day: currday.clone().format('ddd').toLowerCase(),
                });
                subs.forEach(function (sub) {
                    // create a session
                    var dt = currday.clone().toDate();
                    var st = parseInt(sub.timeslot);
                    var c = sub.custID;
                    var p = 1;
                    var ss = 0;
                    var f = '--';
                    var onesess = Meteor.call('sessions.createSession', dt, st, c, p, ss, f, sub._id);
                    // get the _id of the inserted session
                    // for use when notifying vendor about new assigned session
                    let sx = Sessions.insert(onesess);

                    Vendorslots.remove({
                        ownerID: onesess.vendorID,
                        d: onesess.date,
                        s: onesess.timeslot
                    });

                    Notifications.insert({
                        createdDate: moment.utc().toDate(),
                        uid: onesess.vendorID,
                        type: 0,
                        sid: sx,
                        seen: false
                    });
                });
                if (x == 0) {
                    Generatedweeks.insert({
                        mondayDate: currday.clone().toDate()});
                }
            }
        }; // for each daytogenerate
    }
    return;
};

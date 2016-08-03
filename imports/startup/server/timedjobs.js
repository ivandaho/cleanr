import { Vendordata } from '/imports/api/vendordata/Vendordata.js';
import { Vendorslots } from '/imports/api/vendorslots/Vendorslots.js';
import { Generatedweeks } from '/imports/api/generatedweeks/Generatedweeks.js';

SyncedCron.add({
    name: 'test new named sc job',
    schedule: function(parser) {
        return parser.text('at 3:00 am every Monday');
    },
    job: function() {
        timed_UpdateWeeks();
    }
});

SyncedCron.config({
    log: false
});
SyncedCron.start();


var timed_UpdateWeeks = function() {

    //script to create weeks data. does not handle updates from vendors, only initial creations

    vd = Vendordata.find({});
    // vd = Vendordata.find({_id: "6WXGGorhWRTGvdEfW"});
    
    var today = moment();
    var y = 5; // how many weeks in advance
    var twm = today.clone().startOf('week').add(1,'day'); // this week monday
    for (var w = 0; w <= y; w++) {
        // for each week...
        var ywm = twm.clone().add(w, 'weeks'); // y week monday
        var jywm = ywm.clone().toDate(); // java Date y week monday
        // generate 7 days, starting from the monday of that week.
        var thisweekadded = false;
        for (var x = 0; x < 7; x++) {

            var currday = moment(jywm).clone().add(x, 'days'); // start from...
            if (x == 0) {
                gi = Generatedweeks.find({mondayDate: currday.clone().toDate()});
                // if found one of this week
                gi.forEach(function (item) {
                    thisweekadded = true;
                });
            }

            if (!thisweekadded) {
                vd.forEach(function(vend) {
                    vend.defaultSlots.forEach(function(slot) {
                        var daystring = slot.substring(0,3); // day
                        if (daystring == currday.clone().format('ddd').toLowerCase()) {
                            // its the wanted day of the week
                            var slotstring = slot.substring(4,5);
                            Vendorslots.insert({
                                d: currday.clone().toDate(),
                                s: parseInt(slotstring),
                                ownerID: vend.ownerID
                            });
                        };
                    }); // foreach slot
                }); // foreach vend

                if (x == 0) {
                    Generatedweeks.insert({
                        mondayDate: currday.clone().toDate()});
                }
            }
        }; // for each daytogenerate
    }
    return;
};

import { Timeslots } from '/imports/api/timeslots/Timeslots.js';

    var refreshslots = false;

    if (refreshslots) {
        console.log('refreshing Timeslots');
        Timeslots.remove({})
        Timeslots.insert({slot: "0800 to 1000", num: 1});
        Timeslots.insert({slot: "1000 to 1200", num: 2});
        Timeslots.insert({slot: "1200 to 1400", num: 3});
        Timeslots.insert({slot: "1400 to 1600", num: 4});
        Timeslots.insert({slot: "1600 to 1800", num: 5});
    }

import { Timeslots } from '/imports/api/timeslots/Timeslots.js';

    var refreshslots = true;

    if (refreshslots) {
        console.log('refreshing Timeslots');
        Timeslots.remove({});
        ts1 = moment({hour: 8, minute: 00}).format('HHmm');
        te1 = moment({hour: 10, minute: 00}).format('HHmm');

        ts2 = moment({hour: 10, minute: 00}).format('HHmm');
        te2 = moment({hour: 12, minute: 00}).format('HHmm');

        ts3 = moment({hour: 12, minute: 00}).format('HHmm');
        te3 = moment({hour: 14, minute: 00}).format('HHmm');

        ts4 = moment({hour: 14, minute: 00}).format('HHmm');
        te4 = moment({hour: 16, minute: 00}).format('HHmm');

        ts5 = moment({hour: 16, minute: 00}).format('HHmm');
        te5 = moment({hour: 18, minute: 00}).format('HHmm');

        Timeslots.insert({slot: "0800 to 1000", num: 1, timestart: ts1, timeend: te1});
        Timeslots.insert({slot: "1000 to 1200", num: 2, timestart: ts2, timeend: te2});
        Timeslots.insert({slot: "1200 to 1400", num: 3, timestart: ts3, timeend: te3});
        Timeslots.insert({slot: "1400 to 1600", num: 4, timestart: ts4, timeend: te4});
        Timeslots.insert({slot: "1600 to 1800", num: 5, timestart: ts5, timeend: te5});
    }

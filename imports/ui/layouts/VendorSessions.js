import './VendorSessions.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ReactiveDict } from 'meteor/reactive-dict';

import { Userdata } from '../../api/userdata/Userdata.js';
import { Bookings } from '../../api/bookings/Bookings.js';
import { Sessions } from '../../api/sessions/Sessions.js';

Template.VendorSessions.onCreated(function VendorSessionsOnCreated() {
    var mdate = moment.utc().startOf('week').add(1, 'days'); // this week's monday
    var jdate = mdate.toDate();
    Session.set('currweek', jdate);
    sm.subscribe('userdata');
    sm.subscribe('bookings');
    sm.subscribe('sessions');
    sm.subscribe('timeslots');

    this.state = new ReactiveDict();
    const instance = Template.instance;
    this.state.set('upc', true);
    this.state.set('pre', true);
    this.state.set('com', true);
    // var today = moment.utc().startOf('day').toDate();
});

let today = moment.utc().startOf('day').toDate();

Template.VendorSessions.helpers({
    completed(sessstatus) {
        if (sessstatus == 1) {
            return 'table-completed';
        }
        return false;
    },
    datecss(date) {
        if (date < today) {
            // date is today or later
            return 'table-past-date';
        }
        else if (date.getTime() === today.getTime()) {
            return 'table-today';
        } else {
            return 'table-upcoming-date';
        }
    },
    sessionfound() {
        const instance = Template.instance();
        const today = moment.utc().startOf('day').toDate();
        // sessionstatus = 1 means completed
        const previousCom = {vendorID: Meteor.userId(), date: {$lt: today}};
        const previousNoCom = {vendorID: Meteor.userId(), date: {$lt: today}, sessionstatus: {$nin: [1]}};
        const upcomingCom = {vendorID: Meteor.userId(), date: {$gt: today}};
        const upcomingNoCom = {vendorID: Meteor.userId(), date: {$gte: today}, sessionstatus: {$nin: [1]}};
        var options = [{vendorID: Meteor.userId(), date: today}];

        if (instance.state.get('pre')) {
            if (instance.state.get('com')) {
                options.push(previousCom);
            } else {
                options.push(previousNoCom);
            }
        };
        if (instance.state.get('upc')) {
            if (instance.state.get('com')) {
                options.push(upcomingCom);
            } else {
                options.push(upcomingNoCom);
            }
        };

        const query = {
            $or: options
        };

        const thesesses = Sessions.find(query,{sort: {date: -1, timeslot: 1}});
        return thesesses;
    },
    sessstatus(i) {
        if (i === 0) {
            return 'Not completed';
        } else if (i === 1) {
            return 'Completed';
        } else if (i === 2) {
            return 'Cancelled';
        }
    }
});

Template.VendorSessions.events({
    'change #upc'(event, instance) {
        instance.state.set('upc', event.target.checked);
    },
    'change #pre'(event, instance) {
        instance.state.set('pre', event.target.checked);
    },
    'change #com'(event, instance) {
        instance.state.set('com', event.target.checked);
    },
    'click .jumpTo'(event) {
        event.preventDefault();
        var sdf =  $(".table-today").offset().top;
        console.log(sdf);
        $(".table-today").velocity("scroll", {
            duration:400,
            offset: -65
        });
    }

});

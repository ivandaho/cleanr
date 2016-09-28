import './CustomerSessions.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ReactiveDict } from 'meteor/reactive-dict';

import { Userdata } from '../../api/userdata/Userdata.js';
import { Bookings } from '../../api/bookings/Bookings.js';
import { Sessions } from '../../api/sessions/Sessions.js';

Template.CustomerSessions.onCreated(function CustomerSessionsOnCreated() {
    var mdate = moment.utc().startOf('week').add(1, 'days'); // this week's monday
    var jdate = mdate.toDate();
    Session.set('currweek', jdate);
    Meteor.subscribe('userdata');
    Meteor.subscribe('bookings');
    Meteor.subscribe('sessions');
    Meteor.subscribe('timeslots');

    this.state = new ReactiveDict();
    const instance = Template.instance;
    this.state.set('upc', true);
    this.state.set('pre', true);
    this.state.set('com', true);
});

Template.CustomerSessions.helpers({
    sessionfound() {
        const instance = Template.instance();
        const today = moment.utc().startOf('day').toDate();
        // sessionstatus = 1 means completed
        const previousCom = {custID: Meteor.userId(), date: {$lt: today}};
        const previousNoCom = {custID: Meteor.userId(), date: {$lt: today}, sessionstatus: 0};
        const upcomingCom = {custID: Meteor.userId(), date: {$gte: today}};
        const upcomingNoCom = {custID: Meteor.userId(), date: {$gte: today}, sessionstatus: 0};
        var options = [{cantfindme: 'cantfindmeeither'}];

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

Template.CustomerSessions.events({
    'change #upc'(event, instance) {
        instance.state.set('upc', event.target.checked);
    },
    'change #pre'(event, instance) {
        instance.state.set('pre', event.target.checked);
    },
    'change #com'(event, instance) {
        console.log('test');
        instance.state.set('com', event.target.checked);
    }
});

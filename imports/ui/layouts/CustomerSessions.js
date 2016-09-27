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
    textfilter() {
        const instance = Template.instance();
        var re = new RegExp(instance.state.get('filtertext'), "ig");
        const today = moment.utc().startOf('day').toDate();
        const previous = {custID: Meteor.userId(), date: {$lt: today}};
        const upcoming = {custID: Meteor.userId(), date: {$gte: today}};
        var options = [{cantfindme: 'cantfindmeeither'}];

        if (instance.state.get('pre')) {
            options.push(previous);
        };
        if (instance.state.get('upc')) {
            options.push(upcoming);
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
    // findsession(cust, s) {
    //     // search for most recent COMPLETED session
    //     var fs = Sessions.find({custID: cust._id,
    //         sessionstatus: s}, {sort: {date: -1}}) || {};
    //     var arr = [];
    //     fs.forEach(function(item) {
    //         arr.push(item);
    //     });

    //     if (arr.length > 0) {
    //         return moment.utc(arr[0].date).format('YYYY-MM-DD');
    //     }
    //     return 'None found';
    // },
});

Template.CustomerSessions.events({
    'change #upc'(event, instance) {
        instance.state.set('upc', event.target.checked);
    },
    'change #pre'(event, instance) {
        instance.state.set('pre', event.target.checked);
    },
    'change #com'(event, instance) {
        instance.state.set('com', event.target.checked);
    },
    'keyup .filter'(event, instance) {
        instance.state.set('filtertext', event.target.value);
    },
});

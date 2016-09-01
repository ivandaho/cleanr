import './VendorCustomerList.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ReactiveDict } from 'meteor/reactive-dict';

import { Userdata } from '../../api/userdata/Userdata.js';
import { Bookings } from '../../api/bookings/Bookings.js';
import { Sessions } from '../../api/sessions/Sessions.js';

Template.VendorCustomerList.onCreated(function VendorCustomerListOnCreated() {
    var mdate = moment.utc().startOf('week').add(1, 'days'); // this week's monday
    var jdate = mdate.toDate();
    Session.set('currweek', jdate);
    Meteor.subscribe('userdata');
    Meteor.subscribe('bookings');
    Meteor.subscribe('sessions');

    this.state = new ReactiveDict();
});

Template.VendorCustomerList.helpers({
    textfilter() {
        const instance = Template.instance();
        var re = new RegExp(instance.state.get('filtertext'), "ig");
        return Userdata.find({
            user_name: { $in: [re] }
        });
    },
    recentbooking(cust) {
        // search booking collection for customer, return booking stats
        var rb = Bookings.findOne({custID: cust._id}) || {};
        // if (rb.jobstatus == 2) { later, check for status
        var found = rb._id;
        return found;
    },
    findsession(cust, s) {
        // search for most recent COMPLETED session
        var fs = Sessions.find({custID: cust._id,
            sessionstatus: s}, {sort: {date: -1}}) || {};
        var arr = [];
        fs.forEach(function(item) {
            arr.push(item);
        });

        if (arr.length > 0) {
            return moment.utc(arr[0].date).format('YYYY-MM-DD');
        }
        return 'None found';
    },
});

Template.VendorCustomerList.events({
    /*
    'change .filter input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
    */
    'keyup .filter'(event, instance) {
        instance.state.set('filtertext', event.target.value);
    },
});

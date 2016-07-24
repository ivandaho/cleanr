import './Header.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Userdata } from '../../api/userdata/Userdata.js';

// need these for subscriptions to work../??

Template.Header.onCreated(function AccountOnCreated() {
    Meteor.subscribe('userdata');
});

Template.Header.helpers({
    userdata() {
        return Userdata.findOne({});
    },
});

Template.Header.events({
    //'click .account-info' (event) {
    'click .test-btn' (event) {
        event.preventDefault();
        bootbox.alert('test');
        //console.log('test account info clicked');
        /*
        TODO: set logic
        const target = event.target;
        const date = target.date.value;
        const package = target.package.value;
        Session.set('jobDate', date);
        Session.set('jobPackage', package);
        Meteor.call('jobs.pending', date, package);
        */
    },
});

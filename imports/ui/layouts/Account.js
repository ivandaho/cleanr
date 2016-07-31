import './Account.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// need these for subscriptions to work../??
// import { Jobs } from '../../api/jobs/Jobs.js';
// import { Sessions } from '../../api/sessions/Sessions.js';
import { Userdata } from '../../api/userdata/Userdata.js';
import './Account.html';
    //Meteor.subscribe('recipes');

Template.Account.onCreated(function AccountOnCreated() {
    Meteor.subscribe('userdata');
});

Template.Account.helpers({

    ud() {
        return Userdata;
    },
    // seems that : ()=> is unneeded, just () is fine?
    userdata() {
        return Userdata.findOne({});
    },
});

Template.Account.events({
    'click .edit-email' (event) {
        event.preventDefault();
        console.log('TODO: build popup window to edit userdata');
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
    'click .edit-tel' (event) {
        event.preventDefault();
        console.log('TODO: build popup window to edit userdata');
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
    'click .edit-address' (event) {
        event.preventDefault();
        console.log('TODO: build popup window to edit userdata');
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

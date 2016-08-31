import './Header.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';


Template.Header.onCreated(function AccountOnCreated() {
    Meteor.subscribe('userdata');
});

Template.Header.events({
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

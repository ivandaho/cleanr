import './Input.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Jobs } from '../../api/jobs/Jobs.js';
import { Sessions } from '../../api/sessions/Sessions.js';
    //Meteor.subscribe('recipes');

Template.Input.onCreated(function InputOnCreated() {
    //Meteor.subscribe('jobs');
    //Meteor.subscribe('sessions');
});

Template.Input.helpers({
    // move this into method, not secure because on client
    isAdmin() {
        console.log('is admin.');
        console.log(Meteor.userId());
        Meteor.subscribe('sessions');
        Meteor.subscribe('jobs');
        return Roles.userIsInRole(this.userId, 'admin');
        // the previous line throws a warning if this.userId() is used??
    },

});

Template.Input.events({
    'submit .inputform' (event) {
        event.preventDefault();
        const target = event.target;
        const date = target.date.value;
        const package = target.package.value;
        Session.set('jobDate', date);
        Session.set('jobPackage', package);
        Meteor.call('jobs.pending', date, package);
    },
});


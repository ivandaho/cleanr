import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Jobs } from '../../api/jobs/Jobs.js';
import '../../api/jobs/Jobs.js';
import './SessionConfirmation.html';

// this is for meteor session variables, not cleaning session
import { Session } from 'meteor/session';
import { Userdata } from '../../api/userdata/Userdata.js';

Session.set('testvar', 23);
Template.SessionConfirmation.onCreated(function sessionConfirmationOnCreated() {
  //console.log(Session.get('testvar'));
  Meteor.subscribe('jobs');
  this.state = new ReactiveDict();
  console.log(AccountsTemplates.getState());
});


Template.SessionConfirmation.helpers({
    userdata() {
        return Userdata.findOne({});
    },
    getJobDate() {
      return Session.get('jobDate');
    },
    getJobPackage() {
      return Session.get('jobPackage');
    },
    found() {
      //const instance = Template.instance();
      //console.log(instance.state.get({}));
      return Jobs.find({packageID: 2});
    },
    JobPackage() {
      return Jobs.findOne({packageID: 2});
    },
});
Template.SessionConfirmation.events({
    'submit .ip' (event) {
        event.preventDefault();
        const target = event.target;
        console.log(testvar);
    },
});

Meteor.methods({
    'confirmation.push' (package) {
       console.log('pushed');
       testvar = package;
       console.log(testvar);
    }
});

import './Registration.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Registration.helpers({
});
Template.Registration.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var accounttype = $('[name=accounttype]').val();
        profileobj = {};

        profileobj = {acc:accounttype, donesetup: false};

        var userObject = {
            email: email,
            password: password,
            profile: profileobj
        };

        var success = false;
        var lel = 'test';
        // security concern if account is created from client??
        // Meteor.call('userdata.registerNewUser');
        Accounts.createUser(userObject, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Meteor.call('sendVerificationLink', (error, response) => {
                    if (error) {
                        Bert.alert(error.reason, 'danger');
                    } else {
                        Bert.alert('Registration Successful', 'success');
                        // prompt to fill in profile
                        FlowRouter.go('/registration/step2');
                    }
                });
            }
        });

    }
});

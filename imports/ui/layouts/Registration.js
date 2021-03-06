import './Registration.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

var zxcvbn = require('zxcvbn');

Template.Registration.helpers({
});
Template.Registration.events({
    'submit form': function(event){
        event.preventDefault();
        var password = $('[name=password]').val();
        var password2 = $('[name=password2]').val();

        if (!password) {
            Bert.alert({
                icon: 'fa-warning',
                message: 'Please enter a password',
                type: 'warning-alt'
            });
            return;
        }
        if (!password2) {
            Bert.alert({
                icon: 'fa-warning',
                message: 'Please confirm your password',
                type: 'warning-alt'
            });
            return;
        }
        if (password != password2) {
            Bert.alert({
                icon: 'fa-warning',
                message: 'Passwords do not match!',
                type: 'warning-alt'
            });
            return;
        }
        if (zxcvbn(password).score < 2) {
            // failed password strength test
            Bert.alert({
                icon: 'fa-warning',
                message: 'Password too weak. Please enter a more complex password',
                type: 'warning-alt'
            });
            return;
        }
        var email = $('[name=email]').val();
        if (!email) {
            Bert.alert('E-mail field cannot be blank', 'danger');
            return;
        }
        var accounttype = $('[name=accounttype]').val();
        profileobj = {};

        profileobj = {acc:accounttype, donesetup: false};

        var userObject = {
            email: email,
            password: password,
            profile: profileobj
        };

        var success = false;
        // security concern if account is created from client??
        // also, performance/bandwidth stuff for zxcvbn checking
        // current password strength checking is done on client
        // but it also requires the js file form the server so
        // it uses 400kb more bandwidth
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

import './Registration.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Registration.helpers({
    loginredirect() {
        FlowRouter.go('/');
    }
});
Template.Registration.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var accounttype = $('[name=accounttype]').val();
        var userObject = {
            email: email,
            password: password,
            profile: {acc:accounttype},
        };

        var success = false;
        var lel = 'test';
        Meteor.call('userdata.registerNewUser', userObject, function(error){
            if (error) {
                console.log(error);
            } else {
            Meteor.loginWithPassword(email, password);
            FlowRouter.go('/registration/step2'); // prompt to fill in profile
            }
        });

    }
});

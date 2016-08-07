import './Login.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.Login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
            if (error) {
                console.log(error.reason);
            } else {
                FlowRouter.go('account');
            }
        });
    }
});

import './Resetpassword.html';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

var zxcvbn = require('zxcvbn');

Template.Resetpassword.events({
    'submit form': function(event){
        event.preventDefault();
        var token = FlowRouter.getParam('token');
        var newpw = $('[name=newpw]').val();
        var newpw2 = $('[name=newpw2]').val();

        if (newpw != newpw2) {
            Bert.alert('Passwords do not match!', 'danger');
            return;
        }
        if (zxcvbn(newpw).score < 2) {
            // failed password strength test
            Bert.alert({
                icon: 'fa-warning',
                message: 'Password too weak. Please enter a more complex password',
                type: 'warning-alt'
            });
            return;
        }

        Accounts.resetPassword(token, newpw, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('Password changed', 'success');
                FlowRouter.go('account');
            }
        });
    }
});


import './Login.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.Login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();

        Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                if (Roles.userIsInRole(Meteor.userId(), 'customer')) {
                    FlowRouter.go('account');
                } else if (Roles.userIsInRole(Meteor.userId(), 'vendor')) {
                    FlowRouter.go('vendorcp');
                } else {
                    FlowRouter.go('account');
                }
            }
        });
    }
});

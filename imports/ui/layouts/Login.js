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
                console.log(error);
                Bert.alert(error.reason, 'danger');
            } else {
                FlowRouter.go('account');
            }
        });
    }
});

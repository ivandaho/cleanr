import './Passwordrecovery.html';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';

Template.Passwordrecovery.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();

        Accounts.forgotPassword({email: email}, (error) => {
            if (error) {
                console.log(error);
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('Recovery e-mail sent.', 'success');
                FlowRouter.go('login');
            }
        });

        // Meteor.loginWithPassword(email, password, (error) => {
        //     if (error) {
        //         console.log(error);
        //         Bert.alert(error.reason, 'danger');
        //     } else {
        //         FlowRouter.go('account');
        //     }
        // });
    }
});


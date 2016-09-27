import './Changepwd.html';
import { Template } from 'meteor/templating';

var zxcvbn = require('zxcvbn');

Template.Changepwd.events({
    'submit form': function(event){
        event.preventDefault();
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

        Meteor.call('uac.changePW', newpw, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('Password changed', 'success');
            }
        });
    }
});


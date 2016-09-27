import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    'uac.changePW' (newpw){
        if (Roles.userIsInRole(Meteor.userId(), 'fakeid')) {
            throw new Meteor.Error('fakeid', "Password changing is disabled for dummy accounts.");
        }
        Accounts.setPassword(Meteor.userId(), newpw);
    }
});

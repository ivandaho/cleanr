import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    'uac.changePW' (newpw){
        Accounts.setPassword(Meteor.userId(), newpw);
    }
});

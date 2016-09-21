/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Sessions } from '../Sessions.js';

Meteor.publish('sessions', function(){
    if (Roles.userIsInRole(this.userId, 'admin')) {
        return Sessions.find({});
    } else if (Roles.userIsInRole(this.userId, 'vendor')) {
        // it's a fix for development, but vendors shouldn't be able to book themselves anyway
        return Sessions.find({$or: [{vendorID: this.userId}, {custID: this.userId}]});
    } else if (Roles.userIsInRole(this.userId, 'customer')) {
        return Sessions.find({custID: this.userId});
    } else {
        this.stop();
        return;
    }
});


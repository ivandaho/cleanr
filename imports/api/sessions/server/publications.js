/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Sessions } from '../Sessions.js';

Meteor.publish('sessions', function(){
    if (Roles.userIsInRole(this.userId, 'admin')) {
        return Sessions.find({});
    } else {
        return Sessions.find({});
        // user unauthorized
        this.stop();
        return;
    }
});


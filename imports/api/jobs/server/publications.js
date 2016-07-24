/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Jobs } from '../Jobs.js';

Meteor.publish('jobs', function(){
    if (Roles.userIsInRole(this.userId, 'admin')) {
        return Jobs.find({});
    } else {
        // user unauthorized
        this.stop();
        return;
    }
});


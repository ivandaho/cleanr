/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Notifications } from '../Notifications.js';

Meteor.publish('notifications', function(){
        return Notifications.find({uid: this.userId}); });

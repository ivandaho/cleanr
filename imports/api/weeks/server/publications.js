/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Weeks } from '../Weeks.js';

Meteor.publish('weeks', function(){
    return Weeks.find({});
});


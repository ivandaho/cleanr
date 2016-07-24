/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Timeslots } from '../Timeslots.js';

Meteor.publish('timeslots', function(){
    return Timeslots.find({});
});


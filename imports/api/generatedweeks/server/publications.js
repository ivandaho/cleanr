/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Generatedweeks } from '../Generatedweeks.js';

Meteor.publish('generatedweeks', function(){
    return Generatedweeks.find({});
});


/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Vendorslots } from '../Vendorslots.js';

Meteor.publish('vendorslots', function(){
    return Vendorslots.find({});
});


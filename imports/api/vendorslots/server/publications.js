/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Vendorslots } from '../Vendorslots.js';

Meteor.publish('vendorslots', function(){
    let datewindow = moment.utc().toDate();
    let recentvs = Vendorslots.find({d: {$gt: datewindow}});
    return recentvs;
});

/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Vendordata } from '../Vendordata.js';

Meteor.publish('vendordata', function(){
    if (this.userId) {
        return Vendordata.find({ownerID: this.userId});
    } else {
        this.ready();
        return;
    }
});


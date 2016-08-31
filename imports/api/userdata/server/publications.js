/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Userdata } from '../Userdata.js';
import { Sessions } from '../../sessions/Sessions.js';

Meteor.publish('userdata', function(){
    if (Roles.userIsInRole(this.userId, 'vendor')) {
        // find all customers that have sessions that are assigned
        // to the vendor
        var vendorsessions = Sessions.find({vendorID: this.userId});
        var custids = [];
        var temp = {};
        vendorsessions.forEach(function (item) {
            custids.push(item.custID);
        });

        for (var i = 0; i < custids.length; i++) {
            temp[custids[i]] = true;
        }

        var r = [];

        for (var each in temp) {
          // r will have non dupe custids
            r.push(each);
        }
        // and also the vendor's own id
        r.push(this.userId);


        // vendor is allowed to see customer info for their customers
        // also, their own userdata
        return Userdata.find({_id: {$in: r}});
    } else if (this.userId) {
        // if not vendor, allow only their own data
        return Userdata.find({_id: this.userId});
    } else {
        this.ready();
        return;
    }
});

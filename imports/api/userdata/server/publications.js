/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Userdata } from '../Userdata.js';

Meteor.publish('userdata', function(){
    if (this.userId) {
        return Userdata.find({_id: this.userId});
            //{fields: {'user_email': 1, 'user_tel': 1}});
    } else {
        this.ready();
        return;
    }
});


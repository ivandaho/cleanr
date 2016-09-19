import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Notifications = new Mongo.Collection('notifications');

NotificationsSchema = new SimpleSchema({
    createdDate: {
        type: Date
    },
    uid: {
        type: String
    },
    type: {
        type: Number
        // 0 - new Session, notify vendor
    },
    sid: {
        type: String
    },
    seen: {
        type: Boolean
    }
});

Notifications.attachSchema(NotificationsSchema);

Meteor.methods({
    'notifications.dismissNotification' (nid) {
            Notifications.update({_id: nid},
                    {$set: {seen: true}});
    }
});

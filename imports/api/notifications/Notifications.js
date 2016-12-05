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
        // 1 - Session marked as complete, notify customer
        // 2 - Session not yet marked complete, notify vendor
        // 3 - Session canceled by customer, notify vendor
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
    },

    'notifications.dismissAllUnreadNotifications' () {
        const userID = Meteor.userId();
        Notifications.update({seen: false, uid: userID},
                {$set: {seen: true}},
                {multi:true});
    },
    'notifications.createReminderVendorSessionUnmarked' (sess) {
        // insert notification for vendorr
        if (Notifications.find({
            uid: sess.vendorID,
            type: 2,
            sid: sess._id,
        })) {
            // notification already exists
            return;
        }

        // inserting notification...

        Notifications.insert({
            createdDate: moment.utc().toDate(),
            uid: sess.vendorID,
            type: 2,
            sid: sess._id,
            seen: false
        });
    }
});

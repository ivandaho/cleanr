import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Sessions = new Mongo.Collection('sessions');

Sessions.allow({
    // if userId exists, means we are signed in, and able to insert
    insert: function(userId, doc) {
        return !!userId;
    }
});

Ingredient = new SimpleSchema({
    name: {
        type: String,
    },
    amount: {
        type: String
    }
});

SessionSchema = new SimpleSchema({
    date: {
        type: Date
              /*
        autoform: {
            type: "bootstrap-datepicker"
        }
        */
    },
    desc: {
        type: String,
        label: "Description"
    }
});

Sessions.attachSchema(SessionSchema);


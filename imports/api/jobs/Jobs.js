import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { MCounters } from 'meteor/kenken:meteor-counters';

export const Jobs = new Mongo.Collection('jobs');

Ingredient = new SimpleSchema({
    name: {
        type: String,
    },
    amount: {
        type: String
    }
});

JobSchema = new SimpleSchema({
    jobStatus: {
        type: Number,
        label: "0 = submitted, 1 = viewed, 2 = approved, 3 = inprogress, 4 = completed",
        // autoform package removed, safe to remove
        autoform: {
            type: "hidden"
        },
    },

    createdAt: {
        type: Date,
        label: "Submitted date",
        autoValue: function() {
            return new Date()
        },
        autoform: {
            type: "hidden"
        },
    },

    jobDateTime: {
        type: Date,
        label: "Cleaning date & time"
            /*
        autoform: {
            // change to pickadate
            type: "bootstrap-datepicker"
        },
            */
    },

    custID: {
        type: String,
        autoValue: function() {
            return this.userId
        },
        autoform: {
            type: "hidden"
        }
    },

    packageID: {
        type: Number,
        defaultValue: 1,
        max:2,
        min:1
        /*
        autoform: {
            type: 'dropdown-select'
            /*
            placeholder: 'Select supplier',
            fetchMethods:
                initial:
            */
    }
});

Jobs.attachSchema(JobSchema);

Meteor.methods({
    'jobs.pending' (date, package) {
        /*
        console.log('jobs.insert proc');
        console.log(date);
        console.log(package);
        console.log(this.userId);
        */
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        FlowRouter.go('/confirmation');
    },
    'jobs.insert'(){
        Jobs.insert({
            jobStatus: 0,
            // createdAt date is handled by autovalue...
            jobDateTime: Session.get('date'),
            custID: this.userId,
            packageID: Session.get('package'),
        });
    },
});

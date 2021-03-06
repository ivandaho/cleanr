import { Template } from 'meteor/templating';

import './Account.html';

import { Sessions } from '../../api/sessions/Sessions.js';
import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Bookings } from '../../api/bookings/Bookings.js';
import { Userdata } from '../../api/userdata/Userdata.js';
/*
import { Session } from 'meteor/session';
*/

Template.Account.onCreated(function AccountOnCreated() {
    sm.subscribe('userdata');
    sm.subscribe('sessions');
    sm.subscribe('timeslots');
    sm.subscribe('bookings');
    Session.set('rslimit', 5);
    Session.set('mblimit', 5);
});


Template.Account.helpers({
    parsess(status) {
        if (status == 1) {
            return true;
        } else if (status == 0) {
            return false;
        }
    },
    morebookings() {
        var mblimit = Session.get('mblimit');
        var thing = Bookings.find({
                                custID: Meteor.userId()
                            },
                            {
                                sort: {subdate: 1, timeslot: 1},
                                limit: mblimit
                            });
        // counts the number of sessions found
        var newcount = thing.count();
        // sets the number of sessions found
        Session.set('mbcount', newcount);

        // if the new count is same as the old count
        if (newcount < Session.get('mblimit')) {
            Session.set('mbmaxed', true);
        } else {
            Session.set('mbmaxed', false);
        }
        if (thing.count() != 0) {
            return thing;
        } else {
            return false;
        }
    },
    booking() {
        // get most recent booking with active subscription
        const d = moment.utc().subtract(6, 'months').toDate();
        var mrs = Sessions.findOne({custID: Meteor.userId(),
                                    date: {$gt: d}},
                                    {sort: {date: -1}}) || {};
        var found = Bookings.findOne({_id: mrs.bookingID});
            if (found){
              if (found.jobstatus == 3 || found.jobstatus == 2) {
                return found;
              }
            }
    },
    rsmin() {
        if (Session.get('rslimit') <= 5) {
            return true;
        }
        return false;
    },
    mbmin() {
        if (Session.get('mblimit') <= 5) {
            return true;
        }
        return false;
    },
    sesses() { // TODO: is this secure? #22
        var rslimit = Session.get('rslimit');
        var thing = Sessions.find({
                                custID: Meteor.userId()
                            },
                            {
                                sort: {date: -1, timeslot: 1},
                                limit: rslimit
                            });
        // counts the number of sessions found
        var newcount = thing.count();
        // sets the number of sessions found
        Session.set('rscount', newcount);

        // if the new count is same as the old count
        if (newcount < Session.get('rslimit')) {
            Session.set('rsmaxed', true);
        } else {
            Session.set('rsmaxed', false);
        }
        if (thing.count() != 0) {
            return thing;
        } else {
            return false;
        }
    },
});
Template.Account.events({
    'click .vm-rs' (event) {
        event.preventDefault();
        if (Session.get('rsmaxed') != true) {
            Session.set('rslimit', Session.get('rslimit') + 5);
            $(".rs-row").removeClass("rs-row");
            setTimeout(function () {
                $(".rs-row").velocity("stop");
                $(".rs-row").velocity("callout.emerge", {stagger: 5});
            }, 0);
        }
    },
    'click .vl-rs' (event) {
        event.preventDefault();
        if (Session.get('rslimit') - 5 < 5) {
            Session.set('rslimit', 5)
        } else {
            Session.set('rslimit', Session.get('rslimit') - 5);
        }
    },
    'click .vm-mb' (event) {
        event.preventDefault();
        if (Session.get('mbmaxed') != true) {
            Session.set('mblimit', Session.get('mblimit') + 5);
            $(".mb-row").removeClass("mb-row");
            setTimeout(function () {
                $(".mb-row").velocity("stop");
                $(".mb-row").velocity("callout.emerge", {stagger: 5});
            }, 0);
        }
    },
    'click .vl-mb' (event) {
        event.preventDefault();
        if (Session.get('mblimit') - 5 < 5) {
            Session.set('mblimit', 5)
        } else {
            Session.set('mblimit', Session.get('mblimit') - 5);
        }
    },
    'click #demobtn' (event) {
        event.preventDefault();
        var tour = {
            showCloseButton: false,
            id: "acctour",
            i18n:{stepNums: ["", "", "", "", "", "", ""]},
            steps: [
            {
                content: "Mouseover account details and click the edit icon to change account details",
                target: "#useremail",
                placement: "left"
            },
            {
                content: "Change your password here",
                target: "#changepwd",
                placement: "left"
            },
            {
                content: "View, add, edit, or swap your addresses here",
                target: "#useradds",
                placement: "top"
            },
            {
                content: "View your sessions & bookings here",
                target: "#usersbs",
                placement: "top"
            }
            ]
        };
        hopscotch.startTour(tour);
    },
    'click .setaddress' (event) {
        event.stopPropagation();
        event.preventDefault();
        var i = (event.target.id);
        Meteor.call('userdata.setMainAddress', i);
    },
    'click .changeEmail' (event) {
        event.preventDefault();
        console.log('unimplemented');
    },
    'click .changePhone' (event) {
        event.preventDefault();
        Modal.show('AccountChangePhone');
    },
    'click .changeAddress' (event) {
        event.stopPropagation();
        event.preventDefault();
        Modal.show('AccountChangeAddress');
        var i = (event.target.id);
        Session.set('changeAddrID', i);
    },
    'click .delAddress' (event) {
        event.stopPropagation();
        event.preventDefault();
        var i = (event.target.id);

        var index = parseInt(i);

        var usr = Userdata.findOne({_id: Meteor.userId()});
        var adds = [];
        adds = usr.user_address;
        delthis = adds[i];

        var street = delthis.street;
        var city = delthis.city;
        var state = delthis.state;
        var zip = delthis.zip;
        Meteor.call('userdata.delAddress', index, street, city, state, zip);
        $(event.target.parentElement.parentElement.parentElement.parentElement).removeClass("panel-info");
    },
});

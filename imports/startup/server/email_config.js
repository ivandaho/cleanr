import { Meteor } from 'meteor/meteor';
import { Sessions } from '/imports/api/sessions/Sessions.js';
import { Bookings } from '/imports/api/bookings/Bookings.js';

Meteor.methods({
    'email.bookingSuccess_vend' (b, s) {

        // get all the sessions for the booking
        const sesses = Sessions.find({bookingID: b});

        let vids = [];

        // get the vendor ids associated with the sessions
        sesses.forEach(function(item) {
            vids.push(item.vendorID);
            console.log('pushed : ' + item.vendorID);
        });
        function uniq(a) {
               return Array.from(new Set(a));
        }
        vids = uniq(vids);

        let vends = [];

        vids.forEach(function(id) {
            // console.log('vid: ' + vid);
            const avend = Meteor.users.findOne({_id:id});
            const emailAddress = avend.emails[0].address;
            console.log('preparing to send to: ' + emailAddress);
            // get each session's information
            var vendorsessions = [];

            sesses.forEach(function (sess) {
                if (sess.vendorID == avend._id) {
                    vendorsessions.push(sess);
                }
            });

            // check if the domain is blacklisted
            // this is so I don't accidentally send a bunch of emails
            let index = emailAddress.indexOf("@") + 1;
            let str = emailAddress.substring(index);

            // blacklist site.com because i use that name for example
            let blacklists = ['site.com'];
            let blacklisted = false;
            blacklists.forEach(function (item) {
                if (!blacklisted) {
                    if (item == str) {
                        blacklisted = true;
                    }
                }
            });

            if (!blacklisted) {
                console.log(str);
                Mailer.send({
                        to: emailAddress,
                        subject: "[Cleanr] You have new Session assignment(s)",
                        template: 'bookingSuccess_vend',
                        data: {
                            sesses: vendorsessions
                        }
                });
            } else {
                console.log('The domain "' + str + '" is blacklisted for e-mails. The e-mail will not be sent.');
            }
        });
    },

    'email.bookingSuccess_cust' (date, slot, repeat, b, s) {

        const emailAddress = Meteor.user().emails[0].address;
        let index = emailAddress.indexOf("@") + 1;
        let str = emailAddress.substring(index);

        // blacklist site.com because i use that name for example
        let blacklists = ['site.com'];
        let blacklisted = false;
        blacklists.forEach(function (item) {
            if (!blacklisted) {
                if (item == str) {
                    blacklisted = true;
                }
            }
        });

        if (!blacklisted) {
            console.log(str);
            Mailer.send({
                    to: emailAddress,
                    subject: "[Cleanr] Thank You For Booking With Cleanr",
                    template: 'bookingSuccess_cust',
                    data: {
                        d: date,
                        s: slot,
                        r: repeat,
                        bid: b,
                        sessid: s
                    }
            });
        } else {
            console.log('The domain "' + str + '" is blacklisted for e-mails. The e-mail will not be sent.');
        }
    }
});


import { Meteor } from 'meteor/meteor';
import { Sessions } from '/imports/api/sessions/Sessions.js';
import { Bookings } from '/imports/api/bookings/Bookings.js';

const checkblacklist = function(addr) {
    let index = addr.indexOf("@") + 1;
    var str = addr.substring(index);

    // blacklist site.com because i use that name for example
    let domains = ['site.com'];

    // return true;
    var blacklisted = false;
    
    domains.forEach(function (domain) {
        if (blacklisted === false) {
            if (domain === str) {
                blacklisted = true;
            }
        }
    });
    return blacklisted;
};

Meteor.methods({
    'email.markCompleted' (sid) {
        const sess = Sessions.findOne({_id: sid});
        const vid = sess.vendorID;
        const vendor = Meteor.users.findOne({_id:vid});

        const cid = sess.custID;
        const cust = Meteor.users.findOne({_id:cid});
        const emailAddress = cust.emails[0].address;

        if (!checkblacklist(emailAddress)) {
            Mailer.send({
                    to: emailAddress,
                    subject: "[Cleanr] Your Session has been completed.",
                    template: 'sessionCompleted',
                    data: {
                        thesess: sess
                    }
            });
        } else {
            console.log('The domain for "' + emailAddress + '" is blacklisted for e-mails. The e-mail will not be sent.');
        }

    },
    'email.bookingSuccess_vend' (b, s) {

        // get all the sessions for the booking
        const sesses = Sessions.find({bookingID: b});

        let vids = [];

        // get the vendor ids associated with the sessions
        sesses.forEach(function(item) {
            vids.push(item.vendorID);
        });
        function uniq(a) {
               return Array.from(new Set(a));
        }
        vids = uniq(vids);

        let vends = [];

        vids.forEach(function(id) {
            const avend = Meteor.users.findOne({_id:id});
            const emailAddress = avend.emails[0].address;
            // get each session's information
            var vendorsessions = [];

            sesses.forEach(function (sess) {
                if (sess.vendorID == avend._id) {
                    vendorsessions.push(sess);
                }
            });

            // check if the domain is blacklisted
            // this is so I don't accidentally send a bunch of emails

            if (!checkblacklist(emailAddress)) {
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
        if (!checkblacklist(emailAddress)) {
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


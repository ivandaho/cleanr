import { Timeslots } from '/imports/api/timeslots/Timeslots.js';
import { Sessions } from '/imports/api/sessions/Sessions.js';
import { Bookings } from '/imports/api/bookings/Bookings.js';

Accounts.emailTemplates.siteName = "Cleanr.my";
Accounts.emailTemplates.from     = "Cleanr <admin@site.com>";

Accounts.emailTemplates.verifyEmail = {
    subject() {
        return "[Cleanr] Verify Your Email Address";
    },
    text( user, url ) {
        let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@site.com",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

        return emailBody;
    }
};

Accounts.emailTemplates.resetPassword = {
    subject() {
        return "[Cleanr] Reset your Password";
    },
    text( user, url ) {
        let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@site.com",
        emailBody      = `To reset your password (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request to reset your password, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

        return emailBody;
    }
};

Accounts.onResetPasswordLink = function() {
    console.log('success');
}

Meteor.methods({
    'sendVerificationLink' () {
        let userId = Meteor.userId();
        if (userId) {
            return Accounts.sendVerificationEmail(userId);
        }
    },
});

Mailer.config({
    from: 'Cleanr <admin@site.com>',
    baseUrl: 'http://localhost:3000/',
    replyTo: 'Cleanr <admin@site.com>'
});

this.Templates = {};
// for tests...
const date = moment.utc(date);
const b = 'ugkiCxYeuNkEGFZx2';
const sid = 'f5k6THHQiBDqCCNHS';
const testsess = Sessions.findOne({_id: sid});

Templates.sessionCompleted = {
    path: "sessionCompleted.html",
    route: {
        path: '/sessionCompleted/',
        data: function() {
            const s = Sessions.findOne({_id: sid});
            return {
                thesess: s
            };
        }
    },
    css: 'email.css'
}

Templates.bookingSuccess_cust = {
    path: "bookingSuccess_cust.html",
    route: {
        path: '/bookingSuccess_cust/',
        data: function() {
            return {
                d: date,
                s: 1,
                r: false,
                bid: b,
                sessid: sid
            };
        }
    },
    css: 'email.css'
}

const mocksesses = ['TqKPfBTj7sP2f3v9K','3Y68HEJfz5mgRDnTc','62PAycFr482P7zpZv'];
Templates.bookingSuccess_vend = {
    path: "bookingSuccess_vend.html",
    route: {
        path: '/bookingSuccess_vend/',
        data: function() {
            return {
                sesses: mocksesses
            };
        }
    },
    css: 'email.css'
}

this.TemplateHelpers = {
    getsessionstatus(sess) {
        if (thesess.sessionstatus == 0) {
            return true;
        }
    },
    getnextsessafter(s) {
        // for testing purposes
        // let b = 'sphkuR7Phq2y2axb8';
        bid = s.bookingID;
        let nextsess = Sessions.findOne({bookingID: bid, date: {$gt: s.date}}, {sort: {date: 1}});

        return nextsess;
    },
    getnextsess(bid) {
        // for testing purposes
        // let b = 'sphkuR7Phq2y2axb8';
        let s = Sessions.findOne({bookingID: bid}, {sort: {date: 1}});
        return s;
    },
    booking(bid) {
        // for testing purposes
        // let b = 'sphkuR7Phq2y2axb8';
        var found = Bookings.findOne({_id: bid});
        return found;
    },
    sess(sid) {
            var found = Sessions.findOne({_id: sid});
        return found;
    },
    dateToDay(date) {
        return moment.utc(date).format('dddd');
    },
    dateFormat(date) {
        return moment.utc(date).format('YYYY-MM-DD');
    },
    getslotbynum(s) {
        var ts = Timeslots.findOne({num: parseInt(s)}) || {};
        return ts.slot;
    }
};


Meteor.startup(() => {
    Mailer.init({
        templates: Templates,     // Global Templates namespace, see lib/templates.js.
        helpers: TemplateHelpers
    });
});

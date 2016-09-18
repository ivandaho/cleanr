import { Timeslots } from '/imports/api/timeslots/Timeslots.js';

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
Templates.test = {
    path: "bookingSuccess.html",
    route: {
        path: '/test/'
    }
}

this.TemplateHelpers = {
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

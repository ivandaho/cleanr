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

Meteor.methods({
    'sendVerificationLink' () {
        let userId = Meteor.userId();
        if (userId) {
            return Accounts.sendVerificationEmail(userId);
        }
    },
});

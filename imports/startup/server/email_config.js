import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'email.bookingSuccess' (date, slot, repeat, ids) {

        // SSR.compileTemplate('bookingSuccess', Assets.getText('bookingSuccess.html'));
        var bookingSuccessData = {
            sessid: ids.s[0],
        };
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
                    template: 'test',
                    data: {
                        d: date,
                        s: slot,
                        r: repeat,
                        bid: ids.b,
                        sessid: ids.s[0]
                    }
            });
        } else {
            console.log('The domain "' + str + '" is blacklisted for e-mails. The e-mail will not be sent.');
        }

        // Email.send({
        //     to: emailAddress,
        //     from: "Cleanr <admin@site.com>",
        //     subject: "[Cleanr] Thank You For Booking With Cleanr",
        //     html: SSR.render("bookingSuccess", bookingSuccessData)
        // });
    }
});


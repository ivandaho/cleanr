import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'email.bookingSuccess' (date, slot, repeat, ids) {

        // SSR.compileTemplate('bookingSuccess', Assets.getText('bookingSuccess.html'));

        var bookingSuccessData = {
            sessid: ids.s[0],
        };

        console.log(Meteor.user().emails[0].address);
        const emailAddress = Meteor.user().emails[0].address;
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

        // Email.send({
        //     to: emailAddress,
        //     from: "Cleanr <admin@site.com>",
        //     subject: "[Cleanr] Thank You For Booking With Cleanr",
        //     html: SSR.render("bookingSuccess", bookingSuccessData)
        // });
    }
});


var velocity = require('velocity-animate');
var Velocity = require('velocity-ui-pack');

$.Velocity.RegisterEffect("callout.blink", {
    defaultDuration: 50,
    calls: [
        [ { opacity: 0 }, 0.50 ],
        [ { opacity: 1 }, 0.50 ]
    ]
});

$.Velocity.RegisterEffect("callout.emerge", {
    defaultDuration: 300,
    calls: [
        [{scaleX: 0, scaleY: 0}, 0.1],
        [{scaleX: 1, scaleY: 1}, 0.9]
    ]
});

$.Velocity.RegisterEffect("callout.fadeAlt", {
    defaultDuration: 300,
    calls: [
        [{opacity: 1}, 1]
    ],
    queue: false
});



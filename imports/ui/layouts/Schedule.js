import './Schedule.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Vendorslots } from '../../api/vendorslots/Vendorslots.js';

import '/imports/startup/client/config/velocity_callouts.js';

Template.Schedule.onCreated(function ScheduleOnCreated() {
    sm.subscribe('timeslots');
    sm.subscribe('vendorslots');
    var mdate = moment.utc().startOf('week').add(1, 'days'); // this week's monday
    sow = moment.utc().startOf('week').add(1, 'days'); // this week's monday
    var jdate = mdate.toDate();
    if (!Session.get('currweek')) {
        Session.set('currweek', jdate);
    }
    Session.set('currweek', jdate);
    tss = Timeslots.find({}, {sort: {num: 1}});
    //Meteor.subscribe('sessions');
});

var tss;
var scrollindex;
var sow;

Template.Schedule.helpers({
    timeslots() {
        if (tss != undefined){
            return tss;
        }
    },
    weekdates(i) {
        var jdate = Session.get('currweek');
        var mdate = moment.utc(jdate);
        return mdate.clone().add(i, 'weeks').format("DD-MM");
    },
    fulldates() {
        var thething = [];
        var mdate = moment.utc().startOf('week').add(1, 'days');
        for(i = 0; i<35; i++) {
            themdate = mdate.clone().add(i, 'days');
            let thedate = themdate.format("DD-MM");
            let theday = themdate.format("dddd");
            var oneday;
            if (i % 7  == 0) {
                oneday = {day: theday, date: thedate, lastday: true};
            } else {
                oneday = {day: theday, date: thedate};
            }
            thething.push(oneday);
        }
        return thething;
    },
});

Template.schedtable.helpers({
    days(num) {

        var jdate = Session.get('currweek');
        var mdate = moment.utc(jdate);
        // var d =  mdate.add(i, 'days').format("YYYY-MM-DD");

        var thething = [];
        for(i = 0; i<35; i++) {
            var oneday;
            if (i % 7  == 0) {
                oneday = {date: mdate.clone().add(i, 'days').format("YYYY-MM-DD"),n: num, lastday: true};
            } else {
                oneday = {date: mdate.clone().add(i, 'days').format("YYYY-MM-DD"),n: num};
            }
            thething.push(oneday);
        };
        return thething;
        return [
            {date: mdate.clone().add(0, 'days').format("YYYY-MM-DD"),n: num},
            {date: mdate.clone().add(1, 'days').format("YYYY-MM-DD"),n: num},
            {date: mdate.clone().add(2, 'days').format("YYYY-MM-DD"),n: num},
            {date: mdate.clone().add(3, 'days').format("YYYY-MM-DD"),n: num},
            {date: mdate.clone().add(4, 'days').format("YYYY-MM-DD"),n: num},
            {date: mdate.clone().add(5, 'days').format("YYYY-MM-DD"),n: num},
            {date: mdate.clone().add(6, 'days').format("YYYY-MM-DD"),n: num}];
    },
});

Template.eachslot.helpers({
    dateover(date, n) {
        var thets = Timeslots.findOne({num: n});
        datestr = moment.utc(date).format('YYYY-MM-DD');
        checkstr = datestr + ' ' + thets.timestart;
        if (moment.utc(checkstr, 'YYYY-MM-DD HHmm') < moment.utc().add(2, 'days')) {
            return true;
        }
        return false;
    },
    hasopen(date, n) {
        var jdate = moment.utc(date).toDate();

        //var ds = Vendorslots.find({d: new Date(jdate)});
        var ds = Vendorslots.find({
                                    $and: [
                                        {d: new Date(jdate)},
                                        {s: parseInt(n)}
                                    ]
                                }); // find for that day
        var count = ds.count();
        if (count > 0) {
            return true;
        } else {
            return false;
        }

    },
});

Template.Schedule.events({
    'scroll #scrollthis' (event) {
        // change pagination
        var ar = [];
        let containeroffset = $('.container').offset().left;
        var o = $(".container").offset().left;
        var elepos;

        for (var s = 0; s < 5; s++) {
            // for 5 weeks
            var p = "#" + sow.clone().add(s, 'weeks').format("DD-MM");
            elepos = $(p).offset().left - containeroffset - 130;
            // offset is 130 for the first column

            if (elepos <= 0) {
                // if scrollpos less than 0
                // ignore by setting scrollpos to a large number
                elepos = Number.MAX_VALUE;
                // elepos = 4000;
            }
            ar.push(elepos);
        }

        var indexOfMin;

        // http://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
        indexOfMin = ar.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);
        if (indexOfMin === 0) {
            // if undetermined, set index to 5
            indexOfMin = 5;
        }

        // get ratio of scrollpos against tablewidth
        // to determine if the table has been scrolled to end
        let scrollpos = $("#scrollthis").scrollLeft();
        let tablewidth = $(".table-special").width();
        let ratio = scrollpos/tablewidth;
        // console.log($(window).width() + "|" + ratio);
        // console.log(ar + " | " + indexOfMin);
        // console.log(scrollpos.scrollLeft() + " | " + tablewidth.width());
        if ($(window).width() > 1199) {
            // if window width is less than 1200,
            // page 5 is already reachable
            if (ratio > 0.7) {
                indexOfMin = 5;
            }
        }

        if (indexOfMin !== scrollindex) {
            // set new scrollindex only if scrollindex is different
            scrollindex = indexOfMin;

            let targetclass = "#s" + sow.clone().add(indexOfMin - 1, 'weeks').format("DD-MM");
            $(".active").removeClass("active");
            $(targetclass).addClass("active");
        }

    },
    'click #demobtn' (event) {
        event.preventDefault();
        var tour = {
            showCloseButton: false,
            id: "scheduletour",
            i18n:{stepNums: ["", "", "", "", "", "", ""]},
            steps: [
            {
                content: "Browse by day and time slot",
                target: ".table-hover",
                placement: "top"
            },
            {
                content: "Select a time slot to book",
                target: ".bookbtn",
                placement: "top"
            },
            {
                content: "Browse up to 5 weeks in advance",
                target: ".changeweekbtn",
                placement: "top"
            }
            ]
        };
        hopscotch.startTour(tour);
    },
    'click .bookbtn' (event) {
        event.preventDefault();

        var date = event.target.id.substring(0,10);
        var slot = event.target.id.substring(11,23);

        // query params
        var qp = {date: date, slot: slot};
        mdate = moment.utc(date);
        msg_day = mdate.format('dddd ');
        msg_date = mdate.format('MMMM D');
        var ts = Timeslots.findOne({num: parseInt(slot)});

        var bb_msg = '<div class="row text-center"><h4>You have selected the ' + msg_day + '(' + msg_date + ') ' + ts.slot + ' time slot.</h4><br>Please select a session type.</div>';
        //bootbox.alert('test');
    //'<input type="range" min="0" max="3" step="1" value="1" data-orientation="horizontal" >' +
        var contenthtml = '<div class="row">  ' +
                            '<div class="text-center">' +
                              'Single session: a once-off cleaning session.' +
                            '</div>' +
                          '</div>' +
                          '<div class="row">  ' +
                            '<div class="text-center">' +
                              'or:' +
                            '</div>' +
                          '</div>' +
                          '<div class="row">  ' +
                            '<div class="text-center">' +
                              'Weekly Sessions: Billed once a month. Cancel anytime.' +
                            '</div>' +
                          '</div>';

        bootbox.dialog({
            title: "Booking",
            message: bb_msg + '<br>' + contenthtml,
            buttons: {
                'single': {
                    label: 'Single Session',
                    className: 'btn-success',
                    callback: function() {
                        qp.repeat = false;
                        FlowRouter.go('/confirmation', null, qp);
                        // fix for param changing (don't scroll to top)
                        $('body').animate({scrollTop: 0}, 0);
                        return true;
                    }
                },
                'weekly': {
                    label: 'Weekly Sessions',
                    className: 'btn-success',
                    callback: function() {
                        qp.repeat = true;
                        FlowRouter.go('/confirmation', null, qp);
                        // fix for param changing (don't scroll to top)
                        $('body').animate({scrollTop: 0}, 0);
                        return true;
                    }
                }
            },
            onEscape: function() {} // allows for esc to close modal
        });

    },
    'click .prevweekbtn' (event) {
        event.preventDefault();
        var tempjdate = Session.get('currweek');
        var mdate = moment.utc(tempjdate).subtract(1, 'weeks'); // monday
        tempjdate = mdate.toDate();
        if (tempjdate < moment.utc().subtract(1, 'weeks')) {
            $("th").velocity("callout.blink");
            return;
        } else {
            Session.set('currweek', tempjdate);
            $(".active").removeClass("active");
            // $(".tsbtn").velocity("callout.emerge");
        }

    },
    'click .resetweekbtn' (event) {
        event.preventDefault();
        var mdate = moment.utc().startOf('week').add(1, 'days');
        tempjdate = mdate.toDate();
        Session.set('currweek', tempjdate);
        $(".tsbtn").velocity("stop");
        $(".tsbtn").velocity("callout.emerge");
    },
    'click .changeweekbtn' (event) {
        event.preventDefault();
        setTimeout(function () {
            $(".active").removeClass("active");
            $(event.target.parentElement).addClass("active");
        }, 101);
        let p = $(".container").offset().left;
        let targetid = "#" + event.target.parentElement.id.substring(1,6);
        let finaloffset = -p - 130
        $(targetid).velocity("scroll", {
            axis: "x",
            container: $("#scrollthis"),
            offset: finaloffset,
            duration: 100
        });
    },
    'click .nextweekbtn' (event) {
        event.preventDefault();
        var tempjdate = Session.get('currweek');
        var mdate = moment.utc(tempjdate).add(1, 'weeks'); // monday
        tempjdate = mdate.toDate();
        if (tempjdate > moment.utc().add(5, 'weeks')) {
            $("th").velocity("callout.blink");
            return;
        } else {
            Session.set('currweek', tempjdate);
            $(".active").removeClass("active");
            // $(".tsbtn").velocity("callout.emerge");
        }

    },

});

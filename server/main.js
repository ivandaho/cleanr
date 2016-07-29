import { Meteor } from 'meteor/meteor';
import '/imports/startup/server';

import { Vendordata } from '/imports/api/vendordata/Vendordata.js';
import { Vendorslots } from '/imports/api/vendorslots/Vendorslots.js';
import { Generatedweeks } from '/imports/api/generatedweeks/Generatedweeks.js';

Meteor.startup(() => {
    // return;
    //script to create weeks data. does not handle updates from vendors, only initial creations

    //vd = Vendordata.find({});
    vd = Vendordata.find({_id: "6WXGGorhWRTGvdEfW"});
    
    var today = moment();
    var y = 5; // how many weeks in advance
    var twm = today.clone().startOf('week').add(1,'day'); // this week monday
    for (var w = 0; w <= y; w++) {
        // for each week...
        var ywm = twm.clone().add(w, 'weeks'); // y week monday
        var jywm = ywm.clone().toDate(); // java Date y week monday
        // generate 7 days, starting from the monday of that week.
        var thisweekadded = false;
        for (var x = 0; x < 7; x++) {

            var currday = moment(jywm).clone().add(x, 'days'); // start from...
            if (x == 0) {
                gi = Generatedweeks.find({mondayDate: currday.clone().toDate()});
                // if found one of this week
                gi.forEach(function (item) {
                    thisweekadded = true;
                });
            }

            if (!thisweekadded) {
                vd.forEach(function(vend) {
                    vend.defaultSlots.forEach(function(slot) {
                        var daystring = slot.substring(0,3); // day
                        if (daystring == currday.clone().format('ddd').toLowerCase()) {
                            // its the wanted day of the week
                            var slotstring = slot.substring(4,5);
                            Vendorslots.insert({
                                d: currday.clone().toDate(),
                                s: parseInt(slotstring),
                                ownerID: vend.ownerID
                            });
                        };
                    }); // foreach slot
                }); // foreach vend

                if (x == 0) {
                    Generatedweeks.insert({
                        mondayDate: currday.clone().toDate()});
                }
            }
        }; // for each daytogenerate
    }
    return;
        

    
    var allevents = [];

    vd.forEach(function (onevendor) {
        console.log('one vendordata entry, id ' + onevendor._id);
        // parse the data, for week creation
        
        onevendor.defaultSlots.forEach(function(sl) {
            var day = sl.substring(0,3);
            var s = parseInt(sl.substring(4,5));
            // Vendorslots: date, slot, ownerID
        });

        onevendor.vendorWeeks.forEach(function(week) {
            //var str = moment(week.mondayDate).format('YYYY-MM-DD');
            //str = str += week.timeslots[0].days.
            week.timeslots.forEach(function(timeslot) {
                var tsstr = timeslot.slot;
                timeslot.days.forEach(function(day) {
                    var date = day.d;
                    var fs = day.free;
                    var ps = date + ' ' + tsstr + ' ' + fs + ' ' + onevendor.ownerID;
                    //console.log(ps);
                    allevents.push(ps);
                });
            });

        });
    });
    allevents.forEach(function (item) {
        // this will insert all vendor slot info, without duplicates
        Vendorslots.upsert({"vendorslot": item},{$set: {"vendorslot": item}});
        // upsert doesn't work with simpleSchema or something but the above line is ok
        //Vendorslots.update({"vendorslot": item},{"vendorslot": item},{upsert: true});
    });

    var tallyslottime = function(date, slot){
    }
    var y = 5; // weeks in advanced to generate

    var twm = moment().startOf('week').add(1, 'days'); // this week monday
    var query = { mondayDate: twm.add(y, 'weeks').toDate()};
    var tw = Weeks.findOne(query); // test week
    // attempt to find a week y weeks from now
    if (tw !=undefined){
        console.log('found entry for ' + y + ' weeks after current week. Not generating new weeks');
    } else {
        // generate weeks for up to y weeks later

        for (var x = 0; x <= y; x++) {
            // x weeks from now
            var jdate = moment().startOf('week').add(1, 'days').add(x, 'week').toDate();

            doc = Weeks.findOne({mondayDate: jdate});
            if (doc){
                console.log('found one for ' + jdate);
            } else {
                console.log('not found for ' + jdate);
                var mondate = moment(jdate).format('YYYY-MM-DD');
                var tuedate = moment(jdate).add(1, 'day').format('YYYY-MM-DD');
                var weddate = moment(jdate).add(2, 'day').format('YYYY-MM-DD');
                var thudate = moment(jdate).add(3, 'day').format('YYYY-MM-DD');
                var fridate = moment(jdate).add(4, 'day').format('YYYY-MM-DD');
                var satdate = moment(jdate).add(5, 'day').format('YYYY-MM-DD');
                var sundate = moment(jdate).add(6, 'day').format('YYYY-MM-DD');
                Weeks.insert({
                    mondayDate: jdate,
                    timeslots: [
                        {
                            slot: "0800 to 1000",
                            days: [
                                {
                                    d: mondate,
                                    free: 1 // tallyslottime() //get vendor info, put into a var a
                                },
                                {
                                    d: tuedate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: weddate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: thudate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: fridate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: satdate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: sundate,
                                    free: 0 //get vendor info, put into a var a
                                }
                            ]
                        },
                        {
                            slot: "1000 to 1200",
                            days: [
                                {
                                    d: mondate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: tuedate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: weddate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: thudate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: fridate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: satdate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: sundate,
                                    free: 0 //get vendor info, put into a var a
                                }
                            ]
                        },
                        {
                            slot: "1200 to 1400",
                            days: [
                                {
                                    d: mondate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: tuedate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: weddate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: thudate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: fridate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: satdate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: sundate,
                                    free: 0 //get vendor info, put into a var a
                                }
                            ]
                        },
                        {
                            slot: "1400 to 1600",
                            days: [
                                {
                                    d: mondate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: tuedate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: weddate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: thudate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: fridate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: satdate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: sundate,
                                    free: 0 //get vendor info, put into a var a
                                }
                            ]
                        },
                        {
                            slot: "1600 to 1800",
                            days: [
                                {
                                    d: mondate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: tuedate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: weddate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: thudate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: fridate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: satdate,
                                    free: 1 //get vendor info, put into a var a
                                },
                                {
                                    d: sundate,
                                    free: 0 //get vendor info, put into a var a
                                }
                            ]
                        }
                    ]
                });
            }
        }
    }

    // fills in vendor stuff, up to y weeks from now
    //doc = Vendordata.find({});
    eachvendor = Vendordata.findOne({_id: "6TsWxEfiGGmHJcQsA"});
    //doc.forEach(function(eachvendor) { // later
    // --------------------------------------------------------------------
    // this portion onwards is for each vendor. just write for one first
    // then later loop it for all vendors.

    console.log("printing each vendoradata " + eachvendor._id);

    var needtogenerate = [];
    // var x = 1; // has to start from 0 to check current week as well
    for (var x = 0; x <= y; x++) {
        var twm = moment().startOf('week').add(1, 'days').add(x, 'week');
        // twm is the mondaydate for each x week.

        var found = false;
        eachvendor.vendorWeeks.forEach(function(eachweek) {
            if (!found) {
                // check whether that week already has records...
                var twmf = twm.format('YYYY-MM-DD');
                var mondayf = moment(eachweek.mondayDate).format('YYYY-MM-DD');

                if (twmf == mondayf) {
                    //console.log('comparing ' + twmf + ' with ' + mondayf + ' TRUE');
                    found = true;
                } else {
                    //console.log('comparing ' + twmf + ' with ' + mondayf + ' FALSE');
                }
            }
        });

        if (!found) {
            console.log("pushed one item: " + twm.format('YYYY-MM-DD'));
            needtogenerate.push(twm);
        }
    }

    needtogenerate.forEach(function(uw) {
        // for each week requiring generation
        console.log('pushing one set for: ' + uw.format('YYYY-MM-DD'));
        
        // pull data from default vendor schedule

        // check the array of slottime, if exist = free
        var checkslot = function(day,slot) {
            checkstr = day + ' ' + slot;
            var x;
            var found = false;
            eachvendor.slotsAvailable.forEach(function(slottime) {
                if (!found) {
                    //var sl = slottime.substring(4,16);
                    //var d = slottime.substring(0,4);
                    if (checkstr == slottime) {
                        x = 1;
                        found = true;
                        console.log('found a slot at ' + day + ' ' + slot);
                    } else {
                        x = 0;
                    }
                }
            });
            return x;
        }


        var mondate = uw.clone().format('YYYY-MM-DD');
        var tuedate = uw.clone().add(1, 'day').format('YYYY-MM-DD');
        var weddate = uw.clone().add(2, 'day').format('YYYY-MM-DD');
        var thudate = uw.clone().add(3, 'day').format('YYYY-MM-DD');
        var fridate = uw.clone().add(4, 'day').format('YYYY-MM-DD');
        var satdate = uw.clone().add(5, 'day').format('YYYY-MM-DD');
        var sundate = uw.clone().add(6, 'day').format('YYYY-MM-DD');


        /*
        console.log('mondate: ' + mondate);
        console.log('tuedate: ' + tuedate);
        console.log('weddate: ' + weddate);
        console.log('thudate: ' + thudate);
        console.log('fridate: ' + fridate);
        console.log('satdate: ' + satdate);
        console.log('sundate: ' + sundate);
        */

        // update the collection for items where ownerID matches

        Vendordata.update(
            {ownerID: eachvendor.ownerID, _id: "6TsWxEfiGGmHJcQsA"},
            {$push: {
                       // add one weeks worth of data...
                       // not found that week anyway.
                       "vendorWeeks": {
                           "mondayDate": new Date(uw),
                            "timeslots":[
                                {
                                    "slot": "0800 to 1000",
                                    "days": [
                                        {
                                            "d": mondate,
                                            "free": checkslot('mon', '0800 to 1000')
                                        },
                                        {
                                            "d": tuedate,
                                            "free": checkslot('tue', '0800 to 1000')
                                        },
                                        {
                                            "d": weddate,
                                            "free": checkslot('wed', '0800 to 1000')
                                        },
                                        {
                                            "d": thudate,
                                            "free": checkslot('thu', '0800 to 1000')
                                        },
                                        {
                                            "d": fridate,
                                            "free": checkslot('fri', '0800 to 1000')
                                        },
                                        {
                                            "d": satdate,
                                            "free": checkslot('sat', '0800 to 1000')
                                        },
                                        {
                                            "d": sundate,
                                            "free": checkslot('sun', '0800 to 1000')
                                        },
                                    ]
                                },
                                {
                                    "slot": "1000 to 1200",
                                    "days": [
                                        {
                                            "d": mondate,
                                            "free": checkslot('mon', '1000 to 1200')
                                        },
                                        {
                                            "d": tuedate,
                                            "free": checkslot('tue', '1000 to 1200')
                                        },
                                        {
                                            "d": weddate,
                                            "free": checkslot('wed', '1000 to 1200')
                                        },
                                        {
                                            "d": thudate,
                                            "free": checkslot('thu', '1000 to 1200')
                                        },
                                        {
                                            "d": fridate,
                                            "free": checkslot('fri', '1000 to 1200')
                                        },
                                        {
                                            "d": satdate,
                                            "free": checkslot('sat', '1000 to 1200')
                                        },
                                        {
                                            "d": sundate,
                                            "free": checkslot('sun', '1000 to 1200')
                                        },
                                    ]
                                },
                                {
                                    "slot": "1200 to 1400",
                                    "days": [
                                        {
                                            "d": mondate,
                                            "free": checkslot('mon', '1200 to 1400')
                                        },
                                        {
                                            "d": tuedate,
                                            "free": checkslot('tue', '1200 to 1400')
                                        },
                                        {
                                            "d": weddate,
                                            "free": checkslot('wed', '1200 to 1400')
                                        },
                                        {
                                            "d": thudate,
                                            "free": checkslot('thu', '1200 to 1400')
                                        },
                                        {
                                            "d": fridate,
                                            "free": checkslot('fri', '1200 to 1400')
                                        },
                                        {
                                            "d": satdate,
                                            "free": checkslot('sat', '1200 to 1400')
                                        },
                                        {
                                            "d": sundate,
                                            "free": checkslot('sun', '1200 to 1400')
                                        },
                                    ]
                                },
                                {
                                    "slot": "1400 to 1600",
                                    "days": [
                                        {
                                            "d": mondate,
                                            "free": checkslot('mon', '1400 to 1600')
                                        },
                                        {
                                            "d": tuedate,
                                            "free": checkslot('tue', '1400 to 1600')
                                        },
                                        {
                                            "d": weddate,
                                            "free": checkslot('wed', '1400 to 1600')
                                        },
                                        {
                                            "d": thudate,
                                            "free": checkslot('thu', '1400 to 1600')
                                        },
                                        {
                                            "d": fridate,
                                            "free": checkslot('fri', '1400 to 1600')
                                        },
                                        {
                                            "d": satdate,
                                            "free": checkslot('sat', '1400 to 1600')
                                        },
                                        {
                                            "d": sundate,
                                            "free": checkslot('sun', '1400 to 1600')
                                        },
                                    ]
                                },
                                {
                                    "slot": "1600 to 1800",
                                    "days": [
                                        {
                                            "d": mondate,
                                            "free": checkslot('mon', '1600 to 1800')
                                        },
                                        {
                                            "d": tuedate,
                                            "free": checkslot('tue', '1600 to 1800')
                                        },
                                        {
                                            "d": weddate,
                                            "free": checkslot('wed', '1600 to 1800')
                                        },
                                        {
                                            "d": thudate,
                                            "free": checkslot('thu', '1600 to 1800')
                                        },
                                        {
                                            "d": fridate,
                                            "free": checkslot('fri', '1600 to 1800')
                                        },
                                        {
                                            "d": satdate,
                                            "free": checkslot('sat', '1600 to 1800')
                                        },
                                        {
                                            "d": sundate,
                                            "free": checkslot('sun', '1600 to 1800')
                                        },
                                    ]
                                }
                            ]
                       }
                   }
        }); // vendordata update
    }); // for needtoGenerate forEach

  // code to run on server at startup
    /*
     * only needs to run once for account creation...
    var users = [
        {name:"admin1", email:"test@gmail.com",roles:'admin'}
       ];

       _.each(users, function(user){
           var id;

           id = Accounts.createUser({

               email: user.email,
               password: "123",
               profile: { name: user.name }
           });

           if (user.roles.length > 0) {
               Roles.addUsersToRoles(id, user.roles, 'default-group');
           }
       });
   */
    //Roles.addUsersToRoles('SktkPSnwH67TLtkxB', 'user');
    
    /*
    console.log(Roles.getGroupsForUser('2NRPez7iseLFaPLew'));
    console.log(Roles.getRolesForUser('2NRPez7iseLFaPLew')); //test
    console.log(Roles.getGroupsForUser('SktkPSnwH67TLtkxB'));
    console.log(Roles.getRolesForUser('SktkPSnwH67TLtkxB')); //ivandaho
    */


    //Roles.addUsersToRoles('pG77tm5ZK6omr5bxe', 'default-group');
});

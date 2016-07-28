import { Meteor } from 'meteor/meteor';
import '/imports/startup/server';

import { Vendordata } from '/imports/api/vendordata/Vendordata.js';
import { Weeks } from '/imports/api/weeks/Weeks.js';

Meteor.startup(() => {
    //script to create weeks data. does not handle updates from vendors, only initial creations

    vd = Vendordata.find({});
    var sda = []; // slot day array. for vendor availability
    vd.forEach(function (vendorinfo) {
        //console.log('one vendordata entry');
        // parse the data, for week creation
    });

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
                    console.log('comparing ' + twmf + ' with ' + mondayf + ' TRUE');
                    found = true;
                } else {
                    console.log('comparing ' + twmf + ' with ' + mondayf + ' FALSE');
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
                                            "free": 1
                                        },
                                        {
                                            "d": tuedate,
                                            "free": 1
                                        },
                                        {
                                            "d": weddate,
                                            "free": 1
                                        },
                                        {
                                            "d": thudate,
                                            "free": 1
                                        },
                                        {
                                            "d": fridate,
                                            "free": 1
                                        },
                                        {
                                            "d": satdate,
                                            "free": 1
                                        },
                                        {
                                            "d": sundate,
                                            "free": 1
                                        },
                                    ]
                                },
                                {
                                    "slot": "1000 to 1200",
                                    "days": [
                                        {
                                            "d": mondate,
                                            "free": 1
                                        },
                                        {
                                            "d": tuedate,
                                            "free": 1
                                        },
                                        {
                                            "d": weddate,
                                            "free": 1
                                        },
                                        {
                                            "d": thudate,
                                            "free": 1
                                        },
                                        {
                                            "d": fridate,
                                            "free": 1
                                        },
                                        {
                                            "d": satdate,
                                            "free": 1
                                        },
                                        {
                                            "d": sundate,
                                            "free": 1
                                        },
                                    ]
                                },
                                {
                                    "slot": "1200 to 1400",
                                    "days": [
                                        {
                                            "d": mondate,
                                            "free": 1
                                        },
                                        {
                                            "d": tuedate,
                                            "free": 1
                                        },
                                        {
                                            "d": weddate,
                                            "free": 1
                                        },
                                        {
                                            "d": thudate,
                                            "free": 1
                                        },
                                        {
                                            "d": fridate,
                                            "free": 1
                                        },
                                        {
                                            "d": satdate,
                                            "free": 1
                                        },
                                        {
                                            "d": sundate,
                                            "free": 1
                                        },
                                    ]
                                },
                                {
                                    "slot": "1400 to 1600",
                                    "days": [
                                        {
                                            "d": mondate,
                                            "free": 1
                                        },
                                        {
                                            "d": tuedate,
                                            "free": 1
                                        },
                                        {
                                            "d": weddate,
                                            "free": 1
                                        },
                                        {
                                            "d": thudate,
                                            "free": 1
                                        },
                                        {
                                            "d": fridate,
                                            "free": 1
                                        },
                                        {
                                            "d": satdate,
                                            "free": 1
                                        },
                                        {
                                            "d": sundate,
                                            "free": 1
                                        },
                                    ]
                                },
                                {
                                    "slot": "1600 to 1800",
                                    "days": [
                                        {
                                            "d": mondate,
                                            "free": 1
                                        },
                                        {
                                            "d": tuedate,
                                            "free": 1
                                        },
                                        {
                                            "d": weddate,
                                            "free": 1
                                        },
                                        {
                                            "d": thudate,
                                            "free": 1
                                        },
                                        {
                                            "d": fridate,
                                            "free": 1
                                        },
                                        {
                                            "d": satdate,
                                            "free": 1
                                        },
                                        {
                                            "d": sundate,
                                            "free": 1
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

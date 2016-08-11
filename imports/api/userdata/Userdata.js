import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Userdata = new Mongo.Collection('userdata');

AddressSchema = new SimpleSchema({
    // TODO: change to MY address schema?
    street: {
        type: String,
        max: 100
    },
    city: {
        type: String,
        max:50
    },
    state: {
    type: String,
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
    },
    zip: {
        type: String,
        regEx: /^[0-9]{5}$/
    }
});

userdataSchema = new SimpleSchema({
    _id: {
        type: String
    },
    user_name: {
        type: String
    },
    user_email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    user_tel: {
        type: String,
        // TODO: regex for phone validation
        label: "telephone number"
    },
    user_address: {
        type: [AddressSchema],
        minCount: 1
    }
});

Userdata.attachSchema(userdataSchema);
Meteor.methods({
    'userdata.changeEmail' (newmail){
        Userdata.update({_id: this.userId},
            {$set: {user_email: newmail}});
    },
    'userdata.changeTel' (newmail){
        Userdata.update({_id: this.userId},
            {$set: {user_tel: newmail}});
    },
    'userdata.setMainAddress' (i){
        var theuser = Userdata.findOne({_id: this.userId});


        var i_st = theuser.user_address[parseInt(i)].street;
        var i_c = theuser.user_address[parseInt(i)].city;
        var i_stt = theuser.user_address[parseInt(i)].state;
        var i_zc = theuser.user_address[parseInt(i)].zip;

        var i_str_street = "user_address.0.street";
        var i_str_city = "user_address.0.city";
        var i_str_state = "user_address.0.state";
        var i_str_zip = "user_address.0.zip";

        var i_set = {};
        i_set[i_str_street] = i_st;
        i_set[i_str_city] = i_c;
        i_set[i_str_state] = i_stt;
        i_set[i_str_zip] = i_zc;
        // i_set now has [i]

        var x_st = theuser.user_address[0].street;
        var x_c = theuser.user_address[0].city;
        var x_stt = theuser.user_address[0].state;
        var x_zc = theuser.user_address[0].zip;

        var x_str_street = "user_address." + i + ".street";
        var x_str_city = "user_address." + i + ".city";
        var x_str_state = "user_address." + i + ".state";
        var x_str_zip = "user_address." + i + ".zip";

        var x_set = {};
        x_set[x_str_street] = x_st;
        x_set[x_str_city] = x_c;
        x_set[x_str_state] = x_stt;
        x_set[x_str_zip] = x_zc;
        // x_set is [0]

        // switch
        Userdata.update({_id: this.userId},
            {$set: i_set});

        Userdata.update({_id: this.userId},
            {$set: x_set});

    },
    'userdata.changeAddress' (i, st, c, stt, zc){
        var str_street = "user_address." + i + ".street";
        var str_city = "user_address." + i + ".city";
        var str_state = "user_address." + i + ".state";
        var str_zip = "user_address." + i + ".zip";
        var set = {};

        set[str_street] = st;
        set[str_city] = c;
        set[str_state] = stt;
        set[str_zip] = zc;
        //NOTE: this is how you update a field based on variables
        Userdata.update({_id: this.userId},
            {$set: set});
    },
    'userdata.registerNewUser' (userObject) {
        Accounts.createUser(userObject);
    },
    'userdata.giveUserRole' () {
        var role = Meteor.user().profile.acc;
        console.log(role);
        //console.log(users.findOne({})); //CONTINUE
         Roles.addUsersToRoles(Meteor.userId(), role);
    },
    'userdata.addUserInfo' (name, tel, address1, address2, address3, address4) {
        var adobj = {street: address1,
                city: address2,
                state: address3,
                zip: address4
            };

        var email = Meteor.user().emails[0].address;
        Userdata.insert({
            _id: Meteor.userId(),
            user_name: name,
            user_email: email,
            user_tel: tel,
            user_address: [adobj]
        })
    },
    'userdata.checkIsVendor' (sess) {
        if (sess.vendorID == Meteor.userId()) {
            return true;
        }
    },
    'userdata.checkIsCustomer' (sess) {
        if (sess.custID == Meteor.userId()) {
            return true;
        } else {
            return false;
        }
    },
});

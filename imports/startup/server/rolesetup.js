import { Userdata } from '/imports/api/userdata/Userdata.js';
Meteor.users.deny({  
  update: function() {
    return true;
  }
});

AccountsTemplates.configure({
    postSignUpHook: (userId, info) => {
        //var u = Meteor.users.(findOne{userId
        Roles.addUsersToRoles(userId, info.profile.accounttype);
        Userdata.insert({
            _id: userId,
            user_name: info.profile.name,
            user_email: info.email,
            user_tel: info.profile.tel,
            user_address: [{street: info.profile.address1,
                            city: info.profile.address2,
                            state: info.profile.state,
                            zip: info.profile.zip}]
        });



    }
});

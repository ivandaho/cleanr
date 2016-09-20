import './Registration2.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

const bertCheckForValue = function(item, itemname) {
    if (!item) {
        const msg = 'The ' + itemname + ' field cannot be blank';
        Bert.alert({
            icon: 'fa-warning',
            message: msg,
            type: 'warning-alt'
        });
        // return false if the item is missing
        return false;
    }
    // else return true
    return true;
};
Template.Registration2.events({
    'click .faker': function(event){
        event.preventDefault();
        var fakename = faker.name.findName();
        var faketel = faker.phone.phoneNumber('###-###-####');
        var fakeaddress1 = faker.address.streetAddress();
        var fakeaddress2 = faker.address.city();
        var fakeaddress3 = faker.address.stateAbbr();
        var fakeaddress4 = faker.address.zipCode().substring(0,5);
        $('[name=name]').val(fakename);
        $('[name=tel]').val(faketel);
        $('[name=address1]').val(fakeaddress1);
        $('[name=address2]').val(fakeaddress2);
        $('[name=address3]').val(fakeaddress3);
        $('[name=address4]').val(fakeaddress4);
    },
    'submit form': function(event){
        event.preventDefault();
        var name = $('[name=name]').val();
        // if item is missing, return
        if (!bertCheckForValue(name, '"name"')) return;
        var tel = $('[name=tel]').val();
        if(!bertCheckForValue(tel, '"Phone Number"')) return;
        var address1 = $('[name=address1]').val();
        if(!bertCheckForValue(address1, '"Street"')) return;
        var address2 = $('[name=address2]').val();
        if(!bertCheckForValue(address2, '"City"')) return;
        var address3 = $('[name=address3]').val();
        if(!bertCheckForValue(address3, '"State"')) return;
        var address4 = $('[name=address4]').val();
        if(!bertCheckForValue(address4, '"ZIP"')) return;
        Meteor.call('userdata.giveUserRole');
        Meteor.call('userdata.addUserInfo', name, tel, address1,
                                    address2, address3, address4);
        if (Meteor.user().profile.donesetup == false
            && Meteor.user().profile.acc == 'vendor') {
         FlowRouter.go('/vendorRegistration'); // prompt to fill in vendor stuff
        } else {
         FlowRouter.go('/account');
        }
    }
});

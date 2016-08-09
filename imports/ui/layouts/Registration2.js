import './Registration2.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

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
        var tel = $('[name=tel]').val();
        var address1 = $('[name=address1]').val();
        var address2 = $('[name=address2]').val();
        var address3 = $('[name=address3]').val();
        var address4 = $('[name=address4]').val();
        Meteor.call('userdata.giveUserRole');
        Meteor.call('userdata.addUserInfo', name, tel, address1,
                                    address2, address3, address4);
        FlowRouter.go('account');
    }
});

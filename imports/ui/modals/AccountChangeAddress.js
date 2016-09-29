import { Template } from 'meteor/templating';

import './AccountChangeAddress.html';

Template.AccountChangeAddress.events({
    'keydown .form-control' (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            var index = Session.get('changeAddrID');
            var street = $("#street").val();
            var city = $("#city").val();
            var state = $("#state").val();
            var zip = $("#zip").val();
            Meteor.call('userdata.changeAddress', index, street, city, state, zip);
            Modal.hide('AccountChangeAddress');
        }
    },
    'click .changeAddrConfirmBtn' (event) {
        var index = Session.get('changeAddrID');
        var street = $("#street").val();
        var city = $("#city").val();
        var state = $("#state").val();
        var zip = $("#zip").val();
        Meteor.call('userdata.changeAddress', index, street, city, state, zip);
        Modal.hide('AccountChangeAddress');
    },
});

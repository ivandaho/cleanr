import { Template } from 'meteor/templating';

import './AccountChangePhone.html';

Template.AccountChangePhone.events({
    'keydown #changePhoneText' (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            const newtel = (event.target.value);
            Meteor.call('userdata.changeTel', newtel);
            Modal.hide('AccountChangePhone');
        }
    },
    'click .changePhoneConfirmBtn' (event) {
        event.preventDefault();
        const newtel = $("#changePhoneText").val();
        Meteor.call('userdata.changeTel', newtel);
        Modal.hide('AccountChangePhone');
    },
});

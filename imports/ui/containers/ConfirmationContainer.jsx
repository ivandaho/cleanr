// container

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

{/* import { Userdata } from '/imports/api/userdata/Userdata.js'; */}
import { Timeslots } from '/imports/api/timeslots/Timeslots.js';
import { Userdata } from '/imports/api/userdata/Userdata.js';
import { ConfirmationComponent } from '../components/ConfirmationComponent.jsx';

export default createContainer(() => {
    let sub = smTimeslots.subscribe('timeslots');
    let sub2 = smUserdata.subscribe('userdata');
    let ready = false;
    if (sub.ready() && sub2.ready()) {
        ready = true;
    }
    return {
        ready: sub.ready(),
        timeslots: Timeslots.find().fetch(),
        userData: Userdata.findOne({_id: Meteor.userId()})
    }
}, ConfirmationComponent);

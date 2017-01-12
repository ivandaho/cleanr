// container

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

{/* import { Userdata } from '/imports/api/userdata/Userdata.js'; */}
import { Timeslots } from '/imports/api/timeslots/Timeslots.js';
import { Vendorslots } from '/imports/api/vendorslots/Vendorslots.js';
import { ScheduleComponent } from '../components/ScheduleComponent.jsx';

export default createContainer(() => {
    let sub = smTimeslots.subscribe('timeslots');
    let sub2 = smVendorslots.subscribe('vendorslots');
    let ready = false;
    if (sub.ready() && sub2.ready()) {
        ready = true;
    }
    return {
        ready: sub.ready(),
        timeslots: Timeslots.find().fetch(),
        vendorslots: Vendorslots.find().fetch()
    }
}, ScheduleComponent);

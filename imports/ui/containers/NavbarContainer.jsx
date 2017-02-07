// container

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Userdata } from '/imports/api/userdata/Userdata.js';
import { NavbarComponent } from '../components/NavbarComponent.jsx';

export default createContainer(() => {
    let sub = smUserdata.subscribe('userdata');
    return {
        ready: sub.ready(),
        userData: Userdata.findOne({_id: Meteor.userId()})
    }
}, NavbarComponent);
import './NavbarUserControl.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';


Template.NavbarUserControl.events({
  'click .navbar-logout' (event){
    event.preventDefault();
    Meteor.logout();
  }
});

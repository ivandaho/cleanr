import React, {Component} from 'react';
import { IndexLink, Link, browserHistory } from 'react-router';
import { Userdata } from '/imports/api/userdata/Userdata';

import Affix from 'react-overlays/lib/Affix';

function handleLogoutClick(event) {
    event.preventDefault();
    browserHistory.push('/');
    Meteor.logout();
    smUserdata.clear();
}
function CheckRegStatus(props) {

    if (Meteor.userId()) {

        if (props.user) {
            let user_name = props.user.user_name;
            let user_email = props.user.user_email;

            if (user_name) {
                welcomeText = 'Welcome, ' + user_name;
            } else {
                if (user_email) {
                    welcomeText = 'Welcome, ' + user_email;
                } else {
                    welcomeText = 'Welcome - Please complete info';
                }
            }
        }
        return (
            <li id="accountcp"><Link to="/account">{welcomeText}</Link></li>
        )
        if (props.theUser._id) {
            return (
                <li><Link to="/registration/step2">Welcome - Please complete info</Link></li>
            )
        }
    } else return null
}

function CheckLogInStatus() {
    if (Meteor.userId()) {
        return (
            <li id="tourTarget"><Link to="#" onClick={handleLogoutClick}>LOG OUT</Link></li>
        )
    } else {
        return (
            <li id="loginlink"><Link to="/login">SIGN IN</Link></li>
        )
    }
}
function CheckAllowRegistration() {
    if (Meteor.userId()) {
        return null
    } else {
        return (
            <li><Link to="/registration">CREATE ACCOUNT</Link></li>
        )
    }
}
function CheckIsVendor() {
    if (Roles.userIsInRole(Meteor.user(), 'vendor')) {
        return (
            <li id="vendormenu" className="dropdown">
            <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Vendor Actions<span className="caret"></span></Link>
            <ul className="dropdown-menu">
            <li id="vendorcp"><Link to="/vendorcp">Control Panel</Link></li>
            <li id="vendorws"><Link to="/vendorworkschedule">Schedule</Link></li>
            <li id="vendorsf"><Link to="/vendorspecify">Specify Slots</Link></li>
            <li id="vendorcl"><Link to="/vendorcustomers">Customers</Link></li>
            <li role="separator" className="divider"></li>
            <li id="vendorsds"><Link to="/vendorregistration">Set Default Schedule</Link></li>
            </ul>
            </li>
        )
    }
    return null;
}
function atLeastOneNotification() {
    return true;
}
function NavbarRightSide(props) {
    let notificationthing;
    {/* dropdown toggle classname */}
    let ddtcn = "fa fa-lg";
    if (this.atLeastOneNotification) {
        ddtcn = ddtcn + ' fa-bell cleanr-icon-green-darker';
    } else {
        ddtcn = ddtcn + ' fa-bell-o';
    }
    return (
        <ul className="nav navbar-nav navbar-right">
            {Meteor.userId() ? (
                <NavbarNotificationButton ddtcn={ddtcn}/>
            ) : (null)
            }
            <li>
                <p className="navbar-btn-fix">
                    <button id="demobtn" className='btn btn-lg btn-info'>Demo</button>
                </p>
            </li>
            <li>
                <p className="navbar-btn-fix">
                    <Link to='/schedule' id="booknowbtn" className='btn btn-lg btn-success'>Book Now</Link>
                </p>
            </li>
        </ul>
    )
}
class NavbarNotificationButton extends Component {
    render() {
        return (
            <li id="notificationdd" className="dropdown">
                <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className={this.props.ddtcn} /></Link>
                <ul className="dropdown-menu notification-area">
                    {/* {{#each notificationfound}} */}
                    {/*   {{#if notificationIsType0 this}} */}
                    <li className="ntf"><span><Link to="/vendorsessiondetails/this.sid">Session completed: id day date timeslot</Link><i id="$_id" className="fa fa-close dismissn"></i></span></li>
                    {/* {{/if}} */}
                    {/* {{else}} */}
                    {/* <li className="ntf text-center">No new notifications</li> */}
                    {/* {{/each}} */}
                    {/* <li className="text-center"> */}
                        {/* {{#if atleastonenotification}} */}
                        {/* <div> */}
                            {/* <a className="btn btn-sm btn-success" href="/notifications/">View all</Link> */}
                            {/* <button className="btn btn-sm btn-success dismissnall"> */}
                                {/*   Dismiss all */}
                                {/* </button> */}
                            {/* </div> */}
                        {/* {{else}} */}
                        {/* <a className="ntf" href="/notifications/">View all</Link> */}
                        {/* {{/if}} */}
                        {/* </li> */}
                </ul>
            </li>
        )
    }
}
function NavbarLeftSide(props) {
    return (
        <ul className="nav navbar-nav">
            <CheckRegStatus user={props.user}/>
            {/* the ul id is used for the tour stuff.*/}
            <CheckLogInStatus />
            <CheckAllowRegistration />
            <li className="divider-vertical"></li>
            <CheckIsVendor />
        </ul>
    )
}
export class NavbarComponent extends Component {
    getUserData() {
        return Meteor.userId();
        {/* return this.props.userData; */}
    }
    render() {
        {/* TODO: fix logic, based on which registration step the user is */}
        {/* console.log('userdata: ' + this.getUserData()); */}
        if (!this.props.ready) {
            {/* TODO: better loading */}
            return null;
            return <div>Loading Navbar</div>
        }
        return (
            <Affix offsetTop={100} affixClassName="navbarScrolled">
                <nav id="mainNav" className="navbar-default navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/"><img src="/res/img/cleanr-logo.png" className="navbar-brand-logo"/></Link>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <NavbarLeftSide user={this.props.userData}/>
                            <NavbarRightSide user={this.props.userData}/>
                        </div>{/* /.navbar-collapse */}
                    </div>{/* /.container-fluid */}
                </nav>
            </Affix>
        )
    }
}

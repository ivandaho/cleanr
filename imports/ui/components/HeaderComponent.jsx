import React from 'react';
import { IndexLink, Link } from 'react-router';

export class HeaderComponent extends React.Component {
    render() {
return (
<nav id="mainNav" className="navbar-default navbar-default navbar-fixed-top">
  <div className="container">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a href="/"><img src="/res/img/cleanr-logo.png" className="navbar-brand-logo"/></a>
    </div>
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        {/* {{#if currentUser}} */}
        {/*   {{#with getuserdata}} */}
        {/*     {{#if user_name}} */}
              <li id="accountcp"><a href="{{pathFor 'account'}}">Welcome, $user_name</a></li>
            {/* {{else}} */}
              {/* <li><a href="{{pathFor 'account'}}">Welcome, $currentUser.emails.[0].address</a></li> */}
            {/* {{/if}} */}
            {/* {{else}} */}
            {/* <li><a href="/registration/step2">Welcome - Please complete info</a></li> */}
          {/* {{/with}} */}
        {/* {{/if}} */}
        {/* {{> NavbarUserControl}} */}
        {/* <li className="divider-vertical"></li> */}
        {/* {{#if isInRole 'vendor'}} */}
          <li id="vendormenu" className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Vendor Actions<span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li id="vendorcp"><a href="/vendorcp">Control Panel</a></li>
              <li id="vendorws"><a href="/vendorworkschedule">Schedule</a></li>
              <li id="vendorsf"><a href="/vendorspecify">Specify Slots</a></li>
              <li id="vendorcl"><a href="/vendorcustomers">Customers</a></li>
              <li role="separator" className="divider"></li>
              <li id="vendorsds"><a href="/vendorregistration">Set Default Schedule</a></li>
            </ul>
          </li>
        {/* {{/if}} */}
      </ul>
      <ul className="nav navbar-nav navbar-right">
        {/* {{#if currentUser}} */}
        <li id="notificationdd" className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-lg {{#if atleastonenotification}}fa-bell cleanr-icon-green-darker{{else}}fa-bell-o{{/if}}"></i></a>
          <ul className="dropdown-menu notification-area">
            {/* {{#each notificationfound}} */}
            {/*   {{#if notificationIsType0 this}} */}
            <li className="ntf"><span><a href="/vendorsessiondetails/this.sid">Session completed: id day date timeslot</a><i id="$_id" className="fa fa-close dismissn"></i></span></li>
              {/* {{/if}} */}
              {/* {{else}} */}
                      {/* <li className="ntf text-center">No new notifications</li> */}
            {/* {{/each}} */}
            {/* <li className="text-center"> */}
              {/* {{#if atleastonenotification}} */}
                {/* <div> */}
                {/* <a className="btn btn-sm btn-success" href="/notifications/">View all</a> */}
                {/* <button className="btn btn-sm btn-success dismissnall"> */}
                {/*   Dismiss all */}
                {/* </button> */}
                {/* </div> */}
              {/* {{else}} */}
                {/* <a className="ntf" href="/notifications/">View all</a> */}
              {/* {{/if}} */}
            {/* </li> */}
          </ul>
        </li>
        {/* {{/if}} */}
        <li>
          <p className="navbar-btn-fix">
            <button id="demobtn" className='btn btn-lg btn-info'>Demo</button>
          </p>
        </li>
        <li>
          <p className="navbar-btn-fix">
            <a href='/schedule' id="booknowbtn" className='btn btn-lg btn-success'>Book Now</a>
          </p>
        </li>
      </ul>
    </div>{/* /.navbar-collapse */}
  </div>{/* /.container-fluid */}
</nav>
    )
    }
}

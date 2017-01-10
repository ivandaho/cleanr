import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { App } from '/imports/ui/layouts/app';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Userdata } from '/imports/api/userdata/Userdata';

import { AccountHeaderComponent } from '/imports/ui/components/AccountHeaderComponent';

function AccountPersonalParticulars(props) {
    return (
        <div className="row section-panel bordered-section">
            <h1>Personal Particulars</h1>
            <div className="col-md-6">
                <p className="sec-heading">{props.profile._id}<br/></p>
                <p className="sec-value">{props.profile.user_name}<br/></p>
                <p id="useremail" className="sec-value gethover">{props.profile.user_email} <i className="fa fa-edit editicon changeEmail"></i></p>
                <p className="sec-value gethover">{props.profile.user_tel} <i className="fa fa-edit editicon changePhone"></i></p>
                <p className="sec-value"><Link to="/changepwd" id="changepwd" className="btn btn-default">Change Password</Link><br/></p>
            </div>
            <div className="col-md-6">
                <div className="profile-image">
                    placeholder for profile image perhaps
                </div>
        </div>
    </div>
    )

}

function AccountAdditionalAddress(props) {

    let togglePanelClassName = 'panel cursor-link ';

    if (props.exists) {
        togglePanelClassName += 'panel-info';
    } else {
        togglePanelClassName += 'panel-default';
    }

    collapseID = 'collapse' + props.addressID;
    collapseHREF = '#collapse' + props.addressID;

    return (
        <div className="row">
            <div className="panel-group">
                <div className={togglePanelClassName} data-toggle="collapse" href={collapseHREF}>

                    <div className="panel-heading">
                        <h4 className="panel-title">
                            Address {props.addressID+1}{' '}
                            <span className="sec-heading">
                                <button className="btn btn-sm btn-default changeAddress" id={props.addressID}>
                                    {props.exists ? (
                                        'Modify'
                                    ) : (
                                        'Add'
                                    )}
                                </button>
                                {props.exists ? (
                                    <button className="btn btn-sm btn-default delAddress" id={props.addressID}>
                                        Remove
                                    </button>
                                ) : ('')}
                            </span>
                        </h4>
                    </div>

                    <div id={collapseID} className="panel-collapse collapse">
                        <div className="panel-body">
                            {props.exists ? (
                                <div>
                                    <p className="sec-value">{props.address.street}<br/></p>
                                    <p className="sec-value">{props.address.city}<br/></p>
                                    <p className="sec-value">{props.address.state}<br/></p>
                                    <p className="sec-value">{props.address.zip}<br/></p>
                                    <button className="btn btn-default setaddress" id={props.addressID}>
                                        Use This Address as my Main Address
                                    </button>
                                </div>
                            ) : (
                                'None Found'
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

function checkAddressExist(address, id) {
    if (address) {
        return <AccountAdditionalAddress exists={true} address={address} addressID={id}/>
    } else {
        return <AccountAdditionalAddress exists={false} address={address} addressID={id}/>
    }
}

function AccountAddresses(props) {
    return (
        <div className="row section-panel bordered-section">
            <h1 id="useradds">Addresses</h1>
            <p className="sec-heading">Add up to 3 addresses.<br/></p>
            <br/>
            <br/>

            <div className="row">
                <div className="address-main-box">
                    <h4>
                        Main Address{' '}
                        <span className="sec-heading">
                            <button className="btn btn-sm btn-default changeAddress" id="0">
                                {props.profile.user_address[0] ? 'Modify' : 'Add'}
                            </button>
                        </span>
                    </h4>
                    {/* {{#with user_address.[0]}} */}
                    {props.profile.user_address[0] ? (
                        <div>
                            <p className="sec-value">{props.profile.user_address[0].street}<br/></p>
                            <p className="sec-value">{props.profile.user_address[0].city}<br/></p>
                            <p className="sec-value">{props.profile.user_address[0].state}<br/></p>
                            <p className="sec-value">{props.profile.user_address[0].zip}<br/></p>
                        </div>
                    ) : (
                        'None Found'
                    )}
                </div>
            </div> {/* /row */}
            {checkAddressExist(props.profile.user_address[1], 1)}
            {checkAddressExist(props.profile.user_address[2], 2)}
        </div>
    )
}

export class deleteThisAccountAddresses extends Component {
    render() {
        console.log(this.props.profile);
        return (
            <div className="row section-panel bordered-section">
                <h1 id="useradds">Addresses</h1>
                <p className="sec-heading">Add up to 3 addresses.<br/></p>
                <br/>
                <br/>

                <div className="row">
                    <div className="address-main-box">
                        <h4>
                            Main Address
                            <span className="sec-heading">
                                <button className="btn btn-sm btn-default changeAddress" id="0">
                                    {/* {this.props.userData.user_address[0] ? 'Modify' : 'Add'} */}
                                </button>
                            </span>
                        </h4>
                        {/* {{#with user_address.[0]}} */}
                        {/* {this.props.userData.user_address[0] ? ( */}
                        {/*     <p className="sec-value">{this.props.userData.user_address[0].street}<br/></p> */}
                        {/* ) : ( */}
                        {/*     'None Found' */}
                        {/* )} */}
                    </div>
                </div> {/* /row */}
            </div>
        )
    }
}

export class AccountComponent extends Component {
    render() {
        if (!this.props.ready) {
            return <div>Loading AccountComponent</div>
        }
        return (
            <div>
                <AccountHeaderComponent />
                <section id="custdetails" className="bg-light-gray">
                    <div className="container">
                        <div className="col-centered col-md-10">
                            <AccountPersonalParticulars profile={this.props.userData}/>
                            <AccountAddresses profile={this.props.userData}/>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

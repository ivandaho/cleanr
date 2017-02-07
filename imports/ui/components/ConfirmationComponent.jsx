import React, { Component } from 'react';
import { browserHistory, IndexLink, Link } from 'react-router';

import { format_date_descriptive_full, format_date_to_day } from "/imports/startup/client/util";

function ConfirmationHeaderComponent(props) {
    return (
        <div className="genericbackground">
            <div className="container headertext">
                <h1>Confirm your booking.</h1>
            </div>
        </div>
    )
}
export class ConfirmationComponent extends React.Component {
    constructor(props) {
        super(props);
        {/* this.props = {userdata: null}; */}
    }
    render() {
        if (!this.props.ready) {
            return (
                <div>
                    <ConfirmationHeaderComponent />
                    <section>
                        <div className="container">
                            <div className="col-md-12 text-center padded">
                                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                                <div style={{marginTop: "20px"}}>
                                    Loading...
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )
        }
        return (
            <div>
                <ConfirmationHeaderComponent />
                <section>
                    <div className="container">
                        <div className="row section-panel bordered-section">
                            <div className="row-same-height">
                                <BookingInformationComponent
                                    slot={this.props.timeslots[this.props.location.query.slot].slot}
                                    repeat={this.props.location.query.repeat}
                                    date={this.props.location.query.date} />
                                <CustomerDetailsComponent userData={this.props.userData} />
                            </div>
                        </div>
                        <div className="row section-panel bordered-section">
                            <div className="row-same-height">
                                {/* padded class just adds some margins for spacing purposes */}
                                <ExtraItemComponent
                                    want={this.props.location.query.mc}
                                    itemName="mc"
                                    router={this.props.router}/>
                                <ExtraItemComponent
                                    want={this.props.location.query.cc}
                                    itemName="cc"
                                    router={this.props.router}/>
                                <div className="col-md-4 col-sm-height">
                                    {/* vertical alignment super annoying, this solution is more like a workaround */}
                                    {/* tc is a text container, to align the text within it. tc is set to
                                100% height and width of the parent div which contains the text and the button,
                                see css for more info */}
                                <div className="tc">
                                    <div className="row vertical-align valignfix">
                                        {/* to vertically align elements, there has to be more than one element
                                        this placeholderthing2 helps to align the text in the third column */}
                                        <div className="placeholderthing2" />
                                        {/* this div contains the text information */}
                                        <div className="confirmtext">
                                            Clicking on the "Confirm Booking"<br/>
                                            button indicates that<br/>
                                            I have read and agreed to the<br/>
                                            terms and conditions and<br/>
                                            the service level agreement.
                                        </div>
                                    </div>
                                </div>
                                {/* placeholder again, for space before the next element (confirm button).
                                works by setting a min-height to offset. It is more noticeable on mobile than desktop */}
                                <div className="placeholderthing3" />
                                {/* button currently adds addbtn css rules */}
                                <button
                                    className="btn btn-success btn-block addbtn"
                                    id="proceedPayment">
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        )
    }
}

function BookingInformationComponent(props) {
    return (
        <div className="col-md-6 col-sm-height">
            {/* info div contains info */}
            <div className="info">
                <p className="sec-heading">Package:<br/></p>
                <p className="sec-value">1 maid for 4 hours<br/></p>

                <p className="sec-heading">Scheduling Details:<br/></p>
                <p className="sec-value">{props.slot}</p>
                <p className="sec-value">{format_date_to_day(props.date)}</p>
                {props.repeat === "true" ? (
                    <div>
                        <p className="sec-heading">First session:<br/></p>
                        <p className="sec-value">{format_date_descriptive_full(moment.utc(props.date), "YYYY-MM-DD")}<br/></p>
                    </div>
                ) : (
                    <p className="sec-value">{format_date_descriptive_full(moment.utc(props.date), "YYYY-MM-DD")}<br/></p>
                )}
            </div>
            {/* this placeholderthing is to offset some space for the button to appear at the bottom of the column */}
            {/* check css for details */}
            <div className="placeholderthing" />
            <div className="cf-btndiv">
                <Link to='/schedule' className="btn btn-warning btn-lg btn-block">Change Booking</Link>
            </div>
        </div>
    )
}

function CustomerDetailsComponent(props) {
    return (
        <div className="col-md-6 col-sm-height">
            <div className="info">
                {props.userData ? (
                    <div>
                        <p className="sec-heading">Customer Details:<br/></p>
                        <p className="sec-value">{props.userData.user_name}</p>
                        <p className="sec-value">{props.userData.user_tel}</p>
                        <p className="sec-value">{props.userData.user_email}</p>

                        <p className="sec-heading">Cleaning Location:<br/></p>
                        <p className="sec-value">{props.userData.user_address[0].street}<br/></p>
                        <p className="sec-value">{props.userData.user_address[0].city}<br/></p>
                        <p className="sec-value">{props.userData.user_address[0].state}<br/></p>
                        <p className="sec-value">{props.userData.user_address[0].zip}<br/></p>
                    </div>
                ) : (
                    <p className="sec-value">Please log in or complete your information to proceed with your booking</p>
                )}
            </div>
            {/* this placeholderthing is to offset some space for the button to appear at the bottom of the column */}
            {/* check css for details */}
            <div className="placeholderthing" />
            <div className="cf-btndiv">
                <button type="button" className="btn btn-warning btn-lg btn-block changeAddress" id="0">Change Address</button>
            </div>
        </div>
    )
}
class ExtraItemComponent extends Component {
    constructor(props) {
        super(props);
    }
    addQuery(q) {
        let query = {};
        query[q] = "true";
        const location = Object.assign({}, this.props.router.getCurrentLocation());
        Object.assign(location.query, query);
        this.props.router.replace(location);
    }
    removeQuery(q) {
        let query = {};
        query[q] = "true";
        const location = Object.assign({}, this.props.router.getCurrentLocation());
        delete location.query[q];
        this.props.router.replace(location);
    }
    render() {
        const imgsrc = "/res/img/confirmation/" + this.props.itemName + ".png";
        return (
            <div className="col-md-4 col-sm-height padded">
                {/* img-responsive and center-block helps a lot with image centerization */}
                {/* todo: make centered text on top of picture */}
                <img className="img-responsive img-circle center-block" src={imgsrc} />
                <div className="textonimg">Mattress Cleaning<br/>+RM50/Session</div>
                {/* same purpose as the placeholderthing class, but slightly shorter */}
                <div className="placeholdershort" />
                {/* addbtn can be used for further customization, for now it is the same except for height:40px */}
                {this.props.want === "true" ? (
                    <button onClick={this.removeQuery.bind(this, this.props.itemName)} type="button" className="btn btn-default btn-block addbtn">Added</button>
                ) : (
                    <button onClick={this.addQuery.bind(this, this.props.itemName)} type="button" className="btn btn-success btn-block addbtn">Add</button>
                )}
            </div>
        )
    }
}

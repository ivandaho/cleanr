import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import { format_date_descriptive_full  } from '/imports/startup/client/util';

function CustomerSessionDetailsHeaderComponent(props) {
    return (
                <div className="genericbackground">
                    <div className="container headertext">
                        <h1>Session Details <button className="btn btn-sm btn-info" id="demobtn"><i className="fa fa-question-circle fa-2x"></i></button> </h1>
                    </div>
                </div>
    )
}
function SessionInfoColumnLeft (props) {
    return (
        <div className="col-md-6 col-sm-height padded">
            <div className="hdr">
                Date
            </div>
            <div className="value">
                {format_date_descriptive_full(moment.utc(props.date))}
            </div>
            <div className="hdr">
                Time
            </div>
            <div className="value">
                {props.slot}
            </div>
        </div>
    )
}
function SessionInfoColumnRight (props) {
    return (
        <div className="col-md-6 col-sm-height">
            <div className="hdr">
                Session Status
            </div>
            <div className="value">
                {props.sessionstatus}{" "}
                {props.cancancel ? (
                    <button className="btn btn-danger btn-cancelsession">Cancel</button>
                ) : (
                    null
                )}
            </div>
            <div className="hdr">
                Next Session
            </div>
            <div className="value">
                {props.nextsess ? (
                format_date_descriptive_full(props.nextsess.date)
                ) : (
                    "None"
                )}
            </div>
            <div className="btndiv2 noselect">
                {props.prevsess ? (
                    <Link to={`/customersessiondetails/${props.prevsess._id}`}
                        className="btn btn-default nextprevbtn">
                        Previous session
                    </Link>
                ) : (
                    <Link to="#"
                        className="btn btn-default nextprevbtn disabled">
                        No Earlier Session
                    </Link>
                )}
                {props.nextsess ? (
                    <Link to={`/customersessiondetails/${props.nextsess._id}`}
                        className="btn btn-default nextprevbtn">
                        Next session
                    </Link>
                ) : (
                    <Link to="#"
                        className="btn btn-default nextprevbtn disabled">
                        No Next Session
                    </Link>
                )}
            </div>
        </div>
    )
}
export class CustomerSessionDetailsComponent extends Component {
    checkcancancel() {
        if (this.props.thesess.sessionstatus !== 0) {
            {/* you can only cancel sessions that are not completed yet */}
            return false;
        }
        // get sessiond date and slot
        sess = this.props.thesess;
        var sd = sess.date;
        strdate = moment.utc(sd).subtract(1, 'day').format('YYYY-MM-DD');
        thetimeend = this.props.thetimeslot.timeend;
        strcheck = strdate + ' ' + thetimeend;

        var check = moment.utc(strcheck, 'YYYY-MM-DD HHmm');
        if (moment.utc() < check) {
            return true;
        }
        return false;
    }
    parseSessionStatus() {
        switch (this.props.thesess.sessionstatus) {
            case 0:
                return "Not Completed";
                break;
            case 1:
                return "Completed";
                break;
            case 2:
                return "Canceled";
                break;
        }
    }
    render() {
        if (!this.props.ready) {
            return <div>Loading AccountComponent</div>
        }
        return (
            <div>
                <CustomerSessionDetailsHeaderComponent />
                <section id="sess" className="bg-light-gray">
                    <div className="container">
                        #with sess
                        #if sess._id
                        <div className="row section-panel bordered-section">
                            <div className="row">
                                <div className="col-md-12 text-center bighdr">
                                    {this.props.thesess._id}
                                </div>
                            </div>
                            <div className="row-same-height">
                                <SessionInfoColumnLeft
                                    date={this.props.thesess.date}
                                    slot={this.props.thetimeslot.slot}
                                />
                                <SessionInfoColumnRight
                                    sessionstatus={this.parseSessionStatus()}
                                    cancancel={this.checkcancancel()}
                                    nextsess={this.props.nextsess}
                                    prevsess={this.props.prevsess}
                                />
                            </div>
                        </div>
                        #with thebooking this
                        <div className="row section-panel bordered-section">
                            <div className="row">
                                <div className="col-md-12 text-center bighdr">
                                    Booking Details
                                    <p><Link to="/customerbooking/_id">_id</Link></p>
                                </div>
                            </div>
                            <div className="row-same-height">
                                <div className="col-md-6 col-sm-height">
                                    <div className="hdr bookingidhdr">
                                        Time Slot
                                    </div>
                                    <div className="value">
                                        Every this.day getslotbynum this.timeslot
                                    </div>
                                    <div className="hdr">
                                        Package
                                    </div>
                                    <div className="value">
                                        $_2 maids for 2 hours
                                    </div>
                                    <div className="hdr">
                                        Additional Services
                                    </div>
                                    <div className="value">
                                        #if mcMattress Cleaning<br/>/if
                                        #if ccCarpet Cleaning<br/>/if
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-height padded">
                                    <div className="hdr">
                                        Date Booked
                                    </div>
                                    <div className="value">
                                        dateFormat subdate
                                    </div>
                                    <div className="hdr">
                                        Sessions Completed
                                    </div>
                                    <div className="value">
                                        $completed
                                    </div>
                                    <div className="hdr">
                                        Subscription Status
                                    </div>
                                    <div className="value">
                                        substatus this
                                        #if cancancel this
                                        <Link className="btn btn-sm btn-danger btn-cancel-sub" id="this._id">Unsubscribe</Link>
                                        /if
                                    </div>
                                </div>
                            </div>
                        </div>
                        /with
                        <div className="row section-panel bordered-section">
                            <div className="row">
                                <div className="col-md-12 text-center bighdr">
                                    <span className="remarkshdr">Remarks</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="hdr">
                                        Customer Remarks:
                                    </div>
                                    <ol>
                                        #each custremarks
                                        <div className="value">
                                            <li>
                                                this
                                                #if iscustomer this
                                                <button type="button" className="btn btn-xs btn-warning cedit" id="this">Edit</button>
                                                <button type="button" className="btn btn-xs btn-danger crm" id="this">Remove</button>
                                                /if
                                            </li>
                                        </div>
                                        /each
                                        #if iscustomer this
                                        <button type="button" className="btn btn-xs cadd">Add a remark</button>
                                        /if
                                    </ol>
                                </div>
                                <div className="col-md-4 col-sm-height padded">
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="hdr">
                                        Cleaner Remarks:
                                    </div>
                                    <ol>
                                        #each vendremarkfound this
                                        <div className="value">
                                            <li>
                                                this
                                            </li>
                                        </div>
                                        /each
                                    </ol>
                                </div>
                            </div>
                        </div>
                        else
                        <div className="col-md-4 col-sm-height text-center padded">
                            We couldn't find this session. Either the URL is invalid, or you are unauthorized to view session details for this session.
                        </div>
                        /if
                        else
                        <div className="col-md-4 col-sm-height text-center padded">
                            We couldn't find this session. Either the URL is invalid, or you are unauthorized to view session details for this session.
                        </div>
                        /with
                    </div>
                </section>
            </div>
        )
    }
}

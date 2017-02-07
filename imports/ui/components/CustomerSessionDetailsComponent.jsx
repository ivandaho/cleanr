import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import {
    format_date_expand_day,
    format_date_to_day,
    format_date_day_descriptive_full,
    format_date_descriptive_full
} from '/imports/startup/client/util';

function CustomerSessionDetailsHeaderComponent(props) {
    return (
                <div className="genericbackground">
                    <div className="container headertext">
                        <h1>Session Details <button className="btn btn-sm btn-info" id="demobtn"><i className="fa fa-question-circle fa-2x"></i></button> </h1>
                    </div>
                </div>
    )
}
function SessionInfoColumnLeft(props) {
    return (
        <div className="col-md-6 col-sm-height padded">
            <div className="hdr">
                Date
            </div>
            <div className="value">
                {format_date_day_descriptive_full(props.date)}
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
function SessionInfoColumnRight(props) {
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
function BookingInfoColumnLeft(props) {
    return (
        <div className="col-md-6 col-sm-height">
            <div className="hdr bookingidhdr">
                Time Slot
            </div>
            <div className="value">
                Every {format_date_expand_day(props.thebooking.day)} {props.thetimeslot.slot}
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
                {props.thebooking.mc ? "Mattress Cleaning" : null}
                {props.thebooking.cc ? "Carpet Cleaning" : null}
            </div>
        </div>
    )
}
function BookingInfoColumnRight(props) {
    return (
        <div className="col-md-6 col-sm-height padded">
            <div className="hdr">
                Date Booked
            </div>
            <div className="value">
                {format_date_descriptive_full(props.subdate)}
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
                {props.substatus}{" "}
                {props.substatus === "Active" ? (
                    <Link className="btn btn-sm btn-danger btn-cancel-sub" id="this._id">Unsubscribe</Link>
                ) : ( null)}
            </div>
        </div>
    )
}

function RemarksAreaComponent(props) {
    return (
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
                    {props.custremarks.length > 0 ? (
                        props.custremarks.map(function(eachComment, index) {
                            return (
                                <ol key={index}>
                                    <div className="value">
                                        <li>
                                            {eachComment}{" "}
                                            <button
                                                className="btn btn-xs btn-warning cedit"
                                                id="this">Edit
                                            </button>{" "}
                                            <button
                                                className="btn btn-xs btn-danger crm"
                                                id="this">Remove
                                            </button>
                                        </li>
                                    </div>
                                </ol>
                            )
                        })
                    ) : (
                        <div>
                            None found
                        </div>
                    )}
                    <button type="button" className="btn btn-xs cadd">Add a remark</button>
                </div>
                <div className="col-md-4 col-sm-height padded">
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="hdr">
                        Cleaner Remarks:
                    </div>
                    {props.vendremarks.length > 0 ? (
                        props.vendremarks.map(function(eachComment, index) {
                            return (
                                <ol key={index}>
                                    <div className="value">
                                        <li>
                                            {eachComment}
                                        </li>
                                    </div>
                                </ol>
                            )
                        })
                    ) : (
                        <div>
                            None found
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export class CustomerSessionDetailsComponent extends Component {
    checkSubStatus() {
        const ss = this.props.thebooking.jobstatus;
        if (ss === 0) {
            return "Inactive";
        } else if (ss === 1) {
            return "Active";
        } else if (ss === 2) {
            return "Single session booking";
        }
        return "Inactive";
    }
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
            return (
                <div>
                    <CustomerSessionDetailsHeaderComponent />
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
        if (this.props.thesess == undefined) {
            return (
                <div>
                    <CustomerSessionDetailsHeaderComponent />
                    <section>
                        <div className="container">
                            <div className="col-md-12 text-center padded">
                                We couldn't find this session. Either the URL is invalid, or you are unauthorized to view session details for this session.
                            </div>
                        </div>
                    </section>
                </div>
            )
        }
        return (
            <div>
                <CustomerSessionDetailsHeaderComponent />
                <section>
                    <div className="container">
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
                        <div className="row section-panel bordered-section">
                            <div className="row">
                                <div className="col-md-12 text-center bighdr">
                                    Booking Details
                                    <p>
                                        <Link to={`/customerbooking/${this.props.thebooking._id}`}>
                                            {this.props.thebooking._id}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                            <div className="row-same-height">
                                <BookingInfoColumnLeft
                                    thebooking={this.props.thebooking}
                                    thetimeslot={this.props.thetimeslot}
                                />
                                <BookingInfoColumnRight
                                    subdate={this.props.thebooking.subdate}
                                    substatus={this.checkSubStatus()}
                                />

                            </div>
                        </div>
                        <RemarksAreaComponent
                            custremarks={this.props.thesess.custremarks}
                            vendremarks={this.props.thesess.vendremarks}
                        />
                    </div>
                </section>
            </div>
        )
    }
}

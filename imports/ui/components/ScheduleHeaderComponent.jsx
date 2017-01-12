import React, { Component } from 'react';

export default class ScheduleHeaderComponent extends Component {
    render() {
        return (
            <header className="header-schedule">
                <div className="container headertext">
                    <h1>Book a time slot. <button className="btn btn-sm btn-info" id="demobtn"><i className="fa fa-question-circle fa-2x"></i></button></h1>
                    <p>Schedule appointments up to 4 weeks in advance.</p>
                </div>
            </header>
        )
    }
}

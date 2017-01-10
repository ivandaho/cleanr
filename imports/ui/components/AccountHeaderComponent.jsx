import React from 'react';
import { IndexLink, Link } from 'react-router';

export class AccountHeaderComponent extends React.Component {
    render() {
        return (
            <div className="genericbackground">
                <div className="container headertext">

                    <h1> Account Details <button className="btn btn-sm btn-info" id="demobtn"><i className="fa fa-question-circle fa-2x"></i></button> </h1>
                </div>
            </div>
        )
    }
}

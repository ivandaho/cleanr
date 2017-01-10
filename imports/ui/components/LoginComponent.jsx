import React from 'react';
import { browserHistory, IndexLink, Link } from 'react-router';

export class LoginComponent extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        if (!email) {
            Bert.alert({
                icon: 'fa-warning',
                message: 'E-mail field cannot be blank',
                type: 'warning-alt'
            });
            return;
        }

        if (!password) {
            Bert.alert({
                icon: 'fa-warning',
                message: 'Password field cannot be blank',
                type: 'warning-alt'
            });
            return;
        }
        Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                {/* sm.clear(); */}
                {/* sm.subscribe('notifications'); */}
                if (Roles.userIsInRole(Meteor.userId(), 'customer')) {
                    browserHistory.push('/account');
                } else if (Roles.userIsInRole(Meteor.userId(), 'vendor')) {
                    browserHistory.push('/vendorcp');
                } else {
                    browserHistory.push('/account');
                    FlowRouter.go('account');
                }
            }
        });
    }
    render() {
        return (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="text-center">
                            <h1>Login</h1>
                            <br/>
                            <br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-centered col-md-6">
                            <form className="form-horizontal login" onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="email" className="col-sm-offset-1 col-sm-3 control-label">
                                        Email:
                                    </label>
                                    <div className="col-sm-6">
                                        <input type="email" name="email" id="email" className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="col-sm-offset-1 col-sm-3 control-label">
                                        Password:
                                    </label>
                                    <div className="col-sm-6">
                                        <input type="password" name="password" id="password" className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-4 col-sm-6">
                                        <input type="submit" value="Login" className="btn btn-block btn-success"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-centered col-md-6">
                            <div className="col-sm-offset-4 col-sm-6 text-center">
                                <Link to="/passwordrecovery">Password Recovery</Link> | <Link to="/registration">Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

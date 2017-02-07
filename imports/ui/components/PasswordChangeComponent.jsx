import React, { Component } from 'react';
import { browserHistory, IndexLink, Link } from 'react-router';
import zxcvbn from 'zxcvbn';

export class PasswordChangeComponent extends Component {
    handleSubmit(event) {

        event.preventDefault();
        var newpw = $('[name=newpw]').val();
        var newpw2 = $('[name=newpw2]').val();

        if (newpw != newpw2) {
            Bert.alert('Passwords do not match!', 'danger');
            return;
        }
        if (zxcvbn(newpw).score < 2) {
            // failed password strength test
            Bert.alert({
                icon: 'fa-warning',
                message: 'Password too weak. Please enter a more complex password',
                type: 'warning-alt'
            });
            return;
        }

        Meteor.call('uac.changePW', newpw, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('Password changed', 'success');
            }
        });
    }
    render() {
        if (!Meteor.userId()) {
            return (
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="text-center">
                                <h2>Not Logged in</h2>
                                <Link to='/login' className="btn btn-lg btn-success">Sign in</Link>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
        return (
            <div>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="text-center">
                                <h1>Change Password</h1>
                                <br/>
                                <br/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-centered col-md-6">
                            <form className="form-horizontal login" onSubmit={this.handleSubmit.bind(this)}>
                                    <div className="form-group">
                                        <label htmlFor="newpw" className="col-sm-offset-1 col-sm-3 control-label">
                                            New password:
                                        </label>
                                        <div className="col-sm-6">
                                            <input type="password" name="newpw" id="newpw" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="newpw2" className="col-sm-offset-1 col-sm-3 control-label">
                                            Confirmation:
                                        </label>
                                        <div className="col-sm-6">
                                            <input type="password" name="newpw2" id="newpw2" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-offset-4 col-sm-6">
                                            <input type="submit" value="Change password" className="btn btn-block btn-success" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-centered col-md-6">
                                <div className="col-sm-offset-4 col-sm-6 text-center">
                                    <Link to="/login">Sign in</Link> | <Link to="/registration">Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

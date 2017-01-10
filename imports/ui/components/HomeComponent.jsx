import React from 'react';
import { IndexLink, Link } from 'react-router';

export class HomeComponent extends React.Component {
    render() {
        return (
            <div>
                <header className="header-frontpage bigheader">
                    <div className="container headertext">
                        <h1>A clean home starts here.</h1>
                        <p>Book part-time cleaners, conveniently.</p>
                        <p>
                            <Link to='/schedule' className='btn btn-lg btn-success btn-cleanr'>Book Now</Link>
                        </p>
                    </div>
                </header>
                <section id="how-it-works">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-heading">What we Offer</h2>
                                {/*h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3 */}
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fa fa-circle fa-stack-2x cleanr-icon-green"></i>
                                <i className="fa fa-th-list fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="service-heading">Scheduling</h4>
                            <p className="text-muted">Get an overview of all the time slots with available maids. Directly book the slots you want, immediately. No waiting for confirmation required.</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fa fa-circle fa-stack-2x cleanr-icon-green"></i>
                                <i className="fa  fa-group fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="service-heading">Part-time Maids</h4>
                            <p className="text-muted">Enjoy the convenience of reliable part-time maids who will ensure that your home is spick and span. Maids come from agencies that are fully-vetted by Cleanr.my, so sit back, relax, and look forward to your clean home.</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fa fa-circle fa-stack-2x cleanr-icon-green"></i>
                                <i className="fa fa-credit-card fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="service-heading">Automatic Billing</h4>
                            <p className="text-muted">Make payment securely online. Payments are based on a subscription model, and will automatically recur every month until you opt out from the service. Say goodbye to the hassle of making monthly cash payments. </p>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        )
    }
}

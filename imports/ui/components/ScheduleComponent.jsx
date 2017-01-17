import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'react-bootstrap';

import ScheduleHeaderComponent from '/imports/ui/components/ScheduleHeaderComponent';
import { Vendorslots } from '/imports/api/vendorslots/Vendorslots';
import { Timeslots } from '/imports/api/timeslots/Timeslots';

const daysToGenerate = 35;

export class ScheduleComponent extends Component {
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {msg_slot: '', msg_day: ''};
    }
    openModal(slot, day) {
        this.setState({msg_slot: slot, msg_day: day});
        this.setState({ showModal: true });
    }
    closeModal() {
        this.setState({ showModal: false });
    }
    scrollToPage() {
        // TODO: click pagination to scroll to specific week
        console.log('done');
        document.getElementById('scrollthis').scrollLeft = 200;
    }
    render() {
        if (!this.props.ready) {
            {/* TODO: better loading */}
            return <div>Loading Schedule Page</div>
        }
        return (
            <div>
                <BookingModalComponent msg_slot={this.state.msg_slot} msg_day={this.state.msg_day} trigger={this.closeModal} visible={this.state.showModal}/>
                <ScheduleHeaderComponent />
                <section>
                    <div className="container">
                        <SchedulePaginationBar />
                        <ScheduleTable openModal={this.openModal} timeslots={this.props.timeslots}/>
                    </div>
                </section>
            </div>
        )
    }
}

class SchedulePaginationBar extends Component {
    render() {
        return (
            <ul className="pagination">
                <li className="changeweekbtn active" id="target-1"><a href="#">1</a></li>
                <li className="changeweekbtn" id="target-2"><a href="#">2</a></li>
                <li className="changeweekbtn" id="target-3"><a href="#">3</a></li>
                <li className="changeweekbtn" id="target-4"><a href="#">4</a></li>
                <li className="changeweekbtn" id="target-5"><a href="#">5</a></li>
            </ul>
        )
    }
}

class ScheduleTable extends Component {
    constructor(props) {
        super(props);
        this._handleScroll = this._handleScroll.bind(this);
        this.state = {
            sow: moment.utc().startOf('week').add(1, 'days'),
            scrollindex: 0
        };
    }
    _handleScroll() {
        const offset = document.getElementById('tsHeader').getBoundingClientRect().right;

        scrollPos = document.getElementById('scrollthis').scrollLeft + offset;

        const mondayScrollLefts = this.state.mondayScrollLefts;
        var done = false;
        const table = this;
        mondayScrollLefts.forEach(function(columnLeft, index) {
            if (scrollPos > columnLeft && !done) {
                {/* console.log('passed ' + (5 - index)); */}
                done = true;
                let target;
                switch(index) {
                    case 4:
                        target= "#target-1";
                        break;
                    case 3:
                        target= "#target-2";
                        break;
                    case 2:
                        target= "#target-3";
                        break;
                    case 1:
                        target= "#target-4";
                        break;
                    default:
                        target= "#target-5";
                        break;
                }
                $(".active").removeClass("active");
                $(target).addClass("active");
                return;
            }
        });
        return;
        let scrollpos = $("#scrollthis").scrollLeft();
        let tablewidth = $(".table-special").width();
        let ratio = scrollpos/tablewidth;
        if ($(window).width() > 1199) {
            // if window width is less than 1200,
            // page 5 is already reachable
            if (ratio > 0.7) {
                indexOfMin = 5;
            }
        }

        if (indexOfMin !== this.state.scrollindex) {
            // set new scrollindex only if scrollindex is different
            this.setState({scrollindex: indexOfMin});

            let targetclass = "#s" + this.state.sow.clone().add(indexOfMin - 1, 'weeks').format("DD-MM");
            $(".active").removeClass("active");
            $(targetclass).addClass("active");
        }

    }
    componentDidMount() {
        this.theTable.addEventListener('scroll', this._handleScroll);

        mondayScrollLefts = [];
        for(let i = 0; i < 5; i++) {
            let mdate = moment.utc().startOf('week').add(1, 'days').add(i, 'weeks').format("DD-MM");
            mondayScrollLefts.push(document.getElementById(mdate).getBoundingClientRect().left);
        }
        mondayScrollLefts.reverse();
        this.setState({'mondayScrollLefts':mondayScrollLefts});
    }
    componentWillUnmount() {
        this.theTable.removeEventListener('scroll', this._handleScroll);
    }
    renderTableHeaders() {
        return (
            <thead>
                <tr>
                    <th id="tsHeader">Time Slots</th>
                    {/* render headers for each time day */}
                    {this.getDateDataForHeaders().map(function(adate) {
                        return (
                            <th className={adate.lastday ? 'tsbtn divided' : 'tsbtn'} id={adate.date} key={adate.date}>
                                {adate.day}<br/>
                                {adate.date}
                            </th>
                        )
                    })}
                </tr>
            </thead>
        );
    }
    getDateDataForHeaders() {
        var dateHeaderData = [];
        var mdate = moment.utc().startOf('week').add(1, 'days');
        for(i=0; i<daysToGenerate; i++) {
            themdate = mdate.clone().add(i, 'days');
            let thedate = themdate.format('DD-MM');
            let theday = themdate.format('dddd');
            var oneday;
            if (i % 7 == 0) {
                oneday = {day: theday, date: thedate, lastday:true};
            } else {
                oneday = {day: theday, date: thedate};
            }
            dateHeaderData.push(oneday);
        }
        return dateHeaderData;
    }
    render() {
        return (
            <div className="table-responsive" ref={(table) => {this.theTable = table}}id="scrollthis">
                <table className="table table-special table-hover" data-spy="scroll" data-target="#pager">
                    {this.renderTableHeaders()}
                    <TableBodyComponent openModal={this.props.openModal} timeslots={this.props.timeslots} />
                </table>
            </div>
        )
    }
}
class TableBodyComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <tbody>
                {this.props.timeslots.map(function(aTimeSlotRow) {
                    return (
                        <TimeSlotRowComponent key={aTimeSlotRow.num} ts={aTimeSlotRow} openModal={this.props.openModal} />
                    )
                }, this) }
            </tbody>
        )
    }
}
class TimeSlotRowComponent extends Component {
    constructor(props) {
        super(props);
    }
    getSlotAvailability(timeSlot) {
        {/* var jdate = Session.get('currweek'); */}
        {/* var mdate = moment.utc(jdate); */}
        {/* TODO: session variables for current week */}
        var mdate = moment.utc().startOf('week').add(1, 'days');
        // var d =  mdate.add(i, 'days').format("YYYY-MM-DD");
        var thething = [];
        for(i = 0; i<daysToGenerate; i++) {
            var oneday;
            if (i % 7  == 0) {
                oneday = {date: mdate.clone().add(i, 'days').format("YYYY-MM-DD"),n: timeSlot, lastday: true};
            } else {
                oneday = {date: mdate.clone().add(i, 'days').format("YYYY-MM-DD"),n: timeSlot};
            }
            thething.push(oneday);
        };
        return thething;
    }
    render() {
        return (
            <tr>
                <td>
                    {this.props.ts.slot}
                </td>
                {this.getSlotAvailability(this.props.ts.num).map(function(aButton) {
                    return (
                        <EachDayCellComponent abtn={aButton} ts={this.props.ts} key={aButton.date} openModal={this.props.openModal} />
                    )
                }, this)}
            </tr>
        )
    }
}
class EachDayCellComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <td
                className={this.props.abtn.lastday ? 'tsbtn divided' : 'tsbtn'}>
                <BookButton openModal={this.props.openModal} date={this.props.abtn.date} num={this.props.ts.num} />
            </td>
        )
    }
}
class BookButton extends Component {
    constructor(props) {
        super(props);
    }
    hasFreeSlot(date, slot) {
        var jdate = moment.utc(date).toDate();

        // var ds = Vendorslots.find({d: new Date(jdate)});

        // TODO: is this the most optimized way to get data?
        // looks like it will query nWeeks * nSlots each page refresh.
        var ds = Vendorslots.find({
                                    $and: [
                                        {d: new Date(jdate)},
                                        {s: parseInt(slot)}
                                    ]
                                }); // find for that day
        var count = ds.count();
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    }
    dateOver(date, slot) {
        var theTS = Timeslots.findOne({num: slot});
        datestr = moment.utc(date).format('YYYY-MM-DD');
        checkstr = datestr + ' ' + theTS.timestart;
        if (moment.utc(checkstr, 'YYYY-MM-DD HHmm') < moment.utc().add(2, 'days')) {
            return true;
        }
        return false;
    }
    render() {
        if (this.dateOver(this.props.date, this.props.num)) {
            return (
                <Button className="btn disabled">Too Late</Button>
            )
        }

        if (this.hasFreeSlot(this.props.date, this.props.num)) {
            let id = this.props.date + ' ' + this.props.num;
            return (
                <Button onClick={this.props.openModal.bind(this, this.props.num, this.props.date)} className="btn btn-success bookbtn" id={id}>
                    Book this slot
                </Button>
            )
        }

        return (
            <Button className="btn disabled">
                Not available
            </Button>
        )
    }
}
class BookingModalComponent extends Component {
    render() {
        let msg_day = 'msg_day';
        let msg_date = 'msg_date';
        let ts_slot = 'ts_slot';
        return (
            <Modal show={this.props.visible} onHide={this.props.trigger}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row text-center">
                        <h4>You have selected the {this.props.msg_day} {this.props.msg_date} {this.props.msg_slot} time slot.</h4><br/>
                        Please select a session type.
                    </div>
                    <div className="row">
                        <div className="text-center">
                            Single session: a once-off cleaning session.
                        </div>
                    </div>
                    <div className="row">
                        <div className="text-center">
                            or:
                        </div>
                    </div>
                    <div className="row">
                        <div className="text-center">
                            Weekly Sessions: Billed once a month. Cancel anytime.
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success">Single Session</Button>
                    <Button bsStyle="success">Weekly Sessions</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import ReactDOM from 'react-dom';

import ScheduleHeaderComponent from '/imports/ui/components/ScheduleHeaderComponent';
import { Vendorslots } from '/imports/api/vendorslots/Vendorslots';
import { Timeslots } from '/imports/api/timeslots/Timeslots';

const daysToGenerate = 35;

export class ScheduleComponent extends React.Component {
    render() {
        return (
            <div>
                <ScheduleHeaderComponent />
                <section>
                    <div className="container">
                        <SchedulePaginationBar />
                        <ScheduleTable timeslots={this.props.timeslots}/>
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
                <li className="changeweekbtn active" id="s$weekdates 0$"><a href="#">1</a></li>
                <li className="changeweekbtn" id="s$weekdates 1$"><a href="#">2</a></li>
                <li className="changeweekbtn" id="s$weekdates 2$"><a href="#">3</a></li>
                <li className="changeweekbtn" id="s$weekdates 3$"><a href="#">4</a></li>
                <li className="changeweekbtn" id="s$weekdates 4$"><a href="#">5</a></li>
            </ul>
        )
    }
}

function getSlotAvailability(timeSlot) {
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

class BookButton extends Component {
    hasFreeSlot(date, slot) {
        var jdate = moment.utc(date).toDate();

        //var ds = Vendorslots.find({d: new Date(jdate)});
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
                <button className="btn disabled">Too Late</button>
            )
        }

        if (this.hasFreeSlot(this.props.date, this.props.num)) {
            let id = this.props.date + ' ' + this.props.num;
            return (
                <button className="btn btn-success bookbtn" id={id}>
                    Book this slot
                </button>
            )
        }

        return (
            <button className="btn disabled">
                Not available
            </button>
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
        return;
        {/* TODO: implement scrolling pagination */}
        {/* console.log(this.state.sow); */}
        {/* return; */}
        var ar = [];
        let containeroffset = $('.container').offset().left;
        var o = $(".container").offset().left;
        var elepos;

        for (var s = 0; s < 5; s++) {
            // for 5 weeks
            var p = "#" + this.state.sow.clone().add(s, 'weeks').format("DD-MM");
            elepos = $(p).offset().left - containeroffset - 130;
            // offset is 130 for the first column

            if (elepos <= 0) {
                // if scrollpos less than 0
                // ignore by setting scrollpos to a large number
                elepos = Number.MAX_VALUE;
                // elepos = 4000;
            }
            ar.push(elepos);
        }

        var indexOfMin;

        // http://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
        indexOfMin = ar.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);
        if (indexOfMin === 0) {
            // if undetermined, set index to 5
            indexOfMin = 5;
        }

        // get ratio of scrollpos against tablewidth
        // to determine if the table has been scrolled to end
        let scrollpos = $("#scrollthis").scrollLeft();
        let tablewidth = $(".table-special").width();
        let ratio = scrollpos/tablewidth;
        // console.log($(window).width() + "|" + ratio);
        // console.log(ar + " | " + indexOfMin);
        // console.log(scrollpos.scrollLeft() + " | " + tablewidth.width());
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
        const list = ReactDOM.findDOMNode(this.refs.list)
        list.addEventListener('scroll', this._handleScroll);
    }
    componentWillUnmount() {
        const list = ReactDOM.findDOMNode(this.refs.list)
        list.removeEventListener('scroll', this._handleScroll);
    }
    renderTableHeaders() {
        return (
            <thead>
                <tr>
                    <th>Time Slots</th>
                    {/* render headers for each time day */}
                    {this.getDateDataForHeaders().map(function(adate) {
                        return (
                            <th className={adate.lastday ? 'divided' : ''} id={adate.date} key={adate.date}>
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
    renderTableBody(timeslots) {
        {/* build 5 rows by mapping */}
        {/* var timeslots = []; */}

        return (
            <tbody>
                {timeslots.map(function(aTimeSlotRow) {
                    return (
                        <tr key={aTimeSlotRow.slot}>
                            <td>
                                {aTimeSlotRow.slot}
                            </td>
                            {getSlotAvailability(aTimeSlotRow.num).map(function(aButton) {
                                return (
                                    <td key={aButton.date}
                                        className={aButton.lastday ? 'tsbtn divided' : 'tsbtn'}>
                                        <BookButton date={aButton.date} num={aTimeSlotRow.num} />
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        )
    }
    render() {
        return (
            <div className="table-responsive" ref="list" id="scrollthis">
                <table className="table table-special table-hover" data-spy="scroll" data-target="#pager">
                    {this.renderTableHeaders()}
                    {this.renderTableBody(this.props.timeslots)}
                </table>
            </div>
        )
    }
}

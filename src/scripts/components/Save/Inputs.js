'use strict';

var React = require('react/addons');

var Auth = require('../../helpers/Auth');
var Pathfinder = require('../../helpers/Pathfinder');

var Input = require('../Model/FormInput');



var SaveInputs = React.createClass({
    getInitialState: function() {
        return {
            partyOptions: [],
            locationOptions: [],
            daytime: null
        }
    },

    componentWillMount: function() {
        this.getPartyOptions();
        this.getLocationOptions();
    },

    componentDidMount: function() {
        this.handleDayTime();
    },

    getPartyOptions: function() {
        var self = this;

        Auth.User.getPartyOptions()
            .done(function(options) {
                self.setState({partyOptions: options});
            });
    },

    getLocationOptions: function() {
        var self = this;
        var campaign = self.props.campaign;

        campaign.getLocationOptions()
            .done(function(options) {
                self.setState({locationOptions: options});
            });
    },

    handleDayTime: function() {
        var segs = this.refs.segs.getDOMNode().querySelector('[name=segs]').value;

        var daytime = Pathfinder.getDayTime(segs);

        this.setState({daytime: daytime});
    },

    render: function() {
        var attrs = this.props.attrs;

        return (
            <div>
                <Input
                    type="select"
                    name="party_id"
                    placeholder="Party"
                    defaultValue={attrs.party_id}
                    options={this.state.partyOptions}
                />
                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type="select"
                            name="location_id"
                            placeholder="Location"
                            defaultValue={attrs.location_id}
                            options={this.state.locationOptions}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="segs"
                            ref="segs"
                            placeholder="Segs (48 = 1 Day)"
                            defaultValue={attrs.segs || 0}
                            onChange={this.handleDayTime}
                            addonBefore="Current Segs"
                            addonAfter={this.state.daytime}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="xp"
                            placeholder="Current XP"
                            defaultValue={attrs.xp || 0}
                            addonBefore="Current XP"
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="coordinate"
                            placeholder="Coordinate"
                            defaultValue={attrs.coordinate || 0}
                            addonBefore="Coordinate"
                        />
                    </div>
                </div>
                <Input
                    type="textarea"
                    name="notes"
                    placeholder="Notes"
                    defaultValue={attrs.notes}
                />
            </div>
            );
    }
});

module.exports = SaveInputs;
'use strict';

var React = require('react/addons');

var Auth = require('../../helpers/Auth');
var Pathfinder = require('../../helpers/Pathfinder');

var Input = require('../Model/FormInput');



var SaveInputs = React.createClass({
    getInitialState: function() {
        return {
            partyOptions: []
        }
    },

    componentWillMount: function() {
        this.getPartyOptions();
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

    handleDayTime: function() {
        var segs = this.refs.segs.getDOMNode().querySelector('[name=segs]').value;

        var daytime = Pathfinder.getDayTime(segs);

        this.refs.daytime.getDOMNode().querySelector('[name=daytime]').setAttribute('value', daytime);
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
                    <div className="col-md-4">
                        <Input
                            type="text"
                            name="xp"
                            placeholder="Current XP"
                            defaultValue={attrs.xp || 0}
                            addonBefore="Current XP"
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            type="text"
                            name="segs"
                            ref="segs"
                            placeholder="Segs (48 = 1 Day)"
                            defaultValue={attrs.segs || 0}
                            onChange={this.handleDayTime}
                            addonBefore="Current Segs"
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            type="text"
                            name="daytime"
                            ref="daytime"
                            placeholder="Daytime"
                            readOnly
                            addonBefore="Daytime"
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
'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Input = require('../../Model/FormInput');



var EncounterOtherInputs = React.createClass({
    render: function() {
        var attrs = this.props.attrs;
        var details = _.isObject(attrs.details) ? attrs.details : {};

        return (
            <div className="details">
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    defaultValue={details.name}
                />
                <Input
                    type="textarea"
                    name="description"
                    placeholder="Details"
                    defaultValue={details.description}
                    rows="10"
                />
            </div>
            );
    }
});


module.exports = EncounterOtherInputs;
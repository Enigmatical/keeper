'use strict';

var React = require('react/addons');

var Pathfinder = require('../../helpers/Pathfinder');

var Input = require('../Model/FormInput');



var BattleInputs = React.createClass({
    render: function() {
        var attrs = this.props.attrs;

        return (
            <div>
                <Input
                    type="text"
                    name="name"
                    defaultValue={attrs.name}
                />

                <Input
                    type="select"
                    name="type"
                    options={Pathfinder.getBattleTypeOptions()}
                    defaultValue={attrs.type || 'minor'}
                />
            </div>
            );
    }
});

module.exports = BattleInputs;
'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Modal = require('./ModelRemoveModal');



var BattleRemoveModal = React.createClass({
    render: function () {
        return (
            <Modal
                titlePart="Group"
                target={this.props.battle}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = BattleRemoveModal;


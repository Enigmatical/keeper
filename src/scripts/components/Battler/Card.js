'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;

var FormModal = require('../Model/FormModal');
var RemoveModal = require('../Model/RemoveModal');

require('../../../styles/ItemLink.css');



var BattlerCard = React.createClass({
    render: function () {
        var battler = this.props.target;
        var foe = battler.foe;

        if (_.isObject(foe)) {
            return (
                <div className="item-link-wrapper col-md-6">
                    <div className="item-link foe-link">
                        <p className="pull-left">
                            <strong>{foe.attrs.name}</strong>{', ' + battler.attrs.type} <small className="text-muted">x {battler.attrs.count}</small>
                        </p>
                        <ButtonToolbar className="pull-right">
                            <FormModal link={true} target={battler} model={this.props.model} parent={this.props.parent} inputs={this.props.inputs} onUpdate={this.props.onUpdate} />
                            <RemoveModal link={true} target={battler} onUpdate={this.props.onUpdate} />
                        </ButtonToolbar>
                    </div>
                </div>
                );
        }
        else {
            return(<span />);
        }
    }
});

module.exports = BattlerCard;
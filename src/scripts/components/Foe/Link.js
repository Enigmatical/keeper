'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;

var UnlinkModal = require('./UnlinkModal');

require('../../../styles/ItemLink.css');



var FoeLink = React.createClass({
    render: function () {
        var target = this.props.target;
        var foe = this.props.link;
        var index = this.props.index;

        return (
                <div className="item-link-wrapper col-md-6">
                    <div className="item-link foe-link">
                        <p className="pull-left">
                            <strong>{foe.attrs.name}</strong> <small className="text-muted">x {foe.count}</small>
                        </p>
                        <ButtonToolbar className="pull-right">
                            <UnlinkModal target={target} index={index} onUpdate={this.props.onUpdate} />
                        </ButtonToolbar>
                    </div>
                </div>
            );
    }
});

module.exports = FoeLink;



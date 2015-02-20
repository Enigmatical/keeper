'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;

var UnlinkModal = require('./UnlinkModal');

require('../../../styles/ItemLink.css');



var CharacterLink = React.createClass({
    render: function () {
        var target = this.props.target;
        var character = this.props.link;
        var index = this.props.index;

        return (
            <div className="item-link-wrapper col-md-6">
                <div className="item-link character-link">
                    <p className="pull-left">
                        <strong>{character.attrs.name}</strong> <small>{character.attrs.type}</small>
                    </p>
                    <ButtonToolbar className="pull-right">
                        <UnlinkModal name="Shopkeeper" target={target} index={index} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = CharacterLink;



'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AttrBlock = require('../Model/AttrBlock');

var InfoModal = require('./InfoModal');

require('../../../styles/ItemCard.css');



var AdventureCard = React.createClass({
    render: function () {
        var target = this.props.target;

        return (
            <div className="item-card adventure-card">
                <div className="card-header">
                    <p className="pull-left">
                        {target.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{this.props.type || target.attrs.type}</small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock type="flavor" attr={target.attrs.flavor} />
                    <AttrBlock type="details" attr={target.attrs.details} />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <InfoModal model={this.props.model} target={this.props.target} info={this.props.getInfo()} />
                        {this.props.leftButtons}
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <span />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = AdventureCard;
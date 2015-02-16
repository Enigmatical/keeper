'use strict';

var React = require('react/addons');
var Markdown = require('markdown').markdown;

var MenuItem = require('react-bootstrap').MenuItem;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AreaFormModal = require('./AreaFormModal');
var AreaRemoveModal = require('./AreaRemoveModal');

require('../../styles/ItemCard.css');



var AreaCard = React.createClass({
    render: function () {
        var flavor = Markdown.toHTML(this.props.area.attrs.flavor);
        var appearance = Markdown.toHTML(this.props.area.attrs.appearance);
        var history = Markdown.toHTML(this.props.area.attrs.history);

        return (
            <div className="item-card area-card">
                <div className="card-header">
                    <p>
                        {this.props.area.attrs.name}&nbsp;&nbsp;<small className="text-muted">{this.props.area.attrs.category}</small>
                    </p>
                </div>
                <div className="card-body">
                    <p className="body-header">Flavor</p>
                    <div className="body-content" dangerouslySetInnerHTML={{__html: flavor}} />
                    <p className="body-header">Appearance</p>
                    <div className="body-content" dangerouslySetInnerHTML={{__html: appearance}} />
                    <p className="body-header">History</p>
                    <div className="body-content" dangerouslySetInnerHTML={{__html: history}} />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <span />
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <AreaFormModal location={this.props.location} area={this.props.area} onUpdate={this.props.onUpdate} />
                        <AreaRemoveModal area={this.props.area} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = AreaCard;
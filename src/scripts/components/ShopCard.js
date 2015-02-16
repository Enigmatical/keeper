'use strict';

var React = require('react/addons');
var Markdown = require('markdown').markdown;

var MenuItem = require('react-bootstrap').MenuItem;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var ShopFormModal = require('./ShopFormModal');
var ShopRemoveModal = require('./ShopRemoveModal');

require('../../styles/ItemCard.css');



var ShopCard = React.createClass({
    render: function () {
        var flavor = Markdown.toHTML(this.props.shop.attrs.flavor);
        var appearance = Markdown.toHTML(this.props.shop.attrs.appearance);
        var history = Markdown.toHTML(this.props.shop.attrs.history);

        return (
            <div className="item-card shop-card">
                <div className="card-header">
                    <p>
                        {this.props.shop.attrs.name}&nbsp;&nbsp;<small className="text-muted">{this.props.shop.attrs.category}</small>
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
                        <ShopFormModal location={this.props.location} shop={this.props.shop} onUpdate={this.props.onUpdate} />
                        <ShopRemoveModal shop={this.props.shop} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = ShopCard;



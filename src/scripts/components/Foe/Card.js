'use strict';

var React = require('react/addons');

var Auth = require('../../helpers/Auth');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('../Model/FormModal');
var CloneModal = require('../Model/CloneModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('../Model/AttrBlock');

require('../../../styles/ItemCard.css');



var FoeCard = React.createClass({
    render: function () {
        var foe = this.props.foe;

        return (
            <div className="item-card foe-card">
                <div className="card-header">
                    <p className="pull-left">
                        {foe.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{foe.attrs.type}&nbsp;&nbsp;<strong>CR {foe.attrs.challenge}</strong></small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock type="flavor" attr={foe.attrs.flavor} />
                    <section className="row">
                        <AttrBlock type="custom" className="text-wetasphalt bg-wetasphalt" attr={foe.attrs.quick} />
                    </section>
                    <section className="row">
                        <AttrBlock type="stat" name="Pawns" glyph="count" attr={foe.attrs.count} />
                        <AttrBlock type="stat" name="Page" glyph="page" attr={foe.attrs.page} />
                    </section>
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <span />
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal target={foe} model={this.props.model} parent={Auth.User} inputs={this.props.inputs} onUpdate={this.props.onUpdate} />
                        <CloneModal target={foe} model={this.props.model} parent={Auth.User} onUpdate={this.props.onUpdate} />
                        <RemoveModal target={foe} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = FoeCard;
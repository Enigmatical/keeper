'use strict';

var React = require('react/addons');

var Auth = require('../../helpers/Auth');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('../Model/FormModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('../Model/AttrBlock');

require('../../../styles/ItemCard.css');



var PartyCard = React.createClass({
    render: function () {
        var party = this.props.party;

        return (
            <div className="item-card party-card">
                <div className="card-header">
                    <p className="pull-left">
                        {party.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{party.attrs.type}</small>
                    </p>
                </div>
                <div className="card-body">
                    <section className="row">
                        <AttrBlock type="stat" name="Size" glyph="party" attr={party.attrs.count} />
                    </section>
                    <AttrBlock type="details" attr={party.attrs.details} />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <span />
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal target={party} model={this.props.model} parent={Auth.User} inputs={this.props.inputs} onUpdate={this.props.onUpdate} />
                        <RemoveModal target={party} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = PartyCard;
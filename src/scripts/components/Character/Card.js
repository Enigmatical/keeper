'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('./FormModal');
var RemoveModal = require('./RemoveModal');
var AttrBlock = require('../Model/AttrBlock');

require('../../../styles/ItemCard.css');



var CharacterCard = React.createClass({
    render: function () {
        var character = this.props.character;

        return (
            <div className="item-card character-card">
                <div className="card-header">
                    <p className="pull-left">
                        {character.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{character.attrs.type}</small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Personality" attr={character.attrs.flavor} markdown />
                    <AttrBlock name="Stats & Skills" attr={character.attrs.details} markdown />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <span />
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal character={character} onUpdate={this.props.onUpdate} />
                        <RemoveModal character={character} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = CharacterCard;
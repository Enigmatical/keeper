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
                    <AttrBlock type="flavor" attr={character.attrs.flavor} />
                    <section className="row">
                        <AttrBlock type="custom" name="Stats & Skills" attr={character.attrs.details} />
                    </section>
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <span />
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal target={character} model={this.props.model} parent={Auth.User} inputs={this.props.inputs} onUpdate={this.props.onUpdate} />
                        <CloneModal target={character} model={this.props.model} parent={Auth.User} onUpdate={this.props.onUpdate} />
                        <RemoveModal target={character} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = CharacterCard;
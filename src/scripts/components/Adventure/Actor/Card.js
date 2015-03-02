'use strict';

var React = require('react/addons');
var _ = require('lodash');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AttrBlock = require('../../Model/AttrBlock');

require('../../../../styles/ItemCard.css');



var ActorAdventureCard = React.createClass({
    render: function () {
        var self = this;
        var target = self.props.target;
        var character = self.props.target.character;

        return (
            <div className="item-card adventure-card encounter-card">
                <div className="card-header">
                    <p className="pull-left">
                        {character.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{character.attrs.type}</small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock type="flavor" attr={target.attrs.flavor} />
                    <section className="row">
                        <AttrBlock type="custom" className="text-wetasphalt bg-pumpkin" attr={character.attrs.details} />
                    </section>
                    <AttrBlock type="details" attr={target.attrs.details} />
                </div>
            </div>
            );
    }
});

module.exports = ActorAdventureCard;
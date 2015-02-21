'use strict';

var React = require('react/addons');

var Auth = require('../../helpers/Auth');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var LinkModal = require('../Foe/LinkModal');
var FormModal = require('../Model/FormModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('../Model/AttrBlock');
var Link = require('../Foe/Link');

require('../../../styles/ItemCard.css');



var BattleCard = React.createClass({


    render: function () {
        var self = this;
        var battle = self.props.battle;

        var challengeRating = battle.attrs.challenge ? ('  CR ' + battle.attrs.challenge) : '';

        return (
            <div className="item-card battle-card">
                <div className="card-header">
                    <p className="pull-left">
                        {battle.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{battle.attrs.type}<strong>{challengeRating}</strong></small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Flavor" attr={battle.attrs.flavor} markdown />
                    <AttrBlock name="Details" attr={battle.attrs.details} markdown />
                    <div className="card-links">
                        {battle.attrs.foes.map(function(foe, index) {
                            return (
                                <Link key={foe.id+index} target={battle} link={foe} index={index} onUpdate={self.props.onUpdate} />
                                );
                        })}
                    </div>
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <LinkModal target={battle} onUpdate={self.props.onUpdate} />
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal target={battle} model={this.props.model} parent={Auth.User} inputs={this.props.inputs} onUpdate={self.props.onUpdate} />
                        <RemoveModal target={battle} onUpdate={self.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = BattleCard;



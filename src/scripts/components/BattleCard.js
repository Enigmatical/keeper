'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('./BattleFormModal');
var RemoveModal = require('./BattleRemoveModal');
var AttrBlock = require('./ModelAttrBlock');

require('../../styles/ItemCard.css');



var BattleCard = React.createClass({
    render: function () {
        var battle = this.props.battle;

        return (
            <div className="item-card battle-card">
                <div className="card-header">
                    <p className="pull-left">
                        {battle.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{battle.attrs.type}&nbsp;&nbsp;<strong>CR {battle.attrs.challenge}</strong></small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Flavor" attr={battle.attrs.flavor} markdown />
                    <AttrBlock name="Details" attr={battle.attrs.details} markdown />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <Button bsStyle="warning" bsSize="small"><Glyphicon glyph="plus" /> Foe</Button>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal battle={battle} onUpdate={this.props.onUpdate} />
                        <RemoveModal battle={battle} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = BattleCard;



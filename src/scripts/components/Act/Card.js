'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('../Model/FormModal');
var CloneModal = require('../Model/CloneModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('../Model/AttrBlock');

require('../../../styles/ItemCard.css');



var ActCard = React.createClass({
    render: function () {
        var campaign = this.props.campaign;
        var act = this.props.act;

        return (
            <div className="item-card act-card">
                <div className="card-header">
                    <p className="pull-left">
                        {act.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{act.attrs.type}</small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock type="flavor" attr={act.attrs.flavor} />
                    <AttrBlock type="details" attr={act.attrs.details} />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <ButtonLink bsStyle="primary" bsSize="small" to="manage-quests" params={{campaignId: campaign.id, actId: act.id}}><Glyphicon glyph="cog" /> Quests</ButtonLink>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal target={act} model={this.props.model} parent={campaign} inputs={this.props.inputs} onUpdate={this.props.onUpdate} />
                        <CloneModal target={act} model={this.props.model} parent={campaign} onUpdate={this.props.onUpdate} />
                        <RemoveModal target={act} onUpdate={this.props.onUpdate}>
                            <p className="text-danger">
                            This will also <strong>remove</strong> all associated:
                                <ul className="text-danger">
                                    <li>Quests</li>
                                    <li>Tasks</li>
                                </ul>
                            </p>
                        </RemoveModal>
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = ActCard;



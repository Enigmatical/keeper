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



var SaveCard = React.createClass({
    getInitialState: function() {
        return {
            party: null
        }
    },

    componentWillMount: function() {
        this.getParty();
    },

    getParty: function() {
        var self = this;
        var save = self.props.save;

        save.getParty()
            .done(function() {
                self.setState({party: save.party});
            });
    },

    render: function () {
        var self = this;
        var campaign = self.props.campaign;
        var save = self.props.save;
        var party = self.state.party;

        if (_.isObject(party)) {
            return (
                <div className="item-card save-card">
                    <div className="card-header">
                        <p className="pull-left">
                            {party.attrs.name}
                        </p>
                        <p className="pull-right">
                            <small className="text-muted">{save.attrs.days} Days</small>
                        </p>
                    </div>
                    <div className="card-body">
                        <AttrBlock name="Notes" attr={save.attrs.notes} markdown />
                    </div>
                    <div className="card-footer">
                        <ButtonToolbar className="pull-left">
                            <ButtonLink bsStyle="success" bsSize="small" to="run-campaign" params={{campaignId: campaign.id, saveId: save.id}}><Glyphicon glyph="play" /> Begin</ButtonLink>
                        </ButtonToolbar>
                        <ButtonToolbar className="pull-right">
                            <FormModal target={save} model={this.props.model} parent={campaign} inputs={this.props.inputs} onUpdate={self.props.onUpdate} />
                            <RemoveModal target={save} onUpdate={self.props.onUpdate} />
                        </ButtonToolbar>
                    </div>
                </div>
                );
        }
        else {
            return (<span />);
        }
    }
});

module.exports = SaveCard;
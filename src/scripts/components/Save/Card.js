'use strict';

var React = require('react/addons');

var Auth = require('../../helpers/Auth');
var Pathfinder = require('../../helpers/Pathfinder');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('../Model/FormModal');
var CloneModal = require('../Model/CloneModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('../Model/AttrBlock');


require('../../../styles/ItemCard.css');



var SaveCard = React.createClass({
    getInitialState: function() {
        return {
            party: null,
            location: null
        }
    },

    componentWillMount: function() {
        this.getParty();
        this.getLocation();
    },

    getParty: function() {
        var self = this;
        var save = self.props.save;

        save.getParty()
            .done(function() {
                self.setState({party: save.party});
            });
    },

    getLocation: function() {
        var self = this;
        var save = self.props.save;

        save.getLocation()
            .done(function() {
                self.setState({location: save.location});
            });
    },

    render: function () {
        var self = this;
        var campaign = self.props.campaign;
        var save = self.props.save;
        var party = self.state.party;
        var location = self.state.location;

        if (_.isObject(party) && _.isObject(location)) {
            return (
                <div className="item-card save-card">
                    <div className="card-header">
                        <p className="pull-left">
                            {party.attrs.name}
                        </p>
                        <p className="pull-right">
                            <small className="text-muted">{Pathfinder.getDayTime(save.attrs.segs)}</small>
                        </p>
                    </div>
                    <div className="card-body">
                        <section className="row">
                            <AttrBlock type="stat" name="Location" glyph="location" attr={location.attrs.name} />
                            <AttrBlock type="stat" name="Current XP" glyph="xp" attr={save.attrs.xp} />
                        </section>
                        <AttrBlock type="details" attr={save.attrs.notes} />
                    </div>
                    <div className="card-footer">
                        <ButtonToolbar className="pull-left">
                            <ButtonLink bsStyle="success" bsSize="small" to="adventure-acts" params={{campaignId: campaign.id, saveId: save.id}}><Glyphicon glyph="play" /> Begin</ButtonLink>
                        </ButtonToolbar>
                        <ButtonToolbar className="pull-right">
                            <FormModal target={save} model={this.props.model} parent={campaign} inputs={this.props.inputs} onUpdate={self.props.onUpdate} />
                            <CloneModal target={save} model={this.props.model} parent={campaign} onUpdate={self.props.onUpdate} />
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
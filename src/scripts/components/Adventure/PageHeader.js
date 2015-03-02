'use strict';

var React = require('react/addons');
var Link = require('react-router').Link;

var Pathfinder = require('../../helpers/Pathfinder');

var SaveModel = require('../../models/SaveModel');

var Button = require('react-bootstrap').Button;
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavItemLink = require('react-router-bootstrap').NavItemLink;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var PageHeader = require('../Model/PageHeader');
var AttrBlock = require('../Model/AttrBlock');

var GmModal = require('./GmModal');
var FormModal = require('../Model/FormModal');
var SaveInputs = require('../Save/Inputs');

var AdventurePageHeader = React.createClass({
    getInitialState: function() {
        return {
            location: null
        }
    },

    getInputs: function(attrs) {
        var campaign = this.props.campaign;

        return (
            <SaveInputs campaign={campaign} attrs={attrs} />
            );
    },

    render: function () {
        var campaign = this.props.campaign;
        var save = this.props.save;
        var location = save.location;

        var locationLink = (<span><Link to="adventure-areas" params={{campaignId: campaign.id, saveId: save.id, locationId: location.id}}>{location.attrs.name}</Link>&nbsp;&nbsp;<small className="text-muted">{location.attrs.type}</small></span>);

        return (
            <div>
                <PageHeader pageName={campaign.attrs.name} pageType="Adventure">
                    <FormModal model={SaveModel} target={save} parent={campaign} button={{size: 'medium', style:'info', glyph: 'user', text: save.party.attrs.name}} inputs={this.getInputs.bind(this, save.attrs)} onUpdate={this.props.onSave} />
                    <GmModal save={save} onSave={this.props.onSave} />
                </PageHeader>
                <div className="stats-adventure row">
                    <div className="col-md-12">
                        <AttrBlock type="stat" name="Day" glyph="date" attr={Pathfinder.getDayTime(save.attrs.segs)} />
                        <AttrBlock type="stat" name="Location" glyph="location" attr={locationLink} />
                        <AttrBlock type="stat" name="XP" glyph="xp" attr={Pathfinder.getPartyXp(save.attrs.xp, save.party.attrs.count)} />
                    </div>
                </div>
                <div className="navbar-adventure row">
                    <div className="col-md-12">
                        <Navbar fluid>
                            <Nav className="navbar-left">
                                <NavItemLink to="adventure-acts" params={{campaignId: campaign.id, saveId: save.id}} active={this.props.section === 'campaign'}>Campaign</NavItemLink>
                                <NavItemLink to="adventure-locations" params={{campaignId: campaign.id, saveId: save.id}} active={this.props.section === 'map'}>Map</NavItemLink>
                            </Nav>
                        </Navbar>
                    </div>
                </div>
            </div>
            );

    }
});

module.exports = AdventurePageHeader;


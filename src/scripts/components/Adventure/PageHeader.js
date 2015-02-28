'use strict';

var React = require('react/addons');
var Link = require('react-router').Link;

var Pathfinder = require('../../helpers/Pathfinder');

var Button = require('react-bootstrap').Button;
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavItemLink = require('react-router-bootstrap').NavItemLink;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var PageHeader = require('../Model/PageHeader');
var Stats = require('./Stats');

var AdventurePageHeader = React.createClass({
    getInitialState: function() {
        return {
            location: null
        }
    },

    render: function () {
        var campaign = this.props.campaign;
        var save = this.props.save;
        var location = save.location;

        var stats = [
            {
                glyph: 'time',
                label: 'Day',
                value: Pathfinder.getDayTime(save.attrs.segs)
            },
            {
                glyph: 'globe',
                label: 'Location',
                value: (<span><Link to="adventure-areas" params={{campaignId: campaign.id, saveId: save.id, locationId: location.id}}>{location.attrs.name}</Link>&nbsp;&nbsp;<small className="text-muted">{location.attrs.type}</small></span>)
            },
            {
                glyph: 'star',
                label: 'XP',
                value: Pathfinder.getPartyXp(save.attrs.xp, save.party.attrs.count)
            }
        ];

        return (
            <div>
                <PageHeader pageName={campaign.attrs.name} pageType="Adventure">
                    <Button bsStyle="info"><Glyphicon glyph="user" /> Party: {save.party.attrs.name}</Button>
                    <Button bsStyle="danger"><Glyphicon glyph="flash" /> GM Actions</Button>
                </PageHeader>
                <div className="row">
                    <div className="col-md-12">
                        <Navbar className="navbar-adventure navbar-inverse" fluid>
                            <Nav className="navbar-left">
                                <NavItemLink to="adventure-acts" params={{campaignId: campaign.id, saveId: save.id}}>Campaign</NavItemLink>
                                <NavItemLink to="adventure-locations" params={{campaignId: campaign.id, saveId: save.id}}>Map</NavItemLink>
                            </Nav>
                        </Navbar>
                    </div>
                </div>
                <Stats stats={stats} />
            </div>
            );

    }
});

module.exports = AdventurePageHeader;


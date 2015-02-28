'use strict';

var React = require('react/addons');
var _ = require('lodash');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var AttrBlock = require('../../Model/AttrBlock');
var Stats = require('../Stats');



var EncounterSkillCheckAdventureInfo = React.createClass({

    render: function () {
        var self = this;
        var data = this.props.data;
        var details = this.props.data.details;

        var stats = [
            {
                glyph: 'eye-open',
                label: 'Skill',
                value: details.skill
            },
            {
                glyph: 'exclamation-sign',
                label: 'DC',
                value: details.skillDifficulty
            }
        ];

        return (
            <div>
                <div className="card-body">
                    <div className="text-alizarin">
                        <p className="body-header">Skill Check</p>
                        <Stats stats={stats} />
                        <div className="col-md-12">
                            <TabbedArea defaultActiveKey={1}>
                                <TabPane eventKey={1} tab="Pass">
                                    <AttrBlock attr={details.skillPass} markdown />
                                </TabPane>
                                <TabPane eventKey={2} tab="Fail">
                                    <AttrBlock attr={details.skillFail} markdown />
                                </TabPane>
                            </TabbedArea>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
});

module.exports = EncounterSkillCheckAdventureInfo;
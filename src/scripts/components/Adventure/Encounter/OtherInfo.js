'use strict';

var React = require('react/addons');
var _ = require('lodash');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AttrBlock = require('../../Model/AttrBlock');



var EncounterOtherAdventureInfo = React.createClass({

    render: function () {
        var self = this;
        var data = this.props.data;
        var details = this.props.data.details;

        return (
            <div>
                <div className="card-body">
                    <AttrBlock type="details" attr={details.description} />
                </div>
            </div>
            );
    }
});

module.exports = EncounterOtherAdventureInfo;
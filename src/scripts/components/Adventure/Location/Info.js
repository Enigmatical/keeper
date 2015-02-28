'use strict';

var React = require('react/addons');

var AttrBlock = require('../../Model/AttrBlock');
var Stats = require('../Stats');


var LocationAdventureInfo = React.createClass({
    render: function () {
        var target = this.props.target;

        var stats = [
            {
                glyph: 'question-sign',
                label: 'Type',
                value: target.attrs.type
            }
        ];

        return (
            <div className="row">
                <Stats stats={stats} />
                <div className="col-md-12">
                    <AttrBlock text="turquoise" attr={target.attrs.flavor} markdown />
                    <AttrBlock attr={target.attrs.details} markdown />
                </div>
            </div>
            );
    }
});

module.exports = LocationAdventureInfo;
'use strict';

var React = require('react/addons');

var AttrBlock = require('../../Model/AttrBlock');
var Stats = require('../Stats');


var ActAdventureInfo = React.createClass({
    render: function () {
        var target = this.props.target;

        var stats = [
            {
                glyph: 'info-sign',
                label: 'Type',
                value: target.attrs.type
            }
        ];

        return (
            <div className="row">
                <Stats stats={stats} />
                <div className="col-md-12">
                    <AttrBlock name="Flavor" text="info" attr={target.attrs.flavor} markdown />
                    <AttrBlock name="Details" text="info" attr={target.attrs.details} markdown />
                </div>
            </div>
            );
    }
});

module.exports = ActAdventureInfo;
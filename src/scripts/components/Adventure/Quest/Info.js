'use strict';

var React = require('react/addons');

var AttrBlock = require('../../Model/AttrBlock');
var Stats = require('../Stats');


var QuestAdventureInfo = React.createClass({
    render: function () {
        var target = this.props.target;

        var stats = [
            {
                glyph: 'exclamation-sign',
                label: 'CR',
                value: target.attrs.challenge
            },
            {
                glyph: 'star',
                label: 'XP',
                value: '+' + target.attrs.rewardXp
            },
            {
                glyph: 'tasks',
                label: 'Coin',
                value: '+' + target.attrs.rewardCoin + ' gp'
            }
        ];

        return (
            <div className="row">
                <Stats stats={stats} />
                <div className="col-md-12">
                    <AttrBlock text="turquoise" attr={target.attrs.flavor} markdown />
                    <AttrBlock attr={target.attrs.details} markdown />
                    <AttrBlock text="peterriver" name="Rewards" attr={target.attrs.rewardOther} markdown />
                </div>
            </div>
            );
    }
});

module.exports = QuestAdventureInfo;
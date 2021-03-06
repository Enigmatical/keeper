'use strict';

var React = require('react/addons');

var AttrBlock = require('../../Model/AttrBlock');



var BountyAdventureInfo = React.createClass({
    render: function () {
        var target = this.props.target;

        return (
            <div>
                <AttrBlock type="flavor" attr={target.attrs.flavor} />
                <section className="row">
                    <AttrBlock type="stat" name="CR" glyph="challenge" attr={target.attrs.challenge} />
                    <AttrBlock type="stat" name="XP" glyph="xp" attr={'+' + target.attrs.rewardXp} />
                    <AttrBlock type="stat" name="Coins" glyph="coin" attr={'+' + target.attrs.rewardCoin + ' gp'} />
                </section>
                <AttrBlock type="details" attr={target.attrs.details} />
                <AttrBlock type="rewards" attr={target.attrs.rewardOther} />
            </div>
            );
    }
});

module.exports = BountyAdventureInfo;
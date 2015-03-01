'use strict';

var React = require('react/addons');
var _ = require('lodash');

var AttrBlock = require('../../Model/AttrBlock');



var ShopAdventureInfo = React.createClass({
    render: function () {
        var target = this.props.target;

        return (
            <div>
                <AttrBlock type="flavor" attr={target.attrs.flavor} />
                <section className="row">
                    <AttrBlock type="stat" name="Type" glyph="type" attr={_.startCase(target.attrs.type)} />
                    <AttrBlock type="stat" name="Quality" glyph="type" attr={_.startCase(target.attrs.quality)} />
                </section>
                <AttrBlock type="details" attr={target.attrs.details} />
            </div>
            );
    }
});

module.exports = ShopAdventureInfo;
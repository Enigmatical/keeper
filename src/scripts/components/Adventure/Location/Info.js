'use strict';

var React = require('react/addons');

var AttrBlock = require('../../Model/AttrBlock');
var Stats = require('../Stats');


var LocationAdventureInfo = React.createClass({
    render: function () {
        var target = this.props.target;

        return (
            <div>
                <AttrBlock type="flavor" attr={target.attrs.flavor} />
                <section className="row">
                    <AttrBlock type="stat" name="Type" glyph="type" attr={target.attrs.type} />
                    <AttrBlock type="stat" name="Coordinate" glyph="location" attr={target.attrs.coordinate} />
                </section>
                <AttrBlock type="details" attr={target.attrs.details} />
            </div>
            );
    }
});

module.exports = LocationAdventureInfo;
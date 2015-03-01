'use strict';

var React = require('react/addons');

var AttrBlock = require('../../Model/AttrBlock');



var AreaAdventureInfo = React.createClass({
    render: function () {
        var target = this.props.target;

        return (
            <div>
                <AttrBlock type="flavor" attr={target.attrs.flavor} />
                <section className="row">
                    <AttrBlock type="stat" name="Type" glyph="type" attr={target.attrs.type} />
                </section>
                <AttrBlock type="details" attr={target.attrs.details} />
            </div>
            );
    }
});

module.exports = AreaAdventureInfo;
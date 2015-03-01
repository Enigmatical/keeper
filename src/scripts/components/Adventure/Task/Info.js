'use strict';

var React = require('react/addons');

var AttrBlock = require('../../Model/AttrBlock');



var TaskAdventureInfo = React.createClass({
    render: function () {
        var target = this.props.target;

        return (
            <div>
                <AttrBlock type="flavor" attr={target.attrs.flavor} />
                <AttrBlock type="details" attr={target.attrs.details} />
            </div>
            );
    }
});

module.exports = TaskAdventureInfo;
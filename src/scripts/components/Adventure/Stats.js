'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Glyphicon = require('react-bootstrap').Glyphicon;



var AdventureStats = React.createClass({
    render: function () {
        return (
            <div className="stats-adventure row">
                <div className="col-md-12">
                    {this.props.stats.map(function(stat) {
                        var key = _.uniqueId('stat_');
                        return (
                            <div key={key} className="stat col-md-3">
                                <p>
                                    <span className="stat-label">
                                        <small className="text-muted"><Glyphicon glyph={stat.glyph} /> {stat.label}</small>
                                    </span>
                                    <span className="stat-value">
                                        <strong>{stat.value}</strong>
                                    </span>
                                </p>
                            </div>
                            );
                    })}
                </div>
            </div>
            );
    }
});

module.exports = AdventureStats;
'use strict';

var React = require('react/addons');
var _ = require('lodash');

var AttrBlock = require('../../Model/AttrBlock');
var Stats = require('../Stats');

var EncounterCard = require('../Encounter/Card');


var ShopAdventureInfo = React.createClass({
    getInitialState: function() {
        return {
            encounters: []
        }
    },

    componentWillMount: function() {
        this.getEncounters();
    },

    getEncounters: function() {
        var self = this;
        var target = this.props.target;

        target.getEncounters()
            .done(function(encounters) {
                self.setState({encounters: encounters});
            });
    },

    render: function () {
        var self = this;
        var target = self.props.target;

        var stats = [
            {
                glyph: 'question-sign',
                label: 'Type',
                value: (<span>{_.startCase(target.attrs.type)} <small>({_.startCase(target.attrs.quality)})</small></span>)
            }
        ];

        var encounters = function() {
            if (self.state.encounters.length > 0) {
                return(
                    <div className="encounters">
                        <p className="body-header">Encounters</p>
                        {self.state.encounters.map(function(encounter) {
                            return (
                                <EncounterCard key={encounter.id} target={encounter} />
                                );
                        })}
                    </div>
                    );
            }
            else {
                return (<span />);
            }
        };

        return (
            <div className="row">
                <Stats stats={stats} />
                <div className="col-md-12">
                    <AttrBlock text="turquoise" attr={target.attrs.flavor} markdown />
                    <AttrBlock attr={target.attrs.details} markdown />
                    {encounters()}
                </div>
            </div>
            );
    }
});

module.exports = ShopAdventureInfo;
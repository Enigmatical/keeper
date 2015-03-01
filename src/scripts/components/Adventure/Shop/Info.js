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
                    <section className="row">
                        <div className="col-md-12">
                            <p className="body-header">Encounters</p>
                            {self.state.encounters.map(function(encounter) {
                                return (
                                    <EncounterCard key={encounter.id} target={encounter} />
                                    );
                            })}
                        </div>
                    </section>
                    );
            }
            else {
                return (<span />);
            }
        };

        return (
            <div>
                <AttrBlock type="flavor" attr={target.attrs.flavor} />
                <section className="row">
                    <AttrBlock type="stat" name="Type" glyph="type" attr={_.startCase(target.attrs.type)} />
                    <AttrBlock type="stat" name="Quality" glyph="type" attr={_.startCase(target.attrs.quality)} />
                </section>
                <AttrBlock type="details" attr={target.attrs.details} />
                {encounters()}
            </div>
            );
    }
});

module.exports = ShopAdventureInfo;
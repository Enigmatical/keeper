'use strict';

var React = require('react/addons');

var AttrBlock = require('../../Model/AttrBlock');

var EncounterCard = require('../Encounter/Card');



var TaskAdventureInfo = React.createClass({
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
                <AttrBlock type="details" attr={target.attrs.details} />
                {encounters()}
            </div>
            );
    }
});

module.exports = TaskAdventureInfo;
'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Q = require('q');

var LocationModel = require('../../../models/LocationModel');

var Input = require('../../Model/FormInput');



var EncounterTravelInputs = React.createClass({
    getInitialState: function() {
        return {
            location_id: null,
            location: null,
            area: null,
            locationOptions: [],
            areaOptions: []
        }
    },

    componentWillMount: function() {
        var self = this;
        var mode = self.props.mode;

        self.getLocationOptions()
            .done(function() {
                if (mode.isEdit) {
                    var details = self.props.attrs.details;

                    self.getAllAreaOptions(details.location_id)
                        .done(function() {
                            self.setState({
                                location_id: details.location_id,
                                location: details.location,
                                area: details.area
                            });
                        });
                }
            });
    },

    getLocationOptions: function() {
        var self = this;
        var campaign = self.props.campaign;
        var deferred = Q.defer();

        campaign.getLocationOptions()
            .done(function(options) {
                self.setState({locationOptions: options});

                deferred.resolve();
            });

        return deferred.promise;
    },

    getAllAreaOptions: function(location_id) {
        var self = this;
        var deferred = Q.defer();

        new LocationModel().get(location_id)
            .done(function(location) {
                location.getAllAreaOptions()
                    .done(function(options) {
                        self.setState({areaOptions: options});

                        deferred.resolve();
                    });
            });

        return deferred.promise;
    },

    handleLocation: function(event) {
        var self = this;
        var location_id = event.target.value;
        var location = event.target.options[event.target.selectedIndex].innerHTML;

        self.setState({location_id: location_id, location: location});
        self.getAllAreaOptions(location_id);
    },

    handleArea: function(event) {
        var self = this;
        var area = event.target.value;

        self.setState({area: area});
    },

    render: function() {
        return (
            <div className="details">
                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type="select"
                            name="location_id"
                            ref="location_id"
                            placeholder="Location"
                            options={this.state.locationOptions}
                            onChange={this.handleLocation}
                            value={this.state.location_id}
                        />
                        <Input
                            type="hidden"
                            name="location"
                            ref="location"
                            value={this.state.location}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="select"
                            name="area"
                            ref="area"
                            placeholder="Area/Shop"
                            options={this.state.areaOptions}
                            onChange={this.handleArea}
                            value={this.state.area}
                        />
                    </div>
                </div>
            </div>
            );
    }
});


module.exports = EncounterTravelInputs;
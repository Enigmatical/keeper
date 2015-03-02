'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Pathfinder = require('../../helpers/Pathfinder');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AttrBlock = require('../Model/AttrBlock');



var AdventureTravelModal = React.createClass({
    mixins: [OverlayMixin],

    getInitialState: function() {
        return {
            isModalOpen: false
        };
    },

    componentWillMount: function() {

    },

    handleTravel: function(segs, type) {
        var self = this;
        var save = this.props.save;
        var target = this.props.target;

        save.adjustLocation(target.id, target.attrs.coordinate, segs)
            .done(function() {
                if (_.isFunction(self.props.onComplete)) {
                    self.props.onComplete();
                }

                if (_.isFunction(self.props.onSave)) {
                    self.props.onSave();
                }
            });

        this.handleToggle();
    },

    handleToggle: function() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },

    render: function () {
        return (
            <Button bsStyle="warning" onClick={this.handleToggle}><Glyphicon glyph="globe" /> Travel</Button>
            );
    },

    renderOverlay: function() {
        var self = this;
        var save = self.props.save;
        var target = self.props.target;

        var distance = Pathfinder.getTravelDistance(save.attrs.coordinate, target.attrs.coordinate);

        var carriageTime = Pathfinder.getTravelTime(distance, 3);
        var trotTime = Pathfinder.getTravelTime(distance, 5);
        var canterTime = Pathfinder.getTravelTime(distance, 8);
        var gallopTime = Pathfinder.getTravelTime(distance, 12);

        if (!this.state.isModalOpen) {
            return <span />;
        }

        return (
            <Modal title={<h4>{target.attrs.name}&nbsp;&nbsp;<small>Travel</small></h4>} className="info-adventure" bsSize="large" onRequestHide={self.handleToggle}>
                <div className="modal-body">
                    <section className="row">
                        <div className="col-md-12">
                            <div className="text-orange bg-orange">
                                <p className="body-header">Distance to Destination</p>
                                {distance} Miles
                            </div>
                        </div>
                    </section>
                    <section className="row">
                        <div className="col-md-12">
                            <p className="body-header">Options</p>
                            <section className="row">
                                <div className="col-md-3">
                                    <Button bsStyle="info" block onClick={self.handleTravel.bind(self, carriageTime, 'carriage')}>Carriage&nbsp;&nbsp;<small>(3 mph)</small></Button>
                                </div>
                                <div className="col-md-9">
                                    <AttrBlock type="stat" cols="4" name="Wandering" glyph="challenge" attr={<span>0% <small>per Day</small></span>} />
                                    <AttrBlock type="stat" cols="4" name="Time" glyph="date" attr={Pathfinder.getAdjustTimeLabel(carriageTime)} />
                                    <AttrBlock type="stat" cols="4" name="Cost" glyph="coin" attr={Pathfinder.getCarriageCost(distance) + ' gp'} />
                                </div>
                            </section>
                            <section className="row">
                                <div className="col-md-3">
                                    <Button bsStyle="success" block onClick={self.handleTravel.bind(self, trotTime, 'trot')}>Trot&nbsp;&nbsp;<small>(5 mph)</small></Button>
                                </div>
                                <div className="col-md-9">
                                    <AttrBlock type="stat" cols="4" name="Wandering" glyph="challenge" attr={<span>5% <small>per Day</small></span>} />
                                    <AttrBlock type="stat" cols="4" name="Time" glyph="date" attr={Pathfinder.getAdjustTimeLabel(trotTime)} />
                                </div>
                            </section>
                            <section className="row">
                                <div className="col-md-3">
                                    <Button bsStyle="warning" block onClick={self.handleTravel.bind(self, canterTime, 'canter')}>Canter&nbsp;&nbsp;<small>(8 mph)</small></Button>
                                </div>
                                <div className="col-md-9">
                                    <AttrBlock type="stat" cols="4" name="Wandering" glyph="challenge" attr={<span>10% <small>per Day</small></span>} />
                                    <AttrBlock type="stat" cols="6" name="Time" glyph="date" attr={Pathfinder.getAdjustTimeLabel(canterTime)} />
                                </div>
                            </section>
                            <section className="row">
                                <div className="col-md-3">
                                    <Button bsStyle="danger" block onClick={self.handleTravel.bind(self, gallopTime, 'gallop')}>Gallop&nbsp;&nbsp;<small>(12 mph)</small></Button>
                                </div>
                                <div className="col-md-9">
                                    <AttrBlock type="stat" cols="4" name="Wandering" glyph="challenge" attr={<span>20% <small>per Day</small></span>} />
                                    <AttrBlock type="stat" cols="6" name="Time" glyph="date" attr={Pathfinder.getAdjustTimeLabel(gallopTime)} />
                                </div>
                            </section>
                        </div>
                    </section>
                </div>
                <div className="modal-footer">
                    <ButtonToolbar>
                        <Button onClick={this.handleToggle}>Cancel</Button>
                    </ButtonToolbar>
                </div>
            </Modal>
            );
    }
});

module.exports = AdventureTravelModal;
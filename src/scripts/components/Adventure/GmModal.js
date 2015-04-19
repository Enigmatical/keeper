'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Pathfinder = require('../../helpers/Pathfinder');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AdjustTime = require('./AdjustTimeButton');
var AdjustXp = require('./AdjustXpButton');



var AdventureGmModal = React.createClass({
    mixins: [OverlayMixin],

    getInitialState: function() {
        return {
            isModalOpen: false
        };
    },

    componentWillMount: function() {

    },

    handleToggle: function() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },

    render: function () {
        return (
            <Button bsStyle="danger" onClick={this.handleToggle}><Glyphicon glyph="flash" /> Actions</Button>
            );
    },

    renderOverlay: function() {
        var self = this;
        var save = self.props.save;

        if (!this.state.isModalOpen) {
            return <span />;
        }

        return (
            <Modal title="GM Actions" className="info-adventure" bsSize="large" onRequestHide={self.handleToggle}>
                <div className="modal-body">
                    <section className="row">
                        <div className="col-md-12">
                            <p className="body-header">Adjust Time</p>
                            <div className="col-md-2">
                                <AdjustTime save={save} onSave={this.props.onSave} segs={-96} disable={false} block={true}><Glyphicon glyph="backward" /> -1 Day</AdjustTime>
                            </div>
                            <div className="col-md-2">
                                <AdjustTime save={save} onSave={this.props.onSave} segs={-4} disable={false} block={true}><Glyphicon glyph="triangle-left" /> -1 Hour</AdjustTime>
                            </div>
                            <div className="col-md-2">
                                <AdjustTime save={save} onSave={this.props.onSave} segs={-1} disable={false} block={true}><Glyphicon glyph="menu-left" /> -15 Mins</AdjustTime>
                            </div>
                            <div className="col-md-2">
                                <AdjustTime save={save} onSave={this.props.onSave} segs={1} disable={false} block={true}>+15 Mins <Glyphicon glyph="menu-right" /></AdjustTime>
                            </div>
                            <div className="col-md-2">
                                <AdjustTime save={save} onSave={this.props.onSave} segs={4} disable={false} block={true}>+1 Hour <Glyphicon glyph="triangle-right" /></AdjustTime>
                            </div>
                            <div className="col-md-2">
                                <AdjustTime save={save} onSave={this.props.onSave} segs={96} disable={false} block={true}>+1 Day <Glyphicon glyph="forward" /></AdjustTime>
                            </div>
                        </div>
                    </section>
                    <section className="row">
                        <div className="col-md-12">
                            <p className="body-header">Adjust XP</p>
                            <div className="col-md-2">
                                <AdjustXp save={save} onSave={this.props.onSave} xp={-250} disable={false} block={true}><Glyphicon glyph="backward" /> -250 XP</AdjustXp>
                            </div>
                            <div className="col-md-2">
                                <AdjustXp save={save} onSave={this.props.onSave} xp={-100} disable={false} block={true}><Glyphicon glyph="triangle-left" /> -100 XP</AdjustXp>
                            </div>
                            <div className="col-md-2">
                                <AdjustXp save={save} onSave={this.props.onSave} xp={-50} disable={false} block={true}><Glyphicon glyph="menu-left" /> -50 XP</AdjustXp>
                            </div>
                            <div className="col-md-2">
                                <AdjustXp save={save} onSave={this.props.onSave} xp={50} disable={false} block={true}>+50 XP <Glyphicon glyph="menu-right" /></AdjustXp>
                            </div>
                            <div className="col-md-2">
                                <AdjustXp save={save} onSave={this.props.onSave} xp={100} disable={false} block={true}>+100 XP <Glyphicon glyph="triangle-right" /></AdjustXp>
                            </div>
                            <div className="col-md-2">
                                <AdjustXp save={save} onSave={this.props.onSave} xp={250} disable={false} block={true}>+250 XP <Glyphicon glyph="forward" /></AdjustXp>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="modal-footer">
                    <ButtonToolbar>
                        <Button onClick={this.handleToggle}>Close</Button>
                    </ButtonToolbar>
                </div>
            </Modal>
            );
    }
});

module.exports = AdventureGmModal;
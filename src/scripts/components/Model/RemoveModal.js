'use strict';

var React = require('react/addons');
var _ = require('lodash');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;



var ModelRemoveModal = React.createClass({
    mixins: [OverlayMixin],

    getInitialState: function() {
        return {
            isModalOpen: false
        };
    },

    getMode: function() {
        var mode = {
            name: 'Remove ' + _.startCase(this.props.target.name) + '?',
            isLink: this.props.link ? true : false
        };

        var button = {
            style: 'danger',
            size: 'small',
            glyph: 'remove'
        };

        if (mode.isLink) {
            button.size = 'xsmall';
        }

        mode.button = button;

        return mode;
    },

    handleSubmit: function(e) {
        var self = this;

        e.preventDefault();

        self.props.target.remove()
            .done(function() {
                if (_.isFunction(self.props.onUpdate)) {
                    self.props.onUpdate();
                }
            });

        self.handleToggle();
    },

    handleToggle: function() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },

    render: function () {
        var button = this.getMode().button;

        return (
            <Button bsStyle={button.style} bsSize={button.size} className={this.props.className} onClick={this.handleToggle}><Glyphicon glyph={button.glyph} /></Button>
            );
    },

    renderOverlay: function() {
        var mode = this.getMode();

        if (!this.state.isModalOpen) {
            return <span />;
        }

        return (
            <Modal title={mode.name} onRequestHide={this.handleToggle}>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-body">
                        <p className="bg-danger text-danger"><strong>This will be removed permanently.</strong></p>
                        {this.props.children}
                    </div>
                    <div className="modal-footer">
                        <Button bsStyle={mode.button.style} type="submit">Remove</Button>
                        <Button onClick={this.handleToggle}>Cancel</Button>
                    </div>
                </form>
            </Modal>
            );
    }
});

module.exports = ModelRemoveModal;



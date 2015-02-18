'use strict';

var React = require('react/addons');
var _ = require('lodash');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;



var ModelUnlinkModal = React.createClass({
    mixins: [OverlayMixin],

    getInitialState: function() {
        return {
            isModalOpen: false
        };
    },

    handleSubmit: function(e) {
        var self = this;

        e.preventDefault();

        self.props.target.unlinkModel(self.props.index)
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
        return (
            <Button bsStyle="danger" bsSize="xsmall" className={this.props.className} onClick={this.handleToggle}><Glyphicon glyph="link" /></Button>
            );
    },

    renderOverlay: function() {
        var modalTitle = 'Unlink ' + this.props.titlePart + '?';

        if (!this.state.isModalOpen) {
            return <span />;
        }

        return (

            <Modal title={modalTitle} onRequestHide={this.handleToggle}>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-footer">
                        <Button bsStyle="danger" type="submit">Yes</Button>
                        <Button onClick={this.handleToggle}>No</Button>
                    </div>
                </form>
            </Modal>
            );
    }
});

module.exports = ModelUnlinkModal;



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
        return (
            <Button bsStyle="danger" bsSize="small" className={this.props.className} onClick={this.handleToggle} title="Remove"><Glyphicon glyph="remove" /></Button>
            );
    },

    renderOverlay: function() {
        var modalTitle = 'Remove ' + this.props.titlePart + '?';

        if (!this.state.isModalOpen) {
            return <span />;
        }

        return (

            <Modal title={modalTitle} onRequestHide={this.handleToggle}>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-body">
                        <h4>{this.props.targetTitle}</h4>
                        <p className="bg-danger text-danger"><strong>This will be removed permanently.</strong></p>

                        {this.props.message}
                    </div>
                    <div className="modal-footer">
                        <Button bsStyle="danger" type="submit">Yes</Button>
                        <Button onClick={this.handleToggle}>No</Button>
                    </div>
                </form>
            </Modal>
            );
    }
});

module.exports = ModelRemoveModal;



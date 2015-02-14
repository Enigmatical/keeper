'use strict';

var React = require('react/addons');
var _ = require('lodash');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;

require('../../styles/RemoveActModal.css');



var RemoveActModal = React.createClass({
    mixins: [OverlayMixin],

    getInitialState: function() {
        return {
            isModalOpen: false
        };
    },

    handleSubmit: function(e) {
        var self = this;

        e.preventDefault();

        self.props.act.remove()
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
        if (!this.state.isModalOpen) {
            return <span />;
        }

        return (
            <Modal title="Remove Act?" onRequestHide={this.handleToggle}>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-body">
                        <h4>{this.props.act.attrs.title}</h4>
                        <p className="text-danger">
                        This action will also <strong>remove</strong> all associated:
                            <ul className="text-danger">
                                <li>Quests</li>
                                <li>Tasks</li>
                            </ul>
                        </p>
                        <p className="bg-danger">This <strong>cannot</strong> be <strong>undone</strong>.</p>
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

module.exports = RemoveActModal;



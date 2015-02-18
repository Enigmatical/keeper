'use strict';

var React = require('react/addons');
var _ = require('lodash');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;



var ModelLinkModal = React.createClass({
    mixins: [OverlayMixin],

    getInitialState: function() {
        return {
            isModalOpen: false
        };
    },

    handleSubmit: function(e) {
        e.preventDefault();

        var self = this;
        var data = {};
        var form = e.target;
        var inputs = form.querySelectorAll('[name]');

        _.each(inputs, function(input) {
            var name = input.getAttribute('name');
            data[name] = input.value;
        });

        self.props.target.linkModel(data)
            .done(function() {
                if (_.isFunction(self.props.onUpdate)) {
                    self.props.onUpdate();
                }
            });

        this.handleToggle();
    },

    handleToggle: function() {
        if (!this.state.isModalOpen === true) {
            this.props.onOpen();
        }

        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },

    render: function () {
        var button = (<Button bsStyle="warning" bsSize="small" className={this.props.className} onClick={this.handleToggle}><Glyphicon glyph="link" /> {this.props.titlePart}</Button>);

        return (
            button
            );
    },

    renderOverlay: function() {
        var modalTitle = 'Link ' + this.props.titlePart;

        if (!this.state.isModalOpen) {
            return <span />;
        }

        return (
            <Modal title={modalTitle} onRequestHide={this.handleToggle}>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                    <div className="modal-footer">
                        <Button bsStyle="warning" type="submit">Add</Button>
                        <Button onClick={this.handleToggle}>Cancel</Button>
                    </div>
                </form>
            </Modal>
            );
    }
});

module.exports = ModelLinkModal;




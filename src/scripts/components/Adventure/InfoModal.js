'use strict';

var React = require('react/addons');
var _ = require('lodash');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;



var AdventureInfoModal = React.createClass({
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
            <Button bsStyle="info" onClick={this.handleToggle}><Glyphicon glyph="info-sign" /> Info</Button>
            );
    },

    renderOverlay: function() {
        var target = this.props.target;

        if (!this.state.isModalOpen) {
            return <span />;
        }

        return (
            <Modal title={target.attrs.name} className="info-adventure" bsSize="large" onRequestHide={this.handleToggle}>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-body">
                        {this.props.info}
                    </div>
                    <div className="modal-footer">
                        <Button onClick={this.handleToggle}>Close</Button>
                    </div>
                </form>
            </Modal>
            );
    }
});

module.exports = AdventureInfoModal;
'use strict';

var React = require('react/addons');
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

require('../../styles/AddCampaignModal.css');



var AddCampaignModal = React.createClass({
    mixins: [OverlayMixin],

    getInitialState: function() {
        return {
            isModalOpen: false
        };
    },

    saveCampaign: function() {
        console.log('Campaign Saved!');
        this.handleToggle();
    },

    handleToggle: function() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },

    render: function () {
        return (
            <Button bsStyle="success" onClick={this.handleToggle}>Add Campaign</Button>
            );
    },

    renderOverlay: function() {
        if (!this.state.isModalOpen) {
            return <span />;
        }

        return (
            <Modal title="Add Campaign" onRequestHide={this.handleToggle}>
                <div className="modal-body">
                    This modal is controlled by our custom trigger component.
                </div>
                <div className="modal-footer">
                    <Button bsStyle="primary" onClick={this.saveCampaign}>Save</Button>
                    <Button onClick={this.handleToggle}>Close</Button>
                </div>
            </Modal>
            );
    }
});

module.exports = AddCampaignModal;



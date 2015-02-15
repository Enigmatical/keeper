'use strict';

var React = require('react/addons');
var _ = require('lodash');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('react-bootstrap').Input;



var ModelFormModal = React.createClass({
    mixins: [OverlayMixin],

    getInitialState: function() {
        return {
            isModalOpen: false
        };
    },

    handleSubmit: function(e) {
        e.preventDefault();

        var data = {};
        var form = e.target;
        var inputs = form.querySelectorAll('[data-form~=input]');

        _.each(inputs, function(input) {
            var name = input.getAttribute('name');
            data[name] = input.value;
        });

        if (_.isObject(this.props.related)) {
            data[this.props.relatedKey] = this.props.related.id;
        }

        var model = new this.props.model();

        /* [EDIT MODE] */
        if (_.isObject(this.props.target)) {
            model.id = this.props.target.id;
        }

        model.create(data).save();

        if (_.isFunction(this.props.onUpdate)) {
            this.props.onUpdate();
        }

        this.handleToggle();
    },

    handleToggle: function() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },

    render: function () {
        var button = (<Button bsStyle="success" className={this.props.className} onClick={this.handleToggle}><Glyphicon glyph="plus" /> Add {this.props.titlePart}</Button>);

        /* [EDIT MODE] */
        if (this.props.target) {
            button = (<Button bsSize="small" bsStyle="info" className={this.props.className} onClick={this.handleToggle}><Glyphicon glyph="pencil" /></Button>);
        }

        return (
            button
            );
    },

    renderOverlay: function() {
        var modalTitle = 'Add ' + this.props.titlePart;
        var modalButton = (<Button bsStyle="success" type="submit">Save</Button>);

        /* [EDIT MODE] */
        if (this.props.target) {
            modalTitle = 'Edit ' + this.props.titlePart;
            modalButton = (<Button bsStyle="info" type="submit">Edit</Button>);
        }

        if (!this.state.isModalOpen) {
            return <span />;
        }

        return (
            <Modal title={modalTitle} onRequestHide={this.handleToggle} large>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-body">
                        {this.props.inputs}
                    </div>
                    <div className="modal-footer">
                        {modalButton}
                        <Button onClick={this.handleToggle}>Cancel</Button>
                    </div>
                </form>
            </Modal>
            );
    }
});

module.exports = ModelFormModal;



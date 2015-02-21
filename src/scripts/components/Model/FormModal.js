'use strict';

var React = require('react/addons');
var _ = require('lodash');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('./FormInput');



var ModelFormModal = React.createClass({
    mixins: [OverlayMixin],

    getInitialState: function() {
        return {
            name: false,
            hasOrder: false,
            isModalOpen: false
        };
    },

    componentWillMount: function() {
        var model = new this.props.model();

        this.setState({name: _.startCase(model.name)});

        if (model.attrs.hasOwnProperty('order')) {
            this.setState({hasOrder: true});
        }
    },

    handleSubmit: function(e) {
        e.preventDefault();

        var data = {};
        var form = e.target;
        var inputs = form.querySelectorAll('[name]');

        _.each(inputs, function(input) {
            var name = input.getAttribute('name');
            data[name] = input.value;
        });

        var parent = this.props.parent;
        if (_.isObject(parent)) {
            data['parent_id'] = parent.id;
        }

        var target = this.props.target;

        /* [EDIT MODE] */
        if (_.isObject(target)) {
            target.merge(data).save();
        } else {
            var model = new this.props.model();
            model.create(data).save();
        }

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
        var button = (<Button bsStyle="success" className={this.props.className} onClick={this.handleToggle}><Glyphicon glyph="plus" /> Add {this.state.name}</Button>);

        /* [EDIT MODE] */
        if (_.isObject(this.props.target)) {
            button = (<Button bsSize="small" bsStyle="info" className={this.props.className} onClick={this.handleToggle}><Glyphicon glyph="pencil" /></Button>);
        }

        return (
            button
            );
    },

    renderOverlay: function() {
        var modalTitle = 'Add ' + this.state.name;
        var modalButton = (<Button bsStyle="success" type="submit">Save</Button>);
        var orderInput;

        /* [EDIT MODE] */
        if (_.isObject(this.props.target)) {
            modalTitle = 'Edit ' + this.state.name;
            modalButton = (<Button bsStyle="info" type="submit">Edit</Button>);
        }

        if (this.state.hasOrder) {
            var orderValue;
            if (_.isObject(this.props.target)) {
                orderValue = this.props.target.attrs.order;
            }
            orderInput = (<Input type="text" name="order" placeholder="Sort Order" defaultValue={orderValue} />);
        }

        if (!this.state.isModalOpen) {
            return <span />;
        }

        return (
            <Modal title={modalTitle} bsSize="large" onRequestHide={this.handleToggle}>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-body">
                        {this.props.inputs()}
                        {orderInput}
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



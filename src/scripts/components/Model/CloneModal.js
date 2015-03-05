'use strict';

var React = require('react/addons');
var _ = require('lodash');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('./FormInput');



var ModelCloneModal = React.createClass({
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

    getMode: function() {
        return {
            name: 'Clone ' + this.state.name,
            button: {
                style: 'primary',
                size: 'small',
                glyph: 'retweet'
            }
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

        var parent = self.props.parent;
        var target = self.props.target;

        if (_.isObject(parent)) {
            data['parent_id'] = parent.id;
        }

        var clone = target.merge(data);
        clone.id = null;
        clone.save();

        if (_.isFunction(self.props.onUpdate)) {
            self.props.onUpdate();
        }

        self.handleToggle();
    },

    handleToggle: function() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },

    render: function () {
        var button = this.getMode().button;

        if (this.props.button) button = this.props.button;

        return (
            <Button bsSize={button.size} bsStyle={button.style} className={this.props.className} onClick={this.handleToggle}><Glyphicon glyph={button.glyph} />{button.text ? ' ' + button.text : ''}</Button>
            );
    },

    renderOverlay: function() {
        var mode = this.getMode();

        var orderInput;
        if (this.state.hasOrder) {
            var orderValue;
            if (_.isObject(this.props.target)) {
                orderValue = this.props.target.attrs.order;
            }
            orderInput = (<Input type="text" name="order" addonBefore="Sort" placeholder="Sort Order" defaultValue={orderValue} />);
        }

        if (!this.state.isModalOpen) {
            return <span />;
        }

        return (
            <Modal title={mode.name} bsSize={mode.size} onRequestHide={this.handleToggle}>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-body">
                        <Input type="text" name="name" placeholder="Clone Name" defaultValue={'[Clone] ' + this.props.target.attrs.name} />
                        {orderInput}
                    </div>
                    <div className="modal-footer">
                        <Button bsStyle={mode.button.style} type="submit">Clone</Button>
                        <Button onClick={this.handleToggle}>Cancel</Button>
                    </div>
                </form>
            </Modal>
            );
    }
});

module.exports = ModelCloneModal;
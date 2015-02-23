'use strict';

var React = require('react/addons');
var _ = require('lodash');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('../Model/FormInput');

var Model = require('../../models/EncounterModel');

var Travel = require('./Inputs/Travel');
var Social = require('./Inputs/Social');
var SkillCheck = require('./Inputs/SkillCheck');
var Combat = require('./Inputs/Combat');
var Mechanism = require('./Inputs/Mechanism');
var Other = require('./Inputs/Other');



var EncounterFormModal = React.createClass({
    mixins: [OverlayMixin],

    getInitialState: function() {
        return {
            type: null,
            isModalOpen: false,
            hasOrder: true
        };
    },

    componentWillMount: function() {
        var encounter = this.props.target;

        if (_.isObject(encounter)) {
            this.setState({type: encounter.attrs.type});
        }
    },

    getMode: function() {
        var mode = {
            size: 'large',
            isEdit: _.isObject(this.props.target) ? true : false
        };

        var button = {
            style: 'warning',
            size: 'small',
            glyph: 'link'
        };

        if (mode.isEdit) {
            mode.name = 'Edit Encounter';

            button.style = 'info';
            button.size = 'xsmall';
            button.glyph = 'pencil';
        }
        else {
            mode.name = 'Add Encounter';

            button.text = 'Add Encounter';
        }

        mode.button = button;

        return mode;
    },

    getInputs: function() {
        var mode = this.getMode();
        var attrs = (mode.isEdit) ? this.props.target.attrs : {};

        var typeOptions = [
            {label: 'Travel',       value: 'travel'},
            {label: 'Social',       value: 'social'},
            {label: 'Skill Check',  value: 'skillCheck'},
            {label: 'Combat',       value: 'combat'},
            {label: 'Mechanism',    value: 'mechanism'},
            {label: 'Other',        value: 'other'}
        ];

        var encounterInputs = {
            'travel':       (<Travel mode={mode} campaign={this.props.campaign} attrs={attrs} />),
            'social':       (<Social mode={mode} attrs={attrs} />),
            'skillCheck':   (<SkillCheck mode={mode} attrs={attrs} />),
            'combat':       (<Combat mode={mode} attrs={attrs} />),
            'mechanism':    (<Mechanism mode={mode} attrs={attrs} />),
            'other':        (<Other mode={mode} attrs={attrs} />)
        };

        return (
            <div>
                <Input
                    type="textarea"
                    name="flavor"
                    placeholder="Flavor"
                    defaultValue={attrs.flavor}
                    rows="1"
                />

                <Input
                    type="select"
                    name="type"
                    placeholder="Type"
                    options={typeOptions}
                    defaultValue={this.state.type}
                    onChange={this.handleType}
                />

                {encounterInputs[this.state.type]}
            </div>
            )
    },

    handleType: function(event) {
        var type = event.target.value;

        this.setState({type: type});
    },

    handleSubmit: function(e) {
        e.preventDefault();

        var self = this;
        var mode = self.getMode();

        var data = {details: {}};
        var form = e.target;
        var inputs = form.querySelectorAll('[name="type"],[name="flavor"],[name="order"]');

        _.each(inputs, function(input) {
            var name = input.getAttribute('name');
            data[name] = input.value;
        });

        var detailInputs = form.querySelectorAll('div.details [name]');

        _.each(detailInputs, function(input) {
            var name = input.getAttribute('name');
            data['details'][name] = input.value;
        });

        var parent = self.props.parent;
        if (_.isObject(parent)) {
            data['parent_id'] = parent.id;
        }

        var target = self.props.target;

        /* [EDIT MODE] */
        if (mode.isEdit) {
            target.merge(data).save();
        } else {
            var model = new Model();
            model.create(data).save();
        }

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

        return (
            <Button bsSize={button.size} bsStyle={button.style} className={this.props.className} onClick={this.handleToggle}><Glyphicon glyph={button.glyph} />{button.text ? ' ' + button.text : ''}</Button>
            );
    },

    renderOverlay: function() {
        var mode = this.getMode();

        var orderInput;
        if (this.state.hasOrder) {
            var orderValue;
            if (mode.isEdit) {
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
                        {this.getInputs()}
                        {orderInput}
                    </div>
                    <div className="modal-footer">
                        <Button bsStyle={mode.button.style} type="submit">Save</Button>
                        <Button onClick={this.handleToggle}>Cancel</Button>
                    </div>
                </form>
            </Modal>
            );
    }
});

module.exports = EncounterFormModal;
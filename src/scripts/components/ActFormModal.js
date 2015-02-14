'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Auth = require('../helpers/Auth');
var ActModel = require('../models/ActModel');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('react-bootstrap').Input;



var ActFormModal = React.createClass({
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
        var inputs = form.querySelectorAll('.input');

        _.each(inputs, function(input) {
            var name = input.getAttribute('name');
            data[name] = input.value;
        });
        data.campaign_id = this.props.campaign.id;

        var act = new ActModel();

        /* [EDIT MODE] */
        if (this.props.editMode && _.isObject(this.props.act)) {
            act.id = this.props.act.id;
        }

        act.create(data).save();

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
        var button = (<Button bsStyle="success" className={this.props.className} onClick={this.handleToggle}><Glyphicon glyph="plus" /> Add Act</Button>);

        /* [EDIT MODE] */
        if (this.props.editMode) {
            button = (<Button bsSize="small" bsStyle="info" className={this.props.className} onClick={this.handleToggle}><Glyphicon glyph="pencil" /></Button>);
        }

        return (
            button
            );
    },

    renderOverlay: function() {
        var modal_title = 'Add Act';
        var modal_button = (<Button bsStyle="success" type="submit">Save</Button>);

        /* [EDIT MODE] */
        if (this.props.editMode) {
            modal_title = 'Edit Act';
            modal_button = (<Button bsStyle="info" type="submit">Edit</Button>);
        }

        if (!this.state.isModalOpen) {
            return <span />;
        }

        return (
            <Modal title={modal_title} onRequestHide={this.handleToggle}>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-body">
                        <Input type="text" name="title" className="input" placeholder="Title" defaultValue={_.isObject(this.props.act) ? this.props.act.attrs.title : ''} />
                        <Input type="text" name="category" className="input" placeholder="Category" defaultValue={_.isObject(this.props.act) ? this.props.act.attrs.category : ''} />
                        <Input type="textarea" rows="5" name="story" className="input" placeholder="Story" defaultValue={_.isObject(this.props.act) ? this.props.act.attrs.story : ''} />
                        <Input type="textarea" rows="5" name="goal" className="input" placeholder="Goal" defaultValue={_.isObject(this.props.act) ? this.props.act.attrs.goal : ''} />
                        <Input type="text" name="order" className="input" placeholder="Sort Order" defaultValue={_.isObject(this.props.act) ? this.props.act.attrs.order : ''} />
                    </div>
                    <div className="modal-footer">
                        {modal_button}
                        <Button onClick={this.handleToggle}>Cancel</Button>
                    </div>
                </form>
            </Modal>
            );
    }
});

module.exports = ActFormModal;
'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Auth = require('../../helpers/Auth');

var Model = require('../../models/BattleModel');

var Modal = require('../Model/FormModal');
var Input = require('../Model/FormInput');



var BattleFormModal = React.createClass({
    render: function() {
        var battle = _.isObject(this.props.battle) ? this.props.battle : undefined;
        var attrs = _.isObject(battle) ? battle.attrs : {};

        return (
            <Modal
                titlePart="Group"
                model={Model}

                target={battle}
                related={Auth.User}
                relatedKey="user_id"

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            >

                <Input
                    type="text"
                    name="name"
                    defaultValue={attrs.name}
                />

                <Input
                    type="text"
                    name="type"
                    defaultValue={attrs.type}
                />

                <Input
                    type="textarea"
                    name="flavor"
                    defaultValue={attrs.flavor}
                />

                <Input
                    type="textarea"
                    name="details"
                    placeholder="Behavior"
                    defaultValue={attrs.details}
                />

            </Modal>
            );
    }
});

module.exports = BattleFormModal;



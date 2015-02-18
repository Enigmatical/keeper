'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Auth = require('../helpers/Auth');

var Model = require('../models/FoeModel');

var Modal = require('./ModelLinkModal');
var Input = require('./ModelFormInput');



var FoeLinkModal = React.createClass({
    getInitialState: function() {
        return {
            options: []
        }
    },

    getOptions: function() {
        var self = this;
        var options = [];

        Auth.User.getFoes()
            .then(function(foes) {
                _.each(foes, function(foe) {
                    var label = foe.attrs.name + ', CR ' + foe.attrs.challenge + ' (Max ' + foe.attrs.onHand + ')';
                    var option = {
                        label: label,
                        value: foe.id
                    };
                    options.push(option);
                });

                self.setState({options: options});
            });
    },

    render: function() {
        return (
            <Modal
                titlePart="Foe"

                target={this.props.target}

                className={this.props.className}
                onOpen={this.getOptions}
                onUpdate={this.props.onUpdate}
            >

                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type="select"
                            name="id"
                            placeholder="Foe"
                            options={this.state.options}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="count"
                            placeholder="How Many?"
                        />
                    </div>
                </div>

            </Modal>
            );
    }
});

module.exports = FoeLinkModal;






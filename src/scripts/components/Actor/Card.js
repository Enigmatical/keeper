'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;

var FormModal = require('../Model/FormModal');
var RemoveModal = require('../Model/RemoveModal');

require('../../../styles/ItemCard.css');



var ActorCard = React.createClass({
    render: function () {
        var actor = this.props.target;
        var character = actor.character;

        if (_.isObject(character)) {
            return (
                <div className="item-link-wrapper">
                    <div className="item-link">
                        <p className="pull-left">
                            <strong>{character.attrs.name}</strong> <small className="text-muted">{character.attrs.type}</small>
                        </p>
                        <ButtonToolbar className="pull-right">
                            <FormModal link={true} target={actor} model={this.props.model} parent={this.props.parent} inputs={this.props.inputs} onUpdate={this.props.onUpdate} />
                            <RemoveModal link={true} target={actor} onUpdate={this.props.onUpdate} />
                        </ButtonToolbar>
                    </div>
                </div>
                );
        }
        else {
            return(<span />);
        }
    }
});

module.exports = ActorCard;
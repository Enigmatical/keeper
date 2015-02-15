'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Input = require('react-bootstrap').Input;



var ModelFormInput = React.createClass({
    render: function () {
        var inputProps = {
            'data-form': 'input',
            'placeholder': _.startCase(this.props.name)
        };

        if (this.props.type === 'textarea') {
            inputProps['rows'] = 5;
            if (this.props.markdown !== false) {
                inputProps['data-form'] += ' markdown';
            }
        }

        if (this.props.optional === true) {
            inputProps['placeholder'] += ' (Optional)';
        }

        if (this.props.required === true) {
            inputProps['placeholder'] += ' (Required)';
            inputProps['data-form'] += ' required';
        }

        return (
            React.createElement(Input, React.__spread(inputProps, this.props),
                this.props.children
            )
        );
}
});

module.exports = ModelFormInput;



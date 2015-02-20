'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Input = require('react-bootstrap').Input;



var ModelFormInput = React.createClass({
    render: function () {
        var inputProps = {
            'className': 'form-input',
            'placeholder': _.startCase(this.props.name)
        };

        if (this.props.placeholder) {
            inputProps['placeholder'] = this.props.placeholder;
        }

        if (this.props.type === 'textarea') {
            inputProps['rows'] = 5;
            if (this.props.markdown !== false) {
                inputProps['className'] += ' markdown';
            }
        }

        if (this.props.optional === true) {
            inputProps['placeholder'] += ' (Optional)';
        }

        if (this.props.required === true) {
            inputProps['placeholder'] += ' (Required)';
            inputProps['className'] += ' required';
        }

        if (this.props.type === 'select') {
            var options = [<option key={'option-blank'} value="" disabled>Select One...</option>];

            _.each(this.props.options, function(option, index) {
                 options.push(<option key={'option-'+index} value={option.value}>{option.label}</option>);
            });

            inputProps['addonBefore'] = inputProps['placeholder'];
            this.props.children = options;
        }

        var inputElement = React.createElement(Input, React.__spread(inputProps, this.props),
                this.props.children
            );

        return (
            inputElement
        );
}
});

module.exports = ModelFormInput;



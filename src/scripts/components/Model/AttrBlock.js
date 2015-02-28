'use strict';

var React = require('react/addons');
var Markdown = require('../Common/MarkdownBlock');
var _ = require('lodash');



var ModelAttrBlock = React.createClass({
    render: function () {
        var name = this.props.name;
        var attr = this.props.attr;
        var text = this.props.text || '';
        var bg = this.props.bg || '';

        var blockClass = 'attribute-block';
        blockClass += !_.isEmpty(this.props.className) ? this.props.className : '';

        var headerClass = 'body-header';
        headerClass += !_.isEmpty(this.props.text) ? ' text-' + this.props.text : '';
        headerClass += !_.isEmpty(this.props.bg) ? ' bg-' + this.props.bg : '';

        var bodyClass = 'body-content';
        bodyClass += !_.isEmpty(this.props.text) ? ' text-' + this.props.text : '';
        bodyClass += !_.isEmpty(this.props.bg) ? ' bg-' + this.props.bg : '';

        var header = (<p className={headerClass}>{name}</p>);
        if (_.isEmpty(name)) {
            header = (<span />);
        }

        if (attr) {
            if (this.props.markdown === true) {
                return (
                    <div className={blockClass}>
                        {header}
                        <Markdown className={bodyClass} text={attr} />
                    </div>
                    );
            }
            else {
                return (
                    <div className={blockClass}>
                        {header}
                        <p className={bodyClass}>{attr}</p>
                    </div>
                    );
            }
        }
        else {
            return (<span />);
        }
    }
});

module.exports = ModelAttrBlock;



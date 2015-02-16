'use strict';

var React = require('react/addons');
var Markdown = require('./MarkdownBlock');



var ModelAttrBlock = React.createClass({
    render: function () {
        var name = this.props.name;
        var attr = this.props.attr;

        if (attr) {
            if (this.props.markdown === true) {
                return (
                    <div className={this.props.className}>
                        <p className="body-header">{name}</p>
                        <Markdown className="body-content" text={attr} />
                    </div>
                    );
            }
            else {
                return (
                    <div className={this.props.className}>
                        <p className="body-header">{name}</p>
                        <p className="body-content">{attr}</p>
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



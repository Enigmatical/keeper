'use strict';

var React = require('react/addons');
var Markdown = require('markdown').markdown;



var MarkdownBlock = React.createClass({
    render: function () {
        var html = Markdown.toHTML(this.props.text);
        return (
            <div className={this.props.className} dangerouslySetInnerHTML={{__html: html}} />
            );
    }
});

module.exports = MarkdownBlock;



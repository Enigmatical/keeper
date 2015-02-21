'use strict';

var React = require('react/addons');
var _ = require('lodash');

var MenuItemLink = require('react-router-bootstrap').MenuItemLink;



var Breadcrumb = React.createClass({
    render: function () {
        var crumbs = {};

        _.each(this.props.crumbs, function(crumb) {
            if (crumb.link) {
                crumbs['crumb-' + _.camelCase(crumb.link)] = <MenuItemLink to={crumb.link} params={crumb.params}>{crumb.text}</MenuItemLink>
            } else {
                crumbs['crumb-' + _.camelCase(crumb.link)] = <li className="active">{crumb.text}</li>
            }
        });

        return (
            <ol className="breadcrumb">
                {crumbs}
            </ol>
            );
    }
});

module.exports = Breadcrumb;



'use strict';

var React = require('react/addons');
var _ = require('lodash');

var MenuItemLink = require('react-router-bootstrap').MenuItemLink;



var MainBreadcrumb = React.createClass({
    render: function () {
        var crumbs = {};

        _.each(this.props.crumbs, function(crumb) {
            if (crumb.link) {
                crumbs['crumb-' + crumb.text] = <MenuItemLink to={crumb.link} params={crumb.params}>{crumb.text}</MenuItemLink>
            } else {
                crumbs['crumb-' + crumb.text] = <li className="active">{crumb.text}</li>
            }
        });

        return (
            <ol className="breadcrumb">
                <MenuItemLink to="manage-campaigns">Campaigns</MenuItemLink>
                {crumbs}
            </ol>
            );
    }
});

module.exports = MainBreadcrumb;



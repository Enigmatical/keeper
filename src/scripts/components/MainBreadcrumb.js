'use strict';

var React = require('react/addons');
var _ = require('lodash');

var MenuItemLink = require('react-router-bootstrap').MenuItemLink;



var MainBreadcrumb = React.createClass({
    render: function () {
        var crumbs = {};

        if (_.isArray(this.props.crumbs))
        {
            crumbs['crumb-campaigns'] = <MenuItemLink to="manage-campaigns">Campaigns</MenuItemLink>;
            _.each(this.props.crumbs, function(crumb) {
                if (crumb.link) {
                    crumbs['crumb-' + _.camelCase(crumb.text)] = <MenuItemLink to={crumb.link} params={crumb.params}>{crumb.text}</MenuItemLink>
                } else {
                    crumbs['crumb-' + _.camelCase(crumb.text)] = <li className="active">{crumb.text}</li>
                }
            });
        }
        else {
            crumbs['crumb-campaigns'] = <li className="active">Campaigns</li>
        }

        return (
            <ol className="breadcrumb">
                {crumbs}
            </ol>
            );
    }
});

module.exports = MainBreadcrumb;



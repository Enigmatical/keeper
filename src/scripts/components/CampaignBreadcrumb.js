'use strict';

var React = require('react/addons');
var _ = require('lodash');

var MenuItemLink = require('react-router-bootstrap').MenuItemLink;



var CampaignBreadcrumb = React.createClass({
    render: function () {
        var trail;
        if (_.isObject(this.props.campaign) && !_.isObject(this.props.act)) {
            trail = <li className="active">{this.props.campaign.attrs.title}</li>;
        }
        else {
            trail = <MenuItemLink to="campaign" params={{campaignId: this.props.campaign.id}}>{this.props.campaign.attrs.title}</MenuItemLink>
        }

        return (
            <ol className="breadcrumb">
                <MenuItemLink to="campaigns">Campaigns</MenuItemLink>
                {trail}
            </ol>
            );
    }
});

module.exports = CampaignBreadcrumb;



'use strict';

var React = require('react/addons');
var _ = require('lodash');

var MenuItemLink = require('react-router-bootstrap').MenuItemLink;



var CampaignBreadcrumb = React.createClass({
    render: function () {
        var campaignCrumb,
            actCrumb,
            questCrumb = <span />;

        // Campaign
        if (_.isObject(this.props.campaign) && !_.isObject(this.props.act)) {
            campaignCrumb = <li className="active">{this.props.campaign.attrs.title}</li>;
        }
        else  {
            campaignCrumb = <MenuItemLink to="manage-acts" params={{campaignId: this.props.campaign.id}}>{this.props.campaign.attrs.title}</MenuItemLink>

            // Act
            if (_.isObject(this.props.act) && !_.isObject(this.props.quest)) {
                actCrumb = <li className="active">{this.props.act.attrs.title}</li>;
            }
            else {
                actCrumb = <MenuItemLink to="manage-quests" params={{campaignId: this.props.campaign.id, actId: this.props.act.id}}>{this.props.act.attrs.title}</MenuItemLink>

                // Quest
                if (_.isObject(this.props.quest)) {
                    questCrumb = <li className="active">{this.props.quest.attrs.title}</li>;
                }
            }
        }


        return (
            <ol className="breadcrumb">
                <MenuItemLink to="manage-campaigns">Campaigns</MenuItemLink>
                {campaignCrumb}
                {actCrumb}
                {questCrumb}
            </ol>
            );
    }
});

module.exports = CampaignBreadcrumb;



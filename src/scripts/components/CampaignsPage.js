'use strict';

var React = require('react/addons');
var Auth = require('../helpers/Auth');
require('../../styles/CampaignsPage.css');



var CampaignsPage = React.createClass({
    mixins: [Auth],

    render: function () {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1>Campaigns</h1>
                </div>
            </div>
            );
    }
});

module.exports = CampaignsPage;



'use strict';

var React = require('react/addons');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;



var ModelPageHeader = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1 className="page-header">
                        {this.props.pageName}&nbsp;&nbsp;<small>{this.props.pageType}</small>
                        <ButtonToolbar className="pull-right">
                            {this.props.children}
                        </ButtonToolbar>
                    </h1>
                </div>
            </div>
            );
    }
});

module.exports = ModelPageHeader;



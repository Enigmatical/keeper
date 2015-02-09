'use strict';

var React = require('react/addons');
require('../../styles/CharactersPage.css');



var CharactersPage = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1>Characters</h1>
                </div>
            </div>
            );
    }
});

module.exports = CharactersPage;



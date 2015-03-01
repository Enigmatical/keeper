'use strict';

var React = require('react/addons');
var Markdown = require('../Common/MarkdownBlock');
var _ = require('lodash');

var Glyphicon = require('react-bootstrap').Glyphicon;

require('../../../styles/AttrBlock.css');



var ModelAttrBlock = React.createClass({
    getAttrTemplate: function() {
        var type = this.props.type;

        var name = this.props.name;
        var attr = this.props.attr;
        var glyph = this.props.glyph;

        var glyphs = {
            type:       'info-sign',
            challenge:  'exclamation-sign',
            xp:         'star',
            coin:       'tasks',
            date:       'calendar',
            location:   'globe',
            party:      'user',
            count:      'th-large',
            page:       'book',
            skill:      'eye-open'
        };

        switch(type) {
            case 'flavor':
                return (
                    <section className="row">
                        <div className="attribute-block col-md-12">
                            <div className="style-flavor text-turquoise bg-turquoise">
                                <Markdown text={attr} />
                            </div>
                        </div>
                    </section>
                    );
                break;
            case 'details':
                return (
                    <section className="row">
                        <div className="attribute-block col-md-12">
                            <div className="style-details">
                                <Markdown text={attr} />
                            </div>
                        </div>
                    </section>
                    );
                break;
            case 'rewards':
                return (
                    <section className="row">
                        <div className="attribute-block col-md-12">
                            <div className="style-rewards text-orange bg-orange">
                                <p className="body-header">Rewards</p>
                                <Markdown className="attr-value" text={attr} />
                            </div>
                        </div>
                    </section>
                    );
                break;
            case 'custom':
                var header = !_.isEmpty(name) ? (<p className="body-header">{name}</p>) : '';

                return (
                    <div className="attribute-block style-custom col-md-12">
                        <div className={this.props.className}>
                            {header}
                            <Markdown className="attr-value" text={attr} />
                        </div>
                    </div>
                    );
                break;
            case 'stat':
                return (
                    <div className="attribute-block style-stat col-md-3">
                        <Glyphicon glyph={glyphs[glyph]} />
                        <span className="attr-label">{name}</span>
                        <span className="attr-value">{attr}</span>
                    </div>
                    );
                break;
            default:
                return (<div>Need to define a <strong>type</strong> for this AttrBlock.</div>);
                break;
        }
    },

    render: function () {
        var attr = this.props.attr;

        if (!_.isEmpty(attr) || _.isNumber(attr)) {
            return (
                    this.getAttrTemplate()
                );
        }
        else {
            return (<span />);
        }
    }
});

module.exports = ModelAttrBlock;



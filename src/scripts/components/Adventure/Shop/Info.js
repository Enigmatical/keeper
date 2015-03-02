'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Pathfinder = require('../../../helpers/Pathfinder');

var AttrBlock = require('../../Model/AttrBlock');

var BlacksmithInfo = require('./BlacksmithInfo');
var ApothecaryInfo = require('./ApothecaryInfo');
var GeneralGoodsInfo = require('./GeneralGoodsInfo');
var JewelerInfo = require('./JewelerInfo');
var TavernInfo = require('./TavernInfo');
var BookstoreInfo = require('./BookstoreInfo');



var ShopAdventureInfo = React.createClass({
    getShopServices: function(type) {
        switch(type) {
            case 'blacksmith':
                return (<BlacksmithInfo target={this.props.target} save={this.props.save} onSave={this.props.onSave} />);
                break;
            case 'apothecary':
                return (<ApothecaryInfo target={this.props.target} save={this.props.save} onSave={this.props.onSave} />);
                break;
            case 'generalGoods':
                return (<GeneralGoodsInfo target={this.props.target} save={this.props.save} onSave={this.props.onSave} />);
                break;
            case 'jeweler':
                return (<JewelerInfo target={this.props.target} save={this.props.save} onSave={this.props.onSave} />);
                break;
            case 'tavern':
                return (<TavernInfo target={this.props.target} save={this.props.save} onSave={this.props.onSave} />);
                break;
            case 'bookstore':
                return (<BookstoreInfo target={this.props.target} save={this.props.save} onSave={this.props.onSave} />);
                break;
            default:
                return (<span />);
                break;
        }
    },

    render: function () {
        var target = this.props.target;
        var shopDetails = Pathfinder.getShopModifierDetails(target.attrs.quality);

        return (
            <div>
                <AttrBlock type="flavor" attr={target.attrs.flavor} />
                <section className="row">
                    <AttrBlock type="stat" name="Type" glyph="type" attr={_.startCase(target.attrs.type)} />
                    <AttrBlock type="stat" name="Quality" glyph="type" attr={_.startCase(target.attrs.quality)} />
                    <AttrBlock type="stat" name="Max Value" glyph="coin" attr={shopDetails.baseValue} />
                </section>
                <AttrBlock type="details" attr={target.attrs.details} />
                {this.getShopServices(target.attrs.type)}
            </div>
            );
    }
});

module.exports = ShopAdventureInfo;
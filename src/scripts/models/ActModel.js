'use strict';

var BaseModel = require('../models/BaseModel');



function ActModel() {
    BaseModel.apply(this, ['acts']);

    this.attrs = {
        campaign_id: null,

        title: null,
        category: null,
        story: null,
        goal: null,
        order: null
    };
}

ActModel.prototype = new Object(BaseModel.prototype);

module.exports = ActModel;
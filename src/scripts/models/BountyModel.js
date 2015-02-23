'use strict';

var BaseModel = require('./BaseModel');
var EncounterModel = require('./EncounterModel');



function BountyModel() {
    BaseModel.apply(this, ['bounties']);

    this.name = 'bounty';

    this.attrs = {
        parent_id: null,

        name: null,
        type: null,
        details: null,
        flavor: null,
        challenge: null,
        quality: null,
        rewardXp: null,
        rewardCoin: null,
        rewardOther: null
    };

    this.getEncounters = function() {
        return this.getRelated(EncounterModel, 'order');
    }
}

BountyModel.prototype = new Object(BaseModel.prototype);

module.exports = BountyModel;
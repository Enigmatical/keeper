'use strict';

var BaseModel = require('../models/BaseModel');



function UserModel() {
    BaseModel.apply(this, ['users']);

    this.attrs = {
        name: null,
        provider: null
    };
}

UserModel.prototype = new Object(BaseModel.prototype);

module.exports = UserModel;
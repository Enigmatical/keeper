'use strict';

var React = require('react/addons');

var Auth = require('../../helpers/Auth');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var PageHeader = require('../Model/PageHeader');
var FormModal = require('../Model/FormModal');
var Input = require('../Model/FormInput');

var FoeModel = require('../../models/FoeModel');
var FoeCard = require('./Card');
var FoeInputs = require('./Inputs');

var BattleModel = require('../../models/BattleModel');
var BattleCard = require('../Battle/Card');


var FoeManagePage = React.createClass({
    mixins: [Auth],

    getInitialState: function() {
        return {
            foes: [],
            battles: [],
            activeTab: 1
        }
    },

    componentWillMount: function() {
        this.getFoes(false);
        this.getBattles(false);
    },

    getFoes: function(setTab) {
        if (setTab === undefined) {
            setTab = true;
        }

        var self = this;

        Auth.User.getFoes().then(function(foes) {
            self.setState({foes: foes});
            if (setTab) {
                self.setState({activeTab: 1});
            }
        });
    },

    getFoeInputs: function(attrs) {
        return (
            <FoeInputs attrs={attrs} />
            );
    },

    getBattles: function(setTab) {
        if (setTab === undefined) {
            setTab = true;
        }

        var self = this;

        Auth.User.getBattles().then(function(battles) {
            self.setState({battles: battles});
            if (setTab) {
                self.setState({activeTab: 2});
            }
        });
    },

    getBattleInputs: function(attrs) {
        return(
            <div>
                <Input
                    type="text"
                    name="name"
                    defaultValue={attrs.name}
                />

                <Input
                    type="text"
                    name="type"
                    defaultValue={attrs.type}
                />

                <Input
                    type="textarea"
                    name="flavor"
                    defaultValue={attrs.flavor}
                />

                <Input
                    type="textarea"
                    name="details"
                    placeholder="Behavior"
                    defaultValue={attrs.details}
                />
            </div>
            );
    },

    handleTabs: function(selectedKey) {
        this.setState({activeTab: selectedKey});
    },

    render: function () {
        var self = this;

        return (
            <div id="foe-manage-page" className="page-content">
                <PageHeader pageName="Foes">
                    <FormModal model={FoeModel} related={{key: 'user_id', on: Auth.User}} inputs={self.getFoeInputs.bind(self, {})} onUpdate={self.getFoes} />
                    <FormModal model={BattleModel} related={{key: 'user_id', on: Auth.User}} inputs={self.getBattleInputs.bind(self, {})} onUpdate={self.getBattles} />
                </PageHeader>
                <div className="row">
                    <div className="col-md-12">
                        <TabbedArea activeKey={this.state.activeTab} onSelect={this.handleTabs}>
                            <TabPane eventKey={1} tab="Foes">
                                {self.state.foes.map(function(foe) {
                                    return (
                                        <div key={foe.id} className="col-md-6">
                                            <FoeCard model={FoeModel} foe={foe} inputs={self.getFoeInputs.bind(self, foe.attrs)} onUpdate={self.getFoes} />
                                        </div>
                                        );
                                })}
                            </TabPane>
                            <TabPane eventKey={2} tab="Groups">
                                {self.state.battles.map(function(battle) {
                                     return (
                                         <div key={battle.id} className="col-md-6">
                                             <BattleCard model={BattleModel} battle={battle} inputs={self.getBattleInputs.bind(self, battle.attrs)} onUpdate={self.getBattles} />
                                         </div>
                                        );
                                })}
                            </TabPane>
                        </TabbedArea>
                    </div>
                </div>
            </div>
            );
    }
});

module.exports = FoeManagePage;



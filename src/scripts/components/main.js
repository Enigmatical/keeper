var React = require('react');
var Router = require('react-router');

var KeeperApp = require('./KeeperApp');

var HomePage = require('./HomePage');

var CampaignManagePage = require('./Campaign/ManagePage');
    var ActManagePage = require('./Act/ManagePage');
        var QuestManagePage = require('./Quest/ManagePage');
            var TaskManagePage = require('./Task/ManagePage');
    var LocationManagePage = require('./Location/ManagePage');
        var AreaManagePage = require('./Area/ManagePage');

var PartyManagePage = require('./Party/ManagePage');

var CharacterManagePage = require('./Character/ManagePage');

var FoeManagePage = require('./Foe/ManagePage');

var ToolsPage = require('./ToolsPage');

var SaveManagePage = require('./Save/ManagePage');
    var RunPage = require('./Adventure/RunPage');

var content = document.getElementById('content');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Routes = (
    <Route handler={KeeperApp}>
        <DefaultRoute name="home" handler={HomePage}/>
        <Route name="manage-campaigns" path="/manage/campaigns" handler={CampaignManagePage}/>
            <Route name="manage-acts" path="/manage/campaign/:campaignId/acts" handler={ActManagePage}/>
                <Route name="manage-quests" path="/manage/campaign/:campaignId/act/:actId/quests" handler={QuestManagePage} />
                    <Route name="manage-tasks" path="/manage/campaign/:campaignId/act/:actId/quest/:questId/tasks" handler={TaskManagePage} />
            <Route name="manage-locations" path="/manage/campaign/:campaignId/locations" handler={LocationManagePage}/>
                <Route name="manage-areas" path="/manage/campaign/:campaignId/location/:locationId/areas" handler={AreaManagePage}/>
        <Route name="manage-parties" path="/manage/parties" handler={PartyManagePage}/>
        <Route name="manage-characters" path="/manage/characters" handler={CharacterManagePage}/>
        <Route name="manage-foes" path="/manage/foes" handler={FoeManagePage}/>
        <Route name="tools" path="/tools" handler={ToolsPage}/>

        <Route name="manage-saves" path="/manage/campaign/:campaignId/saves" handler={SaveManagePage} />

        <Route name="run-campaign" path="/adventure/campaign/:campaignId/save/:saveId" handler={RunPage} />
    </Route>
    );



Router.run(Routes, function (Handler) {
    React.render(<Handler/>, content);
});

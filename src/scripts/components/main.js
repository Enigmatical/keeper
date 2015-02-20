var React = require('react');
var Router = require('react-router');

var KeeperApp = require('./KeeperApp');

var HomePage = require('./HomePage');

var CampaignManagePage = require('./Campaign/ManagePage');
    var ActManagePage = require('./Act/ManagePage');
        var QuestManagePage = require('./QuestManagePage');
            var TaskManagePage = require('./TaskManagePage');
    var LocationManagePage = require('./LocationManagePage');
        var AreaManagePage = require('./Area/ManagePage');

var CharacterManagePage = require('./Character/ManagePage');

var FoeManagePage = require('./Foe/ManagePage');

var ToolsPage = require('./ToolsPage');

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
        <Route name="manage-characters" path="/manage/characters" handler={CharacterManagePage}/>
        <Route name="manage-foes" path="/manage/foes" handler={FoeManagePage}/>
        <Route name="tools" path="/tools" handler={ToolsPage}/>
    </Route>
    );



Router.run(Routes, function (Handler) {
    React.render(<Handler/>, content);
});

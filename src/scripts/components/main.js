var React = require('react');
var Router = require('react-router');

var KeeperApp = require('./KeeperApp');
var HomePage = require('./HomePage');
var CampaignManagePage = require('./CampaignManagePage');
    var ActManagePage = require('./ActManagePage');
        var QuestManagePage = require('./QuestManagePage');

var CharactersPage = require('./CharactersPage');
var BestiaryPage = require('./BestiaryPage');
var ToolsPage = require('./ToolsPage');

var content = document.getElementById('content');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Routes = (
    <Route handler={KeeperApp}>
        <DefaultRoute name="home" handler={HomePage}/>
        <Route name="manage-campaigns" path="/manage/campaigns" handler={CampaignManagePage}/>
            <Route name="manage-acts" path="/manage/campaign/:campaignId" handler={ActManagePage}/>
            <Route name="manage-quests" path="/manage/campaign/:campaignId/act/:actId" handler={QuestManagePage} />
        <Route name="characters" path="/manage/characters" handler={CharactersPage}/>
        <Route name="bestiary" path="/manage/bestiary" handler={BestiaryPage}/>
        <Route name="tools" path="/tools" handler={ToolsPage}/>
    </Route>
    );



Router.run(Routes, function (Handler) {
    React.render(<Handler/>, content);
});

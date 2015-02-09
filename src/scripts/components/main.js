var React = require('react');
var Router = require('react-router');

var KeeperApp = require('./KeeperApp');
var HomePage = require('./HomePage');
var CampaignsPage = require('./CampaignsPage');
var CharactersPage = require('./CharactersPage');
var BestiaryPage = require('./BestiaryPage');
var ToolsPage = require('./ToolsPage');

var content = document.getElementById('content');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Routes = (
    <Route handler={KeeperApp}>
        <DefaultRoute name="home" handler={HomePage}/>
        <Route name="campaigns" path="/campaigns" handler={CampaignsPage}/>
        <Route name="characters" path="/characters" handler={CharactersPage}/>
        <Route name="bestiary" path="/bestiary" handler={BestiaryPage}/>
        <Route name="tools" path="/tools" handler={ToolsPage}/>
    </Route>
    );



Router.run(Routes, function (Handler) {
    React.render(<Handler/>, content);
});

'use strict';

var React = require('react/addons');
var Auth = require('../helpers/Auth');
var Navigation = require('react-router').Navigation;

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItemLink = require('react-router-bootstrap').NavItemLink;
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Link = require('react-router').Link;

require('../../styles/MainNav.css');



var MainNav = React.createClass({
    mixins: [Navigation],

    getInitialState: function() {
        return { loggedIn: Auth.isLoggedIn() };
    },

    componentWillMount: function() {
        Auth.onChange = this.setStateWithAuth;
    },

    handleLogin: function() {
        Auth.login();
    },

    handleLogout: function() {
        this.transitionTo("home");
        Auth.logout();
    },

    setStateWithAuth: function() {
        this.setState({ loggedIn: Auth.isLoggedIn() });
    },

    render: function () {
        var loggedIn = this.state.loggedIn;
        var leftNav, rightNav;

        if (loggedIn) {
            leftNav = (
                <Nav className="navbar-left">
                    <NavItemLink to="home">Dungeon Keeper</NavItemLink>
                    <NavItemLink to="manage-campaigns">Campaigns</NavItemLink>
                    <NavItemLink to="characters">Characters</NavItemLink>
                    <NavItemLink to="bestiary">Bestiary</NavItemLink>
                    <NavItemLink to="tools">Tools</NavItemLink>
                </Nav>
                );

            rightNav = (
                <Nav className="navbar-right">
                    <li>
                        <Button className="navbar-btn" onClick={this.handleLogout}>Logout</Button>
                    </li>
                </Nav>
                );
        }
        else {
            leftNav = (
                <Nav className="navbar-left">
                    <NavItemLink to="home">Dungeon Keeper</NavItemLink>
                    <li>
                        <Button bsStyle="primary" className="navbar-btn" onClick={this.handleLogin}>Login with Facebook</Button>
                    </li>
                </Nav>
                );

            rightNav = (
                <Nav className="navbar-right">
                </Nav>
                );
        }

        return (
            <Navbar className="navbar-static-top" fluid>
                {leftNav}
                {rightNav}
            </Navbar>
            );
    }
});

module.exports = MainNav;



import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Menu, Container, Image } from 'semantic-ui-react'
import Home from "../home/Home"
import User from "../user/User"
import Conversations from "../conversations/Conversations"

const Routes = () => {
  return (
    <Router>
      <Menu fixed='top' style={{ display: 'inline-block'}}>
        <Container>
          <Menu.Item as='a' header>
            <Image size='mini' src='' style={{ marginRight: '1.5em' }} />
            Ericada
          </Menu.Item>
          <Menu.Item as={Link} to="/">Home</Menu.Item>
          <Menu.Item as={Link} to="/chat">Chat</Menu.Item>
          <Menu.Item as={Link} to="/user" style={{ position: 'right' }}>Account</Menu.Item>
        </Container>
      </Menu>
      <Switch>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/chat">
          <Conversations />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes;
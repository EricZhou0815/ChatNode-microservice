import React from 'react';
import { Message, Icon, Label,Button, Input } from 'semantic-ui-react'

const MessageItem = () => {
  return (
    <div>
      <Message compact>
        <Icon name='leaf' />
        <div>
          <Message.Header>
            <div>Ericada</div>
            <div>time</div>
            <div>date</div>
          </Message.Header>
          <div>
            We are fetching that content for you.
          </div>
        </div>
      </Message>
      <Input attached='bottom' />
      <Label.Group>
        <Label as='a' onClick={() => alert("added")}>
          Add Tag
          <Icon name='plus' />
        </Label>
        <Label as='a' onClick={()=>alert("removed")}>
          Fun
          <Icon name='close' />
        </Label>
      </Label.Group>
    </div>
  )
}

export default MessageItem;
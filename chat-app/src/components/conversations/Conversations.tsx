import React from 'react';
import { Container, Segment, Input } from 'semantic-ui-react'
import MessagesList from "./MessagesList"

const Conversations = () => {
  return (
    <div className="chat-wrapper">
      <Container>
        <Segment.Group>
          <Segment style={{height:'90vh', paddingTop:'40px', overflow:'auto'}}>
            <MessagesList />
          </Segment>
          <Segment>
            <Input action={{
              color: 'teal',
              content: 'Send',
            }} placeholder='Message...' style={{width:'90%'}}/>
          </Segment>
        </Segment.Group>
      </Container>
    </div>
  )
}

export default Conversations;
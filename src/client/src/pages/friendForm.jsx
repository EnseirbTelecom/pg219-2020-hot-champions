import React from 'react';
import {
  Page,
  Navbar,
  List,
  ListInput,
  ListItem,
  Toggle,
  BlockTitle,
  Row,
  Button,
  Range,
  Block
} from 'framework7-react';

export default () => (
  <Page name="form">
    <Navbar backLink="Back"></Navbar>
    <BlockTitle>Add Friend</BlockTitle>
    <List noHairlinesMd inset>
      <ListInput
        label="E-mail"
        type="email"
        placeholder="example@example.com"
      ></ListInput>
      <ListItem>
        <Button fill color="green">Add</Button>
      </ListItem>
    </List>
  </Page>
);
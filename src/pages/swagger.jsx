import React from 'react';
import { RedocStandalone } from 'redoc';
import { Page, Navbar, Block, BlockTitle } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="About" backLink="Back" />
    <BlockTitle>About My App</BlockTitle>
    <RedocStandalone specUrl="https://raw.githubusercontent.com/EnseirbTelecom/pg219-2020-hot-champions/master/doc/api/openapi.json"/>
  </Page>
);
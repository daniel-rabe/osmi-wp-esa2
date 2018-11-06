import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { GuestbookManager } from './GuestbookManager';

const guestbookManager: GuestbookManager = new GuestbookManager();

ReactDOM.render(
  <App manager={guestbookManager}/>,
  document.getElementById('root') as HTMLElement
);
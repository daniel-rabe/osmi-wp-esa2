import * as React from 'react';
import Header from './Header';
import Content from './Content';
import { GuestbookManager } from './GuestbookManager';

export interface AppProps {
  manager: GuestbookManager;
}

class App extends React.Component<AppProps> {
  public render() {
    return (
      <React.Fragment>
        <Header manager={this.props.manager}/>
        <Content manager={this.props.manager}/>
      </React.Fragment>
    );
  }
}

export default App;

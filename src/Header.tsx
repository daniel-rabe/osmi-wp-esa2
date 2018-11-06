import * as React from 'react';

import Info from '@material-ui/icons/Info';
import AddBox from '@material-ui/icons/AddBox';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InfoDialog from './Dialogs/InfoDialog';
import AddDialog from './Dialogs/AddDialog';
import { GuestbookManager } from './GuestbookManager';

interface HeaderProps {
  manager: GuestbookManager;
}

interface HeaderState {
  dialog: null | 'info' | 'add';
}

class Header extends React.PureComponent<HeaderProps, HeaderState> {
  public componentWillMount(): void {
    this.setState({dialog: null});
    this.showInfoDialog = this.showInfoDialog.bind(this);
    this.showAddDialog = this.showAddDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
  }

  public render() {
    return (
      <React.Fragment>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton color="inherit" onClick={this.showInfoDialog} style={{marginLeft: -12, marginRight: 12}}><Info/></IconButton>
            <Typography variant="h6" color="inherit" style={{flex: 1}}>Gästebuch</Typography>
            <IconButton color="inherit" onClick={this.showAddDialog}><AddBox/></IconButton>
          </Toolbar>
        </AppBar>
        <InfoDialog show={this.state.dialog === 'info'} close={this.hideDialog}/>
        <AddDialog show={this.state.dialog === 'add'} close={this.hideDialog} add={this.props.manager.add}/>
      </React.Fragment>
    );
  }

  protected showInfoDialog(): void {
    this.setState({dialog: 'info'});
  }

  protected showAddDialog(): void {
    this.setState({dialog: 'add'});
  }

  protected hideDialog(): void {
    this.setState({dialog: null});
  }
}

export default Header;

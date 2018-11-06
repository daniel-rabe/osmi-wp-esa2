import * as React from 'react';

import Info from '@material-ui/icons/Info';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

interface EsaBarState {
  showDialog: boolean;
}

class EsaBar extends React.PureComponent<{}, EsaBarState> {
  public componentWillMount(): void {
    this.setState({showDialog: false});
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
  }

  public render() {
    return (
      <React.Fragment>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" color="inherit" style={{flex: 1}}>Gästebuch</Typography>
            <IconButton color="inherit" onClick={this.showDialog}><Info/></IconButton>
          </Toolbar>
        </AppBar>
        <Dialog
          open={this.state.showDialog}
          onClose={this.hideDialog}
        >
          <DialogTitle>Einsendeaufgabe 2</DialogTitle>
          <DialogContent>
            <DialogContentText>Pflicht: Mindestfunktionsumfang:</DialogContentText>
            <DialogContentText>Anlegen eines neuen Eintrags</DialogContentText>
            <DialogContentText>Löschen eines Eintrags</DialogContentText>
            <DialogContentText>Prüfen, ob alle Pflichtfelder (Name und Eintrag) angegeben wurden</DialogContentText>
            <DialogContentText>Syntaxprüfung bei Email</DialogContentText>
            <DialogContentText>Neue Einträge werden dynamisch in das DOM eingefügt, d. h. die Seite wird nicht komplett neu geladen / aufgebaut.</DialogContentText>
            <DialogContentText>Kür: Serverseitige Speicherung: Änderungen bzw. die neuen Einträge werden asynchron an den Server übertragen und dort persistent gespeichert. Die Speicherung kann in einer Datei oder einer Datenbank oder .. erfolgen.</DialogContentText>
            <DialogContentText>Sie dürfen auch Frameworks oder Bibliotheken benutzen, muessen aber erklären können, was Sie tun.</DialogContentText>
            <DialogContentText>Bitte Ihre Dateien gezipped hochladen und die URL in der README-Datei angeben!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.hideDialog}>Ok</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  protected showDialog(): void {
    this.setState({showDialog: true});
  }

  protected hideDialog(): void {
    this.setState({showDialog: false});
  }
}

export default EsaBar;

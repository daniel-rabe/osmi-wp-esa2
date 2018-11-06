import * as React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

interface InfoDialogProps {
  show: boolean;
  close: () => void;
}

class InfoDialog extends React.PureComponent<InfoDialogProps> {
  public render() {
    return (
      <Dialog open={this.props.show} onClose={this.props.close}>
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
          <Button onClick={this.props.close}>Ok</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default InfoDialog;

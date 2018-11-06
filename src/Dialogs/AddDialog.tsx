import * as React from 'react';
import { v1 } from 'uuid';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { GuestbookEntry } from 'src/GuestbookManager';

interface AddDialogProps {
  show: boolean;
  close: () => void;
  add: (value: GuestbookEntry) => void;
}

interface AddDialogState {
  name: string;
  validName: boolean;
  email: string;
  validEmail: boolean;
  message: string;
}

class AddDialog extends React.PureComponent<AddDialogProps, AddDialogState> {
  protected initialState: AddDialogState = {
    email: '',
    message: '',
    name: '',
    validEmail: false,
    validName: false,
  };

  public componentWillMount(): void {
    this.setState(this.initialState);
    this.onNameChange = this.onNameChange.bind(this);
    this.onMailChange = this.onMailChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.canBeAdded = this.canBeAdded.bind(this);
    this.submit = this.submit.bind(this);
  }

  public componentWillReceiveProps(nextProps: Partial<AddDialogProps>): void {
    if (!this.props.show && nextProps.show) {
      this.setState(this.initialState);
    }
  }

  public render() {
    return (
      <Dialog open={this.props.show} onClose={this.props.close} PaperProps={{style: {width: 400}}}>
        <DialogTitle>Eintrag hinzufügen</DialogTitle>
        <DialogContent>
          <TextField
            value={this.state.name}
            fullWidth={true}
            label={this.state.validName ? 'Name' : 'Bitte Namen eintragen'}
            placeholder={'Max Mustermann'}
            variant="filled"
            onChange={this.onNameChange}
            error={!this.state.validName}
          />
          <br/>
          <br/>
          <TextField
            value={this.state.email}
            type="mail"
            fullWidth={true}
            label={this.state.validEmail ? 'E-Mail' : 'Bitte gültige E-Mail eintragen'}
            placeholder={'mail@example.com'}
            variant="filled"
            onChange={this.onMailChange}
            error={!this.state.validEmail}
          />
          <br/>
          <br/>
          <TextField value={this.state.message} fullWidth={true} label={'Message'} variant="outlined" multiline={true} onChange={this.onMessageChange}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close}>Abbrechen</Button>
          <Button disabled={!this.canBeAdded()} onClick={this.submit}>Hinzufügen</Button>
        </DialogActions>
      </Dialog>
    );
  }

  protected canBeAdded(): boolean {
    return (
      !this.isEmpty(this.state.message) &&
      this.state.validEmail &&
      this.state.validName
    );
  }

  protected onNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      name: event.currentTarget.value,
      validName: !this.isEmpty(event.currentTarget.value)
    });
  }

  protected onMailChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      email: event.currentTarget.value,
      validEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(event.currentTarget.value)
    });
  }

  protected onMessageChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({message: event.currentTarget.value});
  }

  protected isEmpty(value: string | null): boolean {
    return value == null || value.length === 0;
  }

  protected submit(): void {
    if (!this.isEmpty(this.state.name) && !this.isEmpty(this.state.email)) {
      this.props.add({
        email: this.state.email,
        id: v1(),
        message: this.state.message,
        name: this.state.name,
      })
      this.props.close();
    }
  }
}

export default AddDialog;

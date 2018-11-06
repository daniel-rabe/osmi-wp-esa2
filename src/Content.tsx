import * as React from 'react';
import { observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import { Paper, WithStyles, withStyles, IconButton } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete';
import { GuestbookEntry, GuestbookManager } from './GuestbookManager';

interface ContentProps {
  manager: GuestbookManager;
}

interface ContentState {
  dialog: null | 'info' | 'add';
}

type ContentClasses = 'root' | 'entry';

@observer
class Content extends React.Component<ContentProps & WithStyles<ContentClasses>, ContentState> {
  public componentWillMount(): void {
    this.getEntry = this.getEntry.bind(this);
  }

  public render() {
    return (
      <Paper className={this.props.classes.root} elevation={0}>
        {this.emptyMessage()}
        {this.props.manager.state.map(this.getEntry)}
      </Paper>
    );
  }

  protected emptyMessage(): JSX.Element | null {
    if (this.props.manager.state.length === 0) {
      return (
        <Typography>Leider noch keine Einträge vorhanden</Typography>
      )
    }
    return null;
  }

  protected getEntry(data: GuestbookEntry, key: number): JSX.Element {
    return (
      <Paper elevation={2} className={this.props.classes.entry} key={key}>
        <a href={`mailto:${data.email}`} className={`${this.props.classes.entry}-mail`}>
          <Typography variant="caption">{data.name}</Typography>
        </a>
        <Typography style={{whiteSpace: 'pre'}}>{data.message}</Typography>
        <IconButton className={`${this.props.classes.entry}-icon`} onClick={this.remove(data)}>
          <Delete/>
        </IconButton>
      </Paper>
    )
  }

  protected remove = (data: GuestbookEntry) => () => {
    this.props.manager.remove(data);
  }
}

const styles: StyleRules<ContentClasses> = {
  entry: {
    '&-icon': {
      position: 'absolute',
      right: 30,
      top: '50%',
      transform: 'translate(50%, -50%)'
    },
    '&-mail': {
      '&:active, &:visited': {
        textDecoration: 'none'
      },
      textDecoration: 'none'
    },
    marginBottom: 20,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 60,
    paddingTop: 10,
    position: 'relative',
  },
  root: {
    padding: 20
  },
}

export default withStyles(styles)(Content);

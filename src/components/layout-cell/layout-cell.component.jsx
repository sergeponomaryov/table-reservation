import { Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Table from '../table/table.component'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '95%'
    },
  }));
  
const LayoutCell = (props) => {
    const classes = useStyles();
    const {item} = props;
    return (<Paper className={classes.paper}>
        {item ? <Table table={item}/> : `Empty`}
    </Paper>)
}

export default LayoutCell;
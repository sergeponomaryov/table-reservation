import PersonIcon from '@material-ui/icons/Person';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const Table = ({table}) => {
    return (
        <div>
        <Chip avatar={<Avatar>{table.number}</Avatar>} label="Table" size="small" />
        <Chip avatar={<Avatar>{table.seats}</Avatar>} label="Seats" size="small" />
        </div>);
}

export default Table;
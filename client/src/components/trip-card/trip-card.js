import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
  Button,
  Divider,
  Link
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Edit from '@material-ui/icons/Edit';
import classnames from 'classnames';
import * as tripStatus from '../../constants/trip-status';
import { timestampToDate } from '../../helpers/date-helpers';
import { connect } from 'react-redux';
import { approveTrip } from '../../actions/approve-trip';
import { rejectTrip } from '../../actions/reject-trip';
import { getUserType } from '../../selectors/user-data';
import { ADMIN, ORGANIZER } from '../../constants/user-types';

const styles = theme => ({
  primaryCta: {
    marginRight: theme.spacing.unit
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  justifyRight: {
    justifyContent: 'flex-end'
  },
  rotatedIcon: {
    transform: 'rotate(180deg)'
  },
  iconButton: {
    padding: theme.spacing.unit
  },
  icon: {
    transition: 'transform 200ms'
  },
  divider: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  }
});

const TripCard = ({
  trip,
  classes,
  approveTrip,
  rejectTrip,
  isPrivilegedUser
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded);
  const getHeaderColor = () => {
    switch (trip.details.status) {
      case tripStatus.APPROVED:
        return 'lightskyblue';
      case tripStatus.COMPLETED:
        return 'seagreen';
      case tripStatus.REJECTED:
        return 'tomato';
      case tripStatus.PENDING:
        return 'gold';
      default:
        return 'silver';
    }
  };

  const handleApproveClick = () => approveTrip(trip.id);
  const handleDeclineClick = () => rejectTrip(trip.id);
  const handleEdit = () => alert('edit');

  const getCardTitle = () => {
    switch (trip.details.status) {
      case tripStatus.APPROVED:
        return 'Approved';
      case tripStatus.COMPLETED:
        return 'Trip completed';
      case tripStatus.REJECTED:
        return 'Trip rejected';
      case tripStatus.PENDING:
        return 'Pending approval';
      default:
        return 'Status unknown';
    }
  };

  const isPending = trip.details.status === tripStatus.PENDING;
  const renderLinks = arr =>
    arr.map((ticket, index) => (
      <Fragment key={index}>
        <a href={ticket.url} download>
          <Link component="p">{ticket.title}</Link>
        </a>
        <br />
      </Fragment>
    ));

  const acc = trip.details.accommodation;
  return (
    <Card>
      <CardHeader
        title={getCardTitle()}
        style={{ backgroundColor: getHeaderColor() }}
      />
      <CardContent>
        <Typography component="p">Time</Typography>
        <Typography component="p">{`${timestampToDate(
          trip.from
        )} - ${timestampToDate(trip.to)}`}</Typography>
        <Divider className={classes.divider} />
        <Typography component="p">Location</Typography>
        <Typography component="p">{`${trip.origin} - ${
          trip.destination
        }`}</Typography>
      </CardContent>
      <CardActions
        className={classnames(classes.flex, !isPending && classes.justifyRight)}
        disableActionSpacing
      >
        {isPending && (
          <div className={classes.flex}>
            <div className={classes.primaryCta}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleApproveClick}
                aria-label="Approve"
              >
                Approve
              </Button>
            </div>
            <div>
              <Button onClick={handleDeclineClick} aria-label="Decline">
                Decline
              </Button>
            </div>
          </div>
        )}
        <div>
          {isPrivilegedUser && (
            <IconButton
              classes={{ root: classes.iconButton }}
              onClick={handleEdit}
              aria-label="Edit"
            >
              <Edit />
            </IconButton>
          )}
          <IconButton
            classes={{ root: classes.iconButton }}
            className={classnames(
              classes.icon,
              expanded ? classes.rotatedIcon : ''
            )}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography component="p">Department</Typography>
          <Typography component="p">{trip.department}</Typography>
          <Divider className={classes.divider} />
          <Typography component="p">Tickets:</Typography>
          {renderLinks(trip.details.tickets)}
          <Divider className={classes.divider} />
          <Typography component="p">Accommodation</Typography>
          <Typography component="p">{acc.location}</Typography>
          {acc.files && (
            <Fragment>
              <Divider className={classes.divider} />
              <Typography component="p">Reservation</Typography>
              {renderLinks(acc.files)}
            </Fragment>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

TripCard.propTypes = {
  trip: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  approveTrip: PropTypes.func.isRequired,
  rejectTrip: PropTypes.func.isRequired,
  isPrivilegedUser: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const userType = getUserType(state);
  return {
    isPrivilegedUser: userType === ORGANIZER || userType === ADMIN
  };
};

const mapDispatchToProps = {
  approveTrip,
  rejectTrip
};

//TODO: maybe use _.flow for better readability
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TripCard));

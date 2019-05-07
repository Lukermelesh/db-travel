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

const styles = theme => ({
  header: {
    backgroundColor: 'lightskyblue'
  },
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

const TripCard = ({ trip, classes }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

  //TODO: maybe think about using redux?
  //TODO: finish wiring
  const handleApproveClick = () => alert('approved');
  const handleDeclineClick = () => alert('declined');
  const handleEdit = () => alert('edit');

  const getCardTitle = () => {
    const status = trip.details.status;
    switch (status) {
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
  const renderTicketLinks = () =>
    trip.details.tickets.map((ticket, index) => (
      <Fragment key={index}>
        <a href={ticket.url} download>
          <Link component="p">{ticket.title}</Link>
        </a>
        <br />
      </Fragment>
    ));

  /*TODO: change header color depending on trip status*/
  return (
    <Card>
      <CardHeader title={getCardTitle()} className={classes.header} />
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
        <Divider className={classes.divider} />
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
          <IconButton
            classes={{ root: classes.iconButton }}
            onClick={handleEdit}
            aria-label="Edit"
          >
            <Edit />
          </IconButton>
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
          {renderTicketLinks()}
          <Divider className={classes.divider} />
          {/*TODO: decide how to display apartments*/}
          <Typography component="p">Accommodation</Typography>
          <Typography component="p">{trip.details.apartments}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

TripCard.propTypes = {
  trip: PropTypes.object.isRequired
};

export default withStyles(styles)(TripCard);

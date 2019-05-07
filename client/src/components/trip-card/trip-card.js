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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Edit from '@material-ui/icons/Edit';
import styles from './trip-card.module.css';
import classnames from 'classnames';
import * as tripStatus from '../../constants/trip-status';
import { timestampToDate } from '../../helpers/date-helpers';

const TripCard = ({ trip }) => {
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
      <Fragment>
        <a key={index} href={ticket.url} download>
          <Link component="p">{ticket.title}</Link>
        </a>
        <br />
      </Fragment>
    ));

  /*TODO: change color depending on trip status*/
  return (
    <Card className={styles.root}>
      <CardHeader title={getCardTitle()} className={styles.header} />
      <CardContent>
        <Typography component="p">Time</Typography>
        <Typography component="p">{`${timestampToDate(
          trip.from
        )} - ${timestampToDate(trip.to)}`}</Typography>
        <Divider className={styles.divider} />
        <Typography component="p">Location</Typography>
        <Typography component="p">{`${trip.origin} - ${
          trip.destination
        }`}</Typography>
        <Divider className={styles.divider} />
      </CardContent>
      <CardActions
        className={classnames(styles.flex, !isPending && styles.justifyRight)}
        disableActionSpacing
      >
        {isPending && (
          <div className={styles.flex}>
            <div className={styles.button}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleApproveClick}
                aria-label="Approve"
              >
                Approve
              </Button>
            </div>
            <div className={styles.button}>
              <Button
                className={styles.button}
                onClick={handleDeclineClick}
                aria-label="Decline"
              >
                Decline
              </Button>
            </div>
          </div>
        )}
        <div>
          <IconButton onClick={handleEdit} aria-label="Edit">
            <Edit />
          </IconButton>
          <IconButton
            className={expanded ? styles.rotatedIcon : ''}
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
          <Divider className={styles.divider} />
          <Typography component="p">Tickets:</Typography>
          {renderTicketLinks()}
          <Divider className={styles.divider} />
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

export default TripCard;

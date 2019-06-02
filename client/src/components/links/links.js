import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

const Links = ({ links, allowDelete, onDeleteClick, classes }) => {
  const handleDeleteClick = link => () => onDeleteClick(link);

  return links.map((link, index) => (
    <Fragment key={index}>
      <div className={classes.container}>
        <a href={link.url} target="_blank" rel="noopener noreferrer" download>
          <Link component="p">{link.title}</Link>
        </a>
        {allowDelete && (
          <IconButton onClick={handleDeleteClick(link)}>
            <DeleteForever />
          </IconButton>
        )}
      </div>
      <br />
    </Fragment>
  ));
};

Links.propTypes = {
  links: PropTypes.array.isRequired,
  allowDelete: PropTypes.bool,
  onDeleteClick: PropTypes.func
};

export default withStyles(styles)(Links);

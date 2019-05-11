import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  root: {
    display: 'none'
  }
});

const UploadButton = ({ classes, id, onFileUpload }) => {
  return (
    <Fragment>
      <input
        accept="image/*"
        className={classes.root}
        id={id}
        multiple
        type="file"
        onChange={onFileUpload}
      />
      <label htmlFor={id}>
        <IconButton component="span">
          <AddCircle />
        </IconButton>
      </label>
    </Fragment>
  );
};

UploadButton.propTypes = {
  id: PropTypes.string.isRequired,
  onFileUpload: PropTypes.func.isRequired
};

export default withStyles(styles)(UploadButton);

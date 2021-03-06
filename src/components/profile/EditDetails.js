import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import {editUserDetails} from '../../redux/actions/userActions';
import themeObject from '../../util/theme';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = (themeObject) ;

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    componentDidMount(){
        const {credentials} = this.props;
        this.setState({
            bio : credentials.bio ? credentials.bio : '',
            website : credentials.website ? credentials.website : '',
            location : credentials.location ? credentials.location : ''
        });
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
        const {credentials} = this.props;
        this.setState({
            bio : credentials.bio ? credentials.bio : '',
            website : credentials.website ? credentials.website : '',
            location : credentials.location ? credentials.location : ''
        });
    }

    handleClose = () => {
        this.setState({open:false});
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit =() => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit Details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.editButton}>
                        <EditIcon color="primary"/>
                    </IconButton>
                </Tooltip>

                <Dialog open={this.state.open} onClose={this.handleClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Edit Details</DialogTitle>  
                    <DialogContent>
                        <form>
                            <TextField 
                            name="bio" 
                            type="text" 
                            label="Bio" 
                            multiline 
                            rows="3" 
                            placeholder="So... What's Your Story" 
                            className={classes.textField} 
                            value={this.state.bio}  
                            onChange={this.handleChange}
                            fullWidth
                            />
                            <br/>
                            <TextField 
                            name="website" 
                            type="text" 
                            label="Website" 
                            placeholder="Have any personal/professional website ?" 
                            className={classes.textField} 
                            value={this.state.website}  
                            onChange={this.handleChange}
                            fullWidth
                            />
                            <br/>
                            <TextField 
                            name="location" 
                            type="text" 
                            label="Location" 
                            placeholder="Where's home these days?" 
                            className={classes.textField} 
                            value={this.state.location}  
                            onChange={this.handleChange}
                            fullWidth
                            />
                        </form>
                    </DialogContent>   

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));

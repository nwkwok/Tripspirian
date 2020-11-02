import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function CreateEvent(props) {
  const event_id = useParams()
  const location = useLocation();
  const history = useHistory();
  const [eventName, setEventName] = useState("")
  const [eventStartDate, setEventStartDate] = useState("")
  const [eventEndDate, setEventEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [coverPhoto, setCoverPhoto] = useState("")
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post('http://localhost:3000/events/', {
        // user_id,
        event_name: eventName,
        start_date: eventStartDate,
        end_date: eventEndDate,
        description,
        is_public: isPublic,
        cover_photo: coverPhoto
      });

      history.push('/');
      history.push(location.pathname);
      
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleChange = () => {
    setIsPublic(!isPublic);
  }

  return (
    <form autoComplete="off" className={classes.container} noValidate onSubmit={handleSubmit}>
        <TextField
        id="eventName"
        name="event_name"
        label="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        />
      
      <TextField
        id="eventStartDate"
        name="start_date"
        label="Start Date"
        type="text"
        value={eventStartDate}
        placeholder="2020-01-01"
        onChange={(e) => setEventStartDate(e.target.value)}
      />
         <TextField
        id="eventEndDate"
        name="end_date"
        label="End Date"
        type="text"
        value={eventEndDate}
        placeholder="2020-01-02"
        onChange={(e) => setEventEndDate(e.target.value)}
        />

        <TextField
        id="description"
        name="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        />

        <Button 
          variant="contained"
          component="label"
          >
            Upload Cover Photo
              <input 
                type="file" 
                style={{display:'none'}}
                onChange={(e) => setCoverPhoto(e.target.value)}
                value={coverPhoto}/>
          </Button>

          <Button 
            variant="contained"
            type="submit"
            color="secondary">
            Create Event Entry
          </Button>

    </form>
  );
}
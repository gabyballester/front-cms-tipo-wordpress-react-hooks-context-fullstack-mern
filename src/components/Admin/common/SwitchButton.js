import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels(props) {
  const { viewUsersActives, setViewUsersActives } = props;

  const handleChange = () => {
    setViewUsersActives(!viewUsersActives);
  };

  return (
    <FormGroup row>

      <FormControlLabel
        control={
          <Switch
            checked={viewUsersActives}
            onChange={handleChange}
            name="switchUsers"
            color="primary"
          />
        }
      />
    </FormGroup>
  );
}


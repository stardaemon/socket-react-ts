import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Slider as MuSlider } from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

interface SliderProps {
  limits: number;
  changeLimits: (num: number) => void;
}

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 20,
    label: '20',
  },
];

const valuetext = (value: number) => {
  return `${value}`;
}

const Slider:React.FC<SliderProps> = ({limits, changeLimits}) => {
  const [value, setValue] = useState(limits)
  
  const handleChange = (e: any, num:any) => {
    setValue(num);
    changeLimits(num);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h6'>Limit</Typography>
      <MuSlider
        aria-label='limits'
        max={20}
        min={1}
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay='on'
        marks={marks}
      />
    </Box>
  );
}

Slider.propTypes = {
  limits: PropTypes.number.isRequired,
  changeLimits: PropTypes.func.isRequired,
};

export default  Slider;
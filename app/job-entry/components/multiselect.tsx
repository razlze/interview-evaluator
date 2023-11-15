'use client'

import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const jobTypes = ["Internship", "Part-time", "Full-time"];

function getStyles(job: string, jobType: readonly string[], theme: Theme) {
  return {
    fontWeight:
      jobType.indexOf(job) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip() {
  const theme = useTheme();
  const [jobType, setJobType] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof jobType>) => {
    const {
      target: { value },
    } = event;
    setJobType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl margin="normal" sx={{ width: "45%" }}>
        <InputLabel id="demo-multiple-chip-label">Required *</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={jobType}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Required *" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          margin="dense"
          required
        >
          {jobTypes.map((job) => (
            <MenuItem
              key={job}
              value={job}
              style={getStyles(job, jobType, theme)}
            >
              {job}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
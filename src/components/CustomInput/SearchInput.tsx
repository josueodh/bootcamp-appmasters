import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


export default function SearchInput({...props}) {
  return (
    <form className={props.className} noValidate autoComplete="off">
        <Grid container alignItems="flex-end">
          <Grid item>
            {props.icon}
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label={props.label} />
          </Grid>
        </Grid>
    </form>
  );
}
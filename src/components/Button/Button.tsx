import React from 'react';
// nodejs library that concatenates classes

import Button from '@material-ui/core/Button';


function ButtonLoad({ ...props }: any) {
    return (
        <Button className={props.className} variant="outlined" color="default">{props.name}</Button>
    )
}
  
  export default ButtonLoad;
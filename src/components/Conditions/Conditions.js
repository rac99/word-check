import React from 'react';
import classes from './Conditions.module.css'

const conditions = (props) => {
   return (
       <div className={classes.Wrapper}>

            {props.error && <div className={classes.Error}>This is not a word.</div>}
           
            {props.loading && <div className={classes.Loader}>Loading...</div>}

            {props.responseObj.status === 200 ?
               <div>
                   <p><strong>{props.responseObj.data[0].word}</strong></p>
                   <p>This is a word.</p>
               </div>
            : null
            }
       </div>
   )
}
export default conditions;
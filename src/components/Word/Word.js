import React, { useState } from 'react';
import axios from 'axios';
import Conditions from '../Conditions/Conditions';
import classes from './Word.module.css';

const Word = () => {

    let [word, setWord] = useState('');
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [responseObj, setResponseObj] = useState({});

    function getWord(e) {
        e.preventDefault();
        //const word = 'hello';

        if (word.length === 0) {
            return setError(true);
        }

        setError(false);
        setResponseObj({});
  
        setLoading(true);

        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
        })
        .then((res) => {
            //const new_word = res.data.word;
            if (res.status !== 200) {
                //throw new Error()
                if (res.status === 404) {
                    setResponseObj("This is not a word")
                }
            } else {
                if (word !== res.word){
                    setResponseObj("This is a misspelled word")
                } 
              setResponseObj(res)
                
                setLoading(false)
                //console.log(res.data) 
            }
            
        })
        .catch((error) => {
            setError(true);
            setLoading(false);
            console.log(error.message);
            console.error(error)
        })
   }

    return (
    <div>
        <h2>Find Word</h2>
     {/* <div>
        {JSON.stringify(responseObj)}
        </div>  */}
     <form onSubmit={getWord}>
        <input
            type="text"
            placeholder="Enter Word"
            maxLength="50"
            className={classes.textInput}
            value={word}
            onChange={(e) => setWord(e.target.value)}
        />
        <button className={classes.Button} type="submit">Check Word</button>
    </form>
        {/* <button onClick={getWord}>Get Word</button> */}
        <Conditions 
            responseObj={responseObj} 
            error={error} 
            loading={loading} 
        />
    </div>
   )
}
export default Word;
import React, { useEffect } from 'react';
import QuoteForm from '../quotes/QuoteForm';
import { useHistory, useLocation } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { addQuote } from '../../lib/api';

const NewQuote = ()=> {
  const history = useHistory();
  const location = useLocation();
  const {sendRequest,status} = useHttp(addQuote);
  const addQuoteHandler=(quoteData)=>{
    sendRequest(quoteData);
};
  useEffect(()=>{
    if(status === 'completed'){
      history.push('/quotes');
    }
  },[status,history]);
  
  
  return (
  <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}></QuoteForm>
  )
}

export default NewQuote;
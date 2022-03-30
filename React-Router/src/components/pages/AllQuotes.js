import React, { useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import { getAllQuotes } from '../../lib/api';
import NoQuotesFound from '../quotes/NoQuotesFound';
import Quotelist from '../quotes/QuoteList';
import LoadingSpinner from '../UI/LoadingSpinner';


function AllQuotes() {
  const {sendRequest,status,data:loadedQuotes,error} = useHttp(getAllQuotes,true);
  useEffect(()=>{
    sendRequest();
  },[sendRequest]);
  //Error
  if(error){
    return <p className='centered focused'>{error}</p>
  }

  if(status === 'pending'){
    return <div className='centered'>
      <LoadingSpinner/>
    </div>
  }
  //No records
  if(status==='completed' && (!loadedQuotes || loadedQuotes.length===0)){
    return <NoQuotesFound/>
  }
  return (
    <div><Quotelist quotes={loadedQuotes}/></div>
  )
}

export default AllQuotes
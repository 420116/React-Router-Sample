import React, { Fragment, useEffect } from 'react'
import {useParams,Route, Link, useHistory} from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getSingleQuote } from '../../lib/api';
import Comments from '../comments/Comments';
import HighlightedQuote from '../quotes/HighlightedQuote';
import NoQuotesFound from '../quotes/NoQuotesFound';
import LoadingSpinner from '../UI/LoadingSpinner';

const DUMMY_DATA=[{
  id:'q1',
  author:'Max',
  text:'Learning is fun'
},
{
  id:'q2',
  author:'Ashish',
  text:'Learning is Great'
},
{
  id:'q3',
  author:'Baghel',
  text:'Learning is not good'
}];
function QuoteDetails() {
  const params = useParams();
  const {quoteId} = params;
  const history = useHistory();
  const {sendRequest,status,data:loadedQuote,error} = useHttp(getSingleQuote,true);
  useEffect(()=>{
    sendRequest(quoteId);
  },[quoteId]);
  
  const onShowCommentsHandler=()=>{
    history.push('/quotes/'+params.quoteId+'/comments');
  }
  if(status === 'pending'){
    return <div className='centered'>
      <LoadingSpinner/>
    </div>
  }
  //No records
  if(status==='completed' && (!loadedQuote || loadedQuote.length===0)){
    return <NoQuotesFound/>
  }

  return (
      <Fragment>
        <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
        <div className='centered'>
         <button  className='btn' onClick={onShowCommentsHandler}>Show Comments</button>
         </div>
         <Route path={`/quotes/${params.quoteId}/comments`}>
           <Comments/>
         </Route>
      </Fragment>
  )
}

export default QuoteDetails
import { useState, useEffect } from 'react'
import { FaXTwitter, FaQuoteLeft } from 'react-icons/fa6'
import './App.css'

export default function App() {
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    fetchQuote()
  }, [])

  const fetchQuote = () => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        setQuote(data.content)
        setAuthor(data.author)
      })
  }

  return (
    <div className='wrapper'>
      <div id='quote-box'>
        <h1 id='text'>
          <FaQuoteLeft style={{ marginRight: 10 }}/>
          {quote}
        </h1>
        <p id='author'>- {author}</p>
        <div className='button-container'>
          <a 
            id='tweet-quote' 
            href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`} 
            target='_blank' 
            rel='noopener noreferrer'
          >
            <FaXTwitter size={20}/>
          </a>
          <button id='new-quote' onClick={fetchQuote}>New quote</button>
        </div>
      </div>
    </div>
  )
}
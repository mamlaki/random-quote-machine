import { useState, useEffect } from 'react'
import { FaXTwitter, FaQuoteLeft } from 'react-icons/fa6'
import './App.css'

export default function App() {
  const [quote, setQuote] = useState('')
  const [isQuoteVisible, setIsQuoteVisible] = useState(true)
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
        setTimeout(() => {
          setIsQuoteVisible(true)
        }, 200)
      })
  }

  const handleNewQuote = () => {
    setIsQuoteVisible(false)
    setTimeout(() => {
      fetchQuote()
    }, 300)
  }

  return (
    <div className='wrapper'>
      <div id='quote-box'>
        <h1 id='text' className={!isQuoteVisible ? 'invisible' : ''}>
          <FaQuoteLeft style={{ marginRight: 10 }}/>
          {quote}
        </h1>
        <p id='author' className={!isQuoteVisible ? 'invisible' : ''}>- {author}</p>
        <div className='button-container'>
          <a 
            id='tweet-quote' 
            href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`} 
            target='_blank' 
            rel='noopener noreferrer'
          >
            <FaXTwitter size={20}/>
          </a>
          <button id='new-quote' onClick={handleNewQuote}>New quote</button>
        </div>
      </div>
    </div>
  )
}
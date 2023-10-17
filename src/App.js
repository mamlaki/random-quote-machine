import { useState, useEffect } from 'react'

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
        <h1 id='text'>{ quote }</h1>
        <p id='author'>- { author }</p>
        <button id='new-quote'>New quote</button>
        <a id='tweet-quote' href='/' target='_blank'>Twitter/X Logo Placeholder</a>
      </div>
    </div>
  )
}
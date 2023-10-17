import { useState, useEffect } from 'react'
import { FaXTwitter, FaQuoteLeft } from 'react-icons/fa6'
import './App.css'

export default function App() {
  const [quote, setQuote] = useState('')
  const [isQuoteVisible, setIsQuoteVisible] = useState(true)
  const [author, setAuthor] = useState('')

  const [color, setColor] = useState('#2E2E2E')

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
    setColor(generateRandomColor())
    setTimeout(() => {
      fetchQuote()
    }, 300)
  }

  const generateRandomColor = () => {
    let hue = Math.floor(Math.random() * 361)
    let saturation = Math.floor(Math.random() * 16) + 15
    let lightness = Math.floor(Math.random() * 16) + 60
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  return (
    <div className='wrapper' style={{backgroundColor: color}}>
      <div id='quote-box'>
        <h1 id='text' className={!isQuoteVisible ? 'invisible' : ''} style={{color: color}}>
          <FaQuoteLeft style={{ marginRight: 10 }}/>
          {quote}
        </h1>
        <p id='author' className={!isQuoteVisible ? 'invisible' : ''} style={{color: color}}>- {author}</p>
        <div className='button-container'>
          <a 
            id='tweet-quote' 
            href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`} 
            target='_blank' 
            rel='noopener noreferrer'
            style={{backgroundColor: color}}
          >
            <FaXTwitter size={20}/>
          </a>
          <button id='new-quote' onClick={handleNewQuote} style={{backgroundColor: color}}>New quote</button>
        </div>
      </div>
    </div>
  )
}
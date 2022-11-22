const { Router } = require('express')
const router = Router()
const axios = require('axios')
const bookApiKey = process.env.REACT_APP_GOOGLE_BOOK_API_KEY;

//     /api/booksearch
router.post('/searchbook', async (req, res) => {

  try {
    const { searchName, maxResults, sortParam, startIndex } = req.body
    const booksData = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchName}+inauthor:${searchName}&key=${bookApiKey}&maxResults=${maxResults}${sortParam}&startIndex=${startIndex}`)
    res.status(booksData.status).json(booksData.data);

  }
  catch (error) {
    res.status(error.status).json({ error: error.message })
  }

})
router.post('/currentbook', async (req, res) => {

  try {
    const { id } = req.body
    const currentBook = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${bookApiKey}`)
    res.status(currentBook.status).json(currentBook.data);

  }
  catch (error) {
    res.status(error.status).json({ error: error.message })
  }

})

router.post('/searchgenre', async (req, res) => {
  try {
    const { searchName, maxResults, sortParam, startIndex } = req.body
    const booksData = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${searchName}&key=${bookApiKey}&maxResults=${maxResults}${sortParam}&startIndex=${startIndex}`)
    res.status(booksData.status).json(booksData.data);
  }
  catch (error) {
    res.status(error.status).json({ error: error.message })
  }

})

router.post('/sortbook', async (req, res) => {

  try {
    const { searchName, maxResults, sortParam, startIndex } = req.body
    const booksData = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${searchName}&key=${bookApiKey}&maxResults=${maxResults}${sortParam}&startIndex=${startIndex}`)
    res.status(booksData.status).json(booksData.data);
  }
  catch (error) {
    res.status(error.status).json({ error: error.message })
  }

})

module.exports = router
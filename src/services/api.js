const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'

export const getBooks = async (query = 'subject:fiction', page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit
  const safeQuery = encodeURIComponent(query)
  
  try {
    const response = await fetch(`${BASE_URL}?q=${safeQuery}&maxResults=${limit}&startIndex=${startIndex}`)
    
    if (!response.ok) {
      if (response.status === 429) throw new Error('Too many requests. Please try again later.')
      throw new Error('Failed to fetch data from Google Books.')
    }
    
    const data = await response.json()
    
    return {
      items: data.items || [],
      totalItems: data.totalItems || 0,
      error: null
    }

  } catch (error) {
    console.error("API Error:", error)
    return {
      items: [],
      totalItems: 0,
      error: error.message
    }
  }
}
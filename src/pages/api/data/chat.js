// pages/api/chat.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer sk-None-w1VmZpKYfDZFm7WkcDLET3BlbkFJ0FAiOzgXLuRylKzyXzGl`, // Replace with your actual API key
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message },
        ],
      }),
    })
    const data = await response.json()
    console.log(response)

    if (response.ok) {
      res.status(200).json(data)
    } else {
      res.status(response.status).json(data)
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}

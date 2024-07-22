import { useState } from 'react'

const data = [
  {
    title: 'Jumpsuit Women Summer Plunge',
    src: 'https://ae01.alicdn.com/kf/S56dad3e493834920ba13fe8092f6145bY.jpg',
    price: 11.99,
    categories: 'Clothes',
    link: 'https://s.click.aliexpress.com/e/_oCpSvLq',
    keywords: ['women clothes'],
  },
]

const UploadImages = () => {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)

  const uploadImage = async (item:any, index:number) => {
    try {
      const response = await fetch(item.src)
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`)
      }

      const imageBuffer = await response.arrayBuffer()

      await fetch('/api/addGridFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              title: item.title,
              src: `data:image/jpeg;base64,${Buffer.from(imageBuffer).toString(
                'base64'
              )}`,
              price: item.price,
              categories: item.categories,
              link: item.link,
              keywords: item.keywords,
            },
          ],
        }),
      })

      setProgress(((index + 1) / data.length) * 100)
    } catch (error) {
      console.error(`Failed to upload image ${item.title}: ${error}`)
    }
  }

  const handleUpload = async () => {
    setLoading(true)
    for (let i = 0; i < data.length; i++) {
      await uploadImage(data[i], i)
    }
    setLoading(false)
  }

  return (
    <div>
      {loading ? (
        <div>
          <p>Uploading... {progress}%</p>
          <progress value={progress} max='100' />
        </div>
      ) : (
        <button onClick={handleUpload}>Start Upload</button>
      )}
    </div>
  )
}

export default UploadImages

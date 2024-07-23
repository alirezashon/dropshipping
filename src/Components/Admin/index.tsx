import { ChangeEvent, useRef, useState, useEffect } from 'react'
import ExcelJS from 'exceljs'
import { ProductInterface } from '@/Interfaces'

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

const Addit = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<ProductInterface[]>([])

  const uploadImage = async (item: any, index: number) => {
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

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const buffer = await file.arrayBuffer()
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(buffer)
    const worksheet = workbook.getWorksheet(1)
    if (!worksheet) return

    // Initialize an array to hold the product objects
    const products: ProductInterface[] = []

    // Iterate over worksheet rows, starting from the second row (skip header)
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1) {
        const product: ProductInterface = {
          _id: '',  // You can generate an ID or leave it empty
          title: (row.getCell(4).value as string) || '', // Product Desc
          src: (row.getCell(2).value as string) || '',   // Image Url
          firstPrice: (row.getCell(5).value as string) || '', // Origin Price
          price: (row.getCell(6).value as string) || '',      // Discount Price
          discount: (row.getCell(7).value as string) || '',   // Discount
          categories: '',                            // Set empty string
          link: (row.getCell(14).value as string) || '',        // Promotion Url
          keywords: []                               // Set empty array
        }
        products.push(product)
      }
    })

    // Set products state
    setProducts(products)
  }

  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <div>
      <input
        type='file'
        accept='.xlsx, .xls'
        ref={fileInputRef}
        onChange={handleFileChange}
      />
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

export default Addit

import { categories } from '@/lib/cateegories'
import CircularLinks from '../Components/CircularLinks'
import { ProductInterface } from '@/Interfaces'
import Product from '@/Components/Products'
import styles from './index.module.css'
const products: ProductInterface[] = [
  // {
  //   _id: '1',
  //   title: 'Product 1',
  //   description: 'This is a description for product 1.',
  //   price: 9.99,
  //   src: 'https://picsum.photos/200/300?random=1',
  // },
  // {
  //   _id: '2',
  //   title: 'Product 2',
  //   description: 'This is a description for product 2.',
  //   price: 19.99,
  //   src: 'https://picsum.photos/200/300?random=2',
  // },
  // {
  //   _id: '3',
  //   title: 'Product 3',
  //   description: 'This is a description for product 3.',
  //   price: 29.99,
  //   src: 'https://picsum.photos/200/300?random=3',
  // },
  // {
  //   _id: '4',
  //   title: 'Product 4',
  //   description: 'This is a description for product 4.',
  //   price: 39.99,
  //   src: 'https://picsum.photos/200/300?random=4',
  // },
  // {
  //   _id: '5',
  //   title: 'Product 5',
  //   description: 'This is a description for product 4.',
  //   price: 39.99,
  //   src: 'https://picsum.photos/200/300?random=5',
  // },
  {
    _id: '6',
    title: 'Product 6',
    firstPrice: 'USD 29.60',
    price: 'USD 14.80',
    discount: '50%',
    link: 'https://s.click.aliexpress.com/e/_onMiDJO',
    categories: '',
    keywords: [''],
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/%C3%9Altima_Cena_-_Juan_de_Juanes.jpg',
  },
  {
    _id: '7',
    title: 'Product 7',
    firstPrice: 'USD 29.60',
    price: 'USD 14.80',
    discount: '50%',
    link: 'https://s.click.aliexpress.com/e/_onMiDJO',
    categories: '',
    keywords: [''],
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/%C3%9Altima_Cena_-_Juan_de_Juanes.jpg',
  },
]

const Main: React.FC = () => {
  return (
    <>
      <CircularLinks data={categories} />
      <div className={styles.container}>
        <h1 className={styles.title}>Products</h1>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Main

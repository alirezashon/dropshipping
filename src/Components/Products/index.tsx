// src/components/Product.tsx
import React from 'react'
import Image from 'next/image'
import styles from './index.module.css'
import { ProductInterface } from '@/Interfaces'

interface Props {
  product: ProductInterface
}

const Product: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.product}>
      {/* <Image
        src={`${product.src}`}
        alt={product.title}
        width={1200}
        height={1300}
        className={styles.image}
      /> */}
     {/* <img
        src={`${product.src}`}
        alt={product.title}
        className={styles.image}
      /> */}
        <Image
        src="https://ae01.alicdn.com/kf/S816f55308e774fc2a44e7f6ef586e4d2S.jpg"
        alt="Test Image"
        width={500}
        height={500}
      />
          
      <h2 className={styles.name}>{product.title}</h2>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
    </div>
  )
}

export default Product

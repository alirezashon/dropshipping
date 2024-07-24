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
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={product.src.toString()}
          alt="Test Image"
          width={500}
          height={500}
        />
        <div className={styles.banner}>{product.discount}</div>
      </div>
      <h2 className={styles.name}>{product.title}</h2>
      <p className={styles.firstPrice}>${product.firstPrice}</p>
      <p className={styles.price}>${product.price}</p>
      <p className={styles.discount}></p>
    </div>
  )
}

export default Product

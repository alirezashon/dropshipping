/** @format */

import Product from '@/Components/Products'
import { ProductInterface } from '@/Interfaces'
import { GetServerSideProps, NextPage } from 'next'
import styles from './index.module.css'

interface PostProps {
  posts: ProductInterface[]
}

const Post: NextPage<PostProps> = ({ posts }) => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Products</h1>
        <div className={styles.productGrid}>
          {posts.map((post) => (
            <Product key={post._id} product={post} />
          ))}
        </div>
      </div>
    </>
  )
}
export const getServerSideProps: GetServerSideProps<PostProps> = async ({
  params,
}) => {
  const category = params?.id as string
  const res = await fetch(
    `http://localhost:${process.env.PRODUCTION_PORT}/api/data/Post/Client`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: `@L$L%O%F#D%M^rAz${category}`,
        authType: 'G&E!T*P^R$O#D$U^C@T*S',
      }),
    }
  )
  const postData = await res.json()
  return {
    props: {
      posts: postData.products,
    },
  }
}
export default Post

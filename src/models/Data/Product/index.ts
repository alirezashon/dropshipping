/** @format */

import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  src: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Image' },
  price: { type: Number, required: true },
  categories: String,
  link: { type: String, required: true },
  keywords: [{ type: String }],
})

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product

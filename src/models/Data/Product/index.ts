import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  src: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Image' },
  firstPrice: { type: String, required: true },
  price: { type: String, required: true },
  discount: { type: String, required: true },
  categories: String,
  link: { type: String, required: true },
  keywords: [{ type: String }],
})

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product

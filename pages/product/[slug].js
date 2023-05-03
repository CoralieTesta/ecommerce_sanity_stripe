//slug is the unique identifier
//inside of [] => dynamic
//page url .../product/[slug]

import { urlFor, client } from '@/lib/client'
import React, { useState } from 'react'
import { Product } from '../../components';
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '@/context/StateContext';

const ProductDetails = ({ product, products}) => {
    const { image, name, details, price } = product
    const [index, setIndex] = useState(0)
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext()

    const handleBuyNow = () => {
        onAdd(product, qty)

        setShowCart(true)
    }
  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img 
                        src={urlFor(image && image[index])}
                        className='product-detail-image'
                    />
                </div>
                <div className='small-images-container'>
                    {image?.map((item, i) => (
                        <img
                            key={i}
                            src={urlFor(item)}
                            className={i === index ?
                                'small-image selected-image':
                                'small-image'
                            }
                            onMouseEnter={() => setIndex(i)}
                        />
                    ))}
                </div>
            </div>
            <div className='product-detail-desc'>
                <h1>
                    {name}
                </h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p>
                        (20)
                    </p>
                </div>
                <h4>
                    Details: 
                </h4>
                <p>
                    {details}
                </p>
                <p className='price'>
                    ${price}
                </p>
                <div className='quantity'>
                    <h3>
                        Quantity:
                    </h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decQty}>
                            <AiOutlineMinus />
                        </span>
                        <span className='num'>
                            {qty}
                        </span>
                        <span className='plus' onClick={incQty}>
                            <AiOutlinePlus />
                        </span>
                    </p>
                </div>
                <div className='buttons'>
                    <button 
                        type='button' 
                        className='add-to-cart' 
                        onClick={() => onAdd(product, qty)}
                    >
                        Add to cart
                    </button>
                    <button 
                        type='button' 
                        className='buy-now' 
                        onClick={handleBuyNow}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>

        <div className='maylike-products-wrapper'>
            <h2>
                You may also like
            </h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {products.map((item) => (
                        <Product key={item._id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

//If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated. -> getStaticpaths
export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;
  
    const products = await client.fetch(query);//list of the current slug property of each product
    //ex : products [{ slug: { current: 'speaker' } },{ slug: { current: 'headphones' } },{ slug: { current: 'cool-in-ear-headphones' } },{ slug: { current: 'headphones_new' } }]
  
    const paths = products.map((product) => ({
      params: { 
        slug: product.slug.current
      }
    }));
    //paths [{ params: { slug: 'speaker' } },{ params: { slug: 'headphones' } },{ params: { slug: 'cool-in-ear-headphones' } },{ params: { slug: 'headphones_new' } }]
  
    return {
      paths,
      fallback: 'blocking'
    }
  }
  
  export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    //ex: {slug } -> { slug: 'cool-in-ear-headphones' } 
    const productsQuery = '*[_type == "product"]'
    
    const product = await client.fetch(query);//the product we click on
    const products = await client.fetch(productsQuery);//all the products
  
    /*product: {name: 'Cool In-ear headphones',
        details: 'Use these while working out',
        slug: { current: 'cool-in-ear-headphones', _type: 'slug' },
        price: 40,
        _createdAt: '2023-05-02T09:04:22Z',
        _rev: '1uxTs0GuqyZiNKlonPDVPe',
        _updatedAt: '2023-05-02T09:04:22Z',
        image: [
        { _type: 'image', _key: '6a6fe65e6d56', asset: [Object] },
        { _key: '8f99a548722c', asset: [Object], _type: 'image' },
        { _type: 'image', _key: 'b334a7dd2748', asset: [Object] },
        { _type: 'image', _key: 'd2dc8cfde4d4', asset: [Object] }
        ],
        _type: 'product',
        _id: 'f2ac3b7a-3789-4312-8536-86a61db5d58f'
    }*/
  
    return {
      props: { products, product }
    }
  }

export default ProductDetails
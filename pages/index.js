import React from 'react'

import {client} from '../lib/client'
import {Product, FooterBanner, HeroBanner} from '../components'

const Home = ({ products, bannerData }) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map((product) => 
        <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  /*
  bannerData :
  [
  {
    largeText2: 'SMILE',
    _updatedAt: '2023-05-02T08:43:46Z',
    midText: 'Summer Sale',
    _createdAt: '2023-05-02T06:54:30Z',
    desc: 'Best headphones on the market',
    product: 'headphones',
    smallText: 'Beats Solo Air',
    largeText1: 'FINE',
    _id: '7d43bbbb-9dbd-4a95-801a-66417e6c14ed',
    discount: '20% OFF',
    image: { _type: 'image', asset: [Object] },
    _rev: 'FOPyh0TrGOspAX7hHd8IWN',
    _type: 'banner',
    saleTime: '15 Nov to 7 Dec',
    buttonText: 'Shop Now'
  }
  ]
  */

  return {
    props: { products, bannerData }
  }
}

export default Home

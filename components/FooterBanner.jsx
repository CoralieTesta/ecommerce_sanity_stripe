import { urlFor } from '@/lib/client'
import Link from 'next/link'
import React from 'react'

const FooterBanner = ({ footerBanner: {discount, largeText1, largeText2,
saleTime, smallText, midText, product, buttonText, image, desc} }) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>
            {discount}
            <h3>
              {largeText1}
            </h3>
            <h3>
              {largeText2}
            </h3>
            <p>
              {saleTime}
            </p>
          </p>
        </div>
        <div className='right'>
          <p>
            {smallText}
          </p>
          <h3>
            {midText}
          </h3>
          <p>
            {desc}
          </p>
          <Link href={`/product/${product}`}>
            <button type='button'>
              {buttonText}
            </button>
            <img 
              src={urlFor(image)}
              className='footer-banner-image'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FooterBanner
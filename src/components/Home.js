import React from 'react'
import './Home.css'
import Product from './Product'

export default function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img 
            className='home__image'
            src='https://m.media-amazon.com/images/I/61Mk4jhK2DL._SX3000_.jpg' alt='' />

            <div className='home__row'>
              <Product 
                id={12332}
                title="iPhone 14 Pro"
                price={1749.99}
                image="https://cdn11.bigcommerce.com/s-sdw35vj9c2/images/stencil/1280x1280/products/79073/257171/sb-1__00136.1662690181.png?c=2"
                rating={5}
              />
              <Product 
                id={12132}
                title="PlayStation 5"
                price={799.99}
                image="https://store.sony.com.au/dw/image/v2/ABBC_PRD/on/demandware.static/-/Sites-sony-master-catalog/default/dw767da4b8/images/PS5WBUNDLE/PS5WBUNDLE.png"
                rating={4}
              />
            </div>

            <div className='home__row'>
              <Product 
                id={11332}
                title='14" MacBook Pro'
                price={2999.99}
                image="https://www.costco.com.au/medias/sys_master/images/hc5/h6d/83707989852190.jpg"
                rating={4}
              />
              <Product 
                id={12330}
                title="Nvidia GeForce RTX 4090"
                price={3199.99}
                image="https://www.ausgamers.com/gameres/7967/images/source/4090fe_review5.jpg"
                rating={3}
              />
              <Product 
                id={19332}
                title="iPad 10th Gen"
                price={749.99}
                image="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-2022-hero-blue-wifi-select_FMT_WHH?wid=940&hei=1112&fmt=png-alpha&.v=1664387252309"
                rating={2}
              />
            </div>

            <div className='home__row'>
              <Product 
                id={92332}
                title="Intel Core i9 13900K"
                price={989.99}
                image="https://m.media-amazon.com/images/I/61uI+orDOZL.jpg"
                rating={5}
              />
            </div>
        </div>
    </div>
  )
}

"use client"

import UrunDetay from '@/app/components/UrunDetay';
import Loading from '@/app/loading';
import { useGetProductsListQuery } from '@/store/services/user/productUserApi';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
  const {id} = useParams();
  const {data, isLoading} = useGetProductsListQuery();

  if(isLoading) return <Loading/>

  data && console.log(data)




  const selectedProduct =  data && data.data.find((product) => product.id === Number(id));
   console.log(selectedProduct);
  return (
    <div>
       <section className="text-gray-600 body-font overflow-hidden">
          <UrunDetay data={selectedProduct}/>
        </section>
    </div>
  )
}

export default page

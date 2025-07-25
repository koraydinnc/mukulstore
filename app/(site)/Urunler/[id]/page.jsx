"use client";

import UrunDetay from "@/app/components/UrunDetay";
import { useGetProductDetailQuery } from "@/store/services/user/productUserApi";
import { useParams } from "next/navigation";
import React from "react";
import Loading from "../../loading";
import { useSelector } from "react-redux";

const Page = () => {
  const {id} = useParams();
  const sepet = useSelector ((state) => state.sepet);
  const { data, isLoading, error } = useGetProductDetailQuery(Number(id));

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-600">Bir hata oluştu. Lütfen daha sonra tekrar deneyin.</div>;
  }

  if (!data) {
    return <div className="text-gray-600">Ürün bilgisi bulunamadı.</div>;
  }


  return (
    <div>
      <section className="text-gray-600 font-sans overflow-hidden">
        <UrunDetay data={data} />
      </section>
    </div>
  );
};

export default Page;

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Statistic } from 'antd';
import CountUp from 'react-countup';
import { ShoppingOutlined, UserOutlined, ShopOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import Image from 'next/image';
import PaymentLogo from '@/app/components/PaymentLogo';
import { Award, Leaf, Lightbulb } from 'lucide-react';
import SEO from '@/app/components/SEO';

const AnimatedStatistic = ({ value, title, prefix, suffix }) => {
  return (
    <Statistic 
      title={title}
      value={value}
      prefix={prefix}
      suffix={suffix}
      valueStyle={{ 
        color: '#1890ff',
        fontSize: '2rem',
        fontWeight: 'bold'
      }}
      formatter={() => (
        <CountUp
          end={value}
          duration={2.5}
          separator=","
          useEasing={true}
          enableScrollSpy={true}
          scrollSpyOnce={true}
        />
      )}
    />
  );
};

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      <SEO title='Hakkımızda'/>

      <main className="flex-grow pt-16">
       

        {/* Brand Story */}
        <motion.section 
          id="story"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="container mx-auto px-4 py-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Hikayemiz</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
  Mukul Store, kaliteli ürünleri ve müşteri memnuniyetine verdiği önemle tanınan bir marka olarak, 
  her geçen gün daha geniş bir kitleye ulaşmayı hedefliyor. Modern tasarımları, dikkatle seçilmiş 
  kumaşları ve özenli üretim süreçleriyle, alışveriş deneyiminizi keyifli ve güvenilir hale getiriyoruz. 
  İlham kaynağımız, sizin için en iyisini sunma arzumuz.
</p>

        </motion.section>

        {/* Values */}
        <section id="values" className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Değerlerimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {[
    {
      title: "Kalite",
      description: "En kaliteli kumaşlar ve üretim standartları",
      icon: <Award className="w-12 h-12 text-blue-500 mb-4" />
    },
    {
      title: "Sürdürülebilirlik",
      description: "Çevre dostu üretim ve ambalajlama",
      icon: <Leaf className="w-12 h-12 text-green-500 mb-4" />
    },
    {
      title: "Yenilikçilik",
      description: "Trend belirleyen tasarımlar ve teknolojiler",
      icon: <Lightbulb className="w-12 h-12 text-yellow-500 mb-4" />
    }
  ].map((value, index) => (
    <motion.div
      key={index}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 * (index + 1) }}
      className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 * (index + 1) }}
      >
        {value.icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
      <p className="text-gray-600">{value.description}</p>
    </motion.div>
  ))}
</div>
          </div>
        </section>

        {/* Stats Section Updated */}
        <section id="stats" className="container mx-auto px-4 py-8 sm:py-16">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
    {[
      { 
        number: 50000,
        label: "Mutlu Müşteri",
        prefix: <UserOutlined className="mr-1 sm:mr-2" />,
        suffix: "+"
      },
      { 
        number: 1000,
        label: "Ürün Çeşidi",
        prefix: <ShoppingOutlined className="mr-1 sm:mr-2" />,
        suffix: "+"
      },
      { 
        number: 2,
        label: "Mağaza",
        prefix: <ShopOutlined className="mr-1 sm:mr-2" />,
        suffix: "+"
      },
      { 
        number: 24,
        label: "Müşteri Desteği",
        prefix: <CustomerServiceOutlined className="mr-1 sm:mr-2" />,
        suffix: "/7"
      }
    ].map((stat, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 0.4,
          delay: index * 0.1 
        }}
        className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <AnimatedStatistic
          className="text-base sm:text-lg lg:text-xl"
          valueStyle={{ 
            fontSize: 'inherit',
            fontWeight: 'bold',
            color: '#1890ff'
          }}
          titleStyle={{
            fontSize: 'small',
            color: '#666'
          }}
          value={stat.number}
          title={stat.label}
          prefix={stat.prefix}
          suffix={stat.suffix}
        />
      </motion.div>
    ))}
  </div>
</section>
    </main>
    </div>

  
  );
};

export default Page;

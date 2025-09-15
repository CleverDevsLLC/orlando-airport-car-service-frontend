'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'

interface YelpReviewsPreviewProps {
  businessName: string
  rating: number
  yelpUrl: string
}

const YelpReviewsPreview: React.FC<YelpReviewsPreviewProps> = ({
  businessName,
  rating,
  yelpUrl
}) => {
  const starVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: (i: number) => ({
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: i * 0.1
      }
    })
  }

  const containerVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-xl p-6 w-[95%] mx-auto"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <img src='/images/yelp-banner.png' width={150}/>
      <br/>
      <motion.h2
        className="text-2xl font-bold text-gray-800 mb-4 flex justify-start gap-2 items-center"
        variants={containerVariants}
      > 
        <img src='/images/yelp.png' width={50}/>
        {businessName}
      </motion.h2>
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            variants={starVariants}
            custom={i}
            initial="initial"
            animate="animate"
          >
            <Star
              className={`w-6 h-6 ${
                i < rating ? 'text-yelp-red fill-yelp-red' : 'text-gray-300'
              }`}
            />
          </motion.div>
        ))}
        <motion.span
          className="ml-2 text-gray-600"
          variants={containerVariants}
        >
          {rating.toFixed(1)}
        </motion.span>
      </div>
      <motion.a
        href={yelpUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-yelp-red hover:bg-yelp-red-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yelp-red transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Read Reviews on Yelp
        <ExternalLink className="ml-2 h-5 w-5" />
      </motion.a>
    </motion.div>
  )
}

export default YelpReviewsPreview


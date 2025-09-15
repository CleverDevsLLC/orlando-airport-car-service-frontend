'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'

const ReviewButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-yellow-400 text-gray-900 rounded-full  shadow-lg flex items-center justify-center"
          onClick={() => window.open('https://www.yelp.com/writeareview/biz/AsMvelzcREjZ87wHO8FUQw?return_url=/biz/AsMvelzcREjZ87wHO8FUQw', '_blank')}
          >
          <img className="h-[80px] w-[80px]" src={"/images/yelp.png"} alt="yelp"/>
        </motion.button>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-2 bottom-full mb-2 bg-[#FF1413] text-white px-4 py-2 rounded-md shadow-md whitespace-nowrap"
            >
              <div className='flex items-center justify-center gap-2'>
              <Star/> View our reviews on Yelp
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default ReviewButton


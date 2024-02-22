import React from 'react'
import { motion } from 'framer-motion'
const animationConfiguration = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};
const Transitions = ({ children }) => {
    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: '100%' }}
        >
            {children}
        </motion.div>
    )
}
export default Transitions

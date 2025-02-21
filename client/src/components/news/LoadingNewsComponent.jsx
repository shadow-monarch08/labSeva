import { motion } from "motion/react"

const loadingVarient = {
    initial: {
        background: 'linear-gradient(135deg, hsl(109, 36%, 61%) 0%, hsl(108, 42%, 74%) 100%)'
    },
    animate: {
        background: 'linear-gradient(135deg, hsl(109, 36%, 61%) 0%, hsl(108, 42%, 74%) 0%)',
        transition: {
            repeat: Infinity,
            duration: 0.8,
            ease: 'easeOut',
        }
    }
}

const LoadingNewsComponent = () => {
    return (
        <motion.div 
        className="w-full h-full bg-gray-400 rounded-4xl"
        variants={loadingVarient}
        initial="initial"
        animate="animate"
        ></motion.div>
    )
}

export default LoadingNewsComponent
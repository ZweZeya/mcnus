"use client"

import { PropsWithChildren, useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

const EntranceAnimation = (props: PropsWithChildren) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const control = useAnimation();
  
    useEffect(() => {
      if (isInView) {
        control.start("visible");
      }
    }, [isInView]);
  
    return (
      <div ref={ref} style={{padding: 0, margin: 0}}>
        <motion.div 
          style={{padding: 0, margin: 0}}
          variants={{
            hidden: { opacity: 0, y: 1 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate={control}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {props.children}
        </motion.div>
      </div>
    );
  };

export default EntranceAnimation
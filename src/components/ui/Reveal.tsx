import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
}

export const Reveal = ({ children, width = "fit-content", delay = 0.1 }: RevealProps) => { // Faster default delay
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 1, y: 0 }, // Removed animation: start visible
                    visible: { opacity: 1, y: 0 },
                }}
                initial="visible" // Start visible immediately
                animate={mainControls}
                transition={{ duration: 0 }} // Instant transition
            >
                {children}
            </motion.div>
        </div>
    );
};

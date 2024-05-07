import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

const Projects = () => {
    return (
        <section className="py-28">
            <div className="mx-auto max-w-full">
                <Link
                    heading="Oraanj - Interior Design"
                    imgSrc="https://i.pinimg.com/736x/07/f6/7f/07f67fdc52368ebfa020c7309a86d8e8.jpg"
                    href="https://www.oraanj-interiors.co.uk/"
                />
                <Link
                    heading="Holy Herbs"
                    imgSrc="https://i.pinimg.com/736x/dc/b5/14/dcb51474355d1672402d89a67b6b04c6.jpg"
                    href="https://holyherbs.in/"
                />
                <Link
                    heading="Apple Website Clone"
                    imgSrc="https://i.pinimg.com/736x/b8/af/de/b8afdeed23cb31b052c77a1062385d32.jpg"
                    href="https://apple-website-clone-6xku.onrender.com"
                />
                <Link
                    heading="Dashboard UI"
                    imgSrc="https://i.pinimg.com/736x/52/86/b4/5286b4f0706707b4a2a2b4abd2fc0f76.jpg"
                    href="https://dashboard-ui-jdnm.onrender.com"
                />
                <Link
                    heading="Expense Tracker"
                    imgSrc="https://i.pinimg.com/736x/1b/cf/cc/1bcfcca5c30b2eca799cd48ba4dd71fb.jpg"
                    href="https://expense-tracker-v4ku.onrender.com"
                />
                <Link
                    heading="E - Commerce"
                    imgSrc="https://i.pinimg.com/736x/35/0f/9d/350f9d7c5c74874b69fcc484a5b87f2b.jpg"
                    href="https://e-commerce-1oyc.onrender.com"
                />
                <Link
                    heading="Weather App"
                    imgSrc="https://i.pinimg.com/736x/e8/58/f5/e858f53565ffe5ad97d92138c8be7ca5.jpg"
                    href="https://weather-app-pacy.onrender.com"
                />
                <Link
                    heading="Todo - List"
                    imgSrc="https://i.pinimg.com/736x/a0/74/f3/a074f36423c97ba2f5b473dee9bd8932.jpg"
                    href="https://todo-list-k10j.onrender.com"
                />
            </div>
        </section>
    );
};

const Link = ({ heading, imgSrc, href }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
    const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    return (
        <motion.a
            href={href}
            ref={ref}
            target="blank"
            onMouseMove={handleMouseMove}
            initial="initial"
            whileHover="whileHover"
            className="group relative flex items-center justify-between border-b-2 border-[#DF5F24] py-4 transition-colors duration-500 hover:border-[#DF5F24] md:py-8"
        >
            <div>
                <motion.span
                    variants={{
                        initial: { x: 0 },
                        whileHover: { x: -16 },
                    }}
                    transition={{
                        type: "spring",
                        staggerChildren: 0.075,
                        delayChildren: 0.25,
                    }}
                    className="project-title relative z-10 block text-4xl font-bold text-[#DF5F24] transition-colors duration-500 group-hover:text-[#DF5F24] md:text-6xl"
                >
                    {heading.split("").map((l, i) => (
                        <motion.span
                            variants={{
                                initial: { x: 0 },
                                whileHover: { x: 16 },
                            }}
                            transition={{ type: "spring" }}
                            className="inline-block"
                            key={i}
                        >
                            {l}
                        </motion.span>
                    ))}
                </motion.span>
            </div>

            <motion.img
                style={{
                    top,
                    left,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                variants={{
                    initial: { scale: 0, rotate: "-12.5deg" },
                    whileHover: { scale: 1, rotate: "12.5deg" },
                }}
                transition={{ type: "spring" }}
                src={imgSrc}
                className="absolute z-0 h-24 w-32 rounded-lg object-contain md:h-48 md:w-64"
                alt={`Image representing a link for ${heading}`}
            />

            <motion.div
                variants={{
                    initial: {
                        x: "25%",
                        opacity: 0,
                    },
                    whileHover: {
                        x: "0%",
                        opacity: 1,
                    },
                }}
                transition={{ type: "spring" }}
                className="relative z-10 p-4"
            >
                <FiArrowRight className="text-5xl text-[#DF5F24]" />
            </motion.div>
        </motion.a>
    );
};

export default Projects
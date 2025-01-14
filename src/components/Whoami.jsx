import React from "react";
import { motion } from "framer-motion";

const Whoami = () => {
    return (
        <>
            <section>
                <div className="container-fluid">
                    <div className="row py-28">
                        <div className='py-3'>
                            <h1 className='font-bold'>Who Am I?</h1>
                        </div>
                        <div>
                            <h3 className='font-extralight'>
                                It’s hard to label me <br />
                                but I can certainly <a href="https://drive.google.com/file/d/1oCGMEwAcGBO24IJrp22yyq6aCYqJW8-1/view?usp=sharing" target='_blank' className='text-decoration-none sp text-[#1F1F1F]'>
                                    <span className="relative">
                                        "share" 
                                        <svg
                                            viewBox="0 0 286 73"
                                            fill="none"
                                            className="absolute -left-2 -right-2 -top-0 bottom-0 translate-y-1"
                                        >
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                whileInView={{ pathLength: 1 }}
                                                transition={{
                                                    duration: 1.25,
                                                    ease: "easeInOut",
                                                }}
                                                d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                                                stroke="#FACC15"
                                                strokeWidth="4"
                                            />
                                        </svg>
                                    </span>
                                </a> a little bit about myself.
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Whoami
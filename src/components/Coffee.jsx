import React from 'react'
import { BsEnvelope } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";

const Coffee = () => {
    return (
        <>
            <section>
                <div className="container-fluid">
                    <div className="row py-28">
                        <div className='py-3'>
                            <h2 className='font-bold'>Coffee?</h2>
                        </div>
                        <div className='py-3'>
                            <div className='loader-sleepy'></div>
                        </div>
                        <div>
                            <h3 className='font-extralight'>
                                <span className='sp'>Let’s connect</span> and maybe enjoy a cup together sometime.
                            </h3>
                        </div>
                        <div className='py-20 flex justify-start items-center'>
                            <a href="https://www.linkedin.com/in/ayush-kumar2822" target='blank' className='uppercase sp flex justify-center items-center gap-x-2 px-11 text-[#1F1F1F]'><BsLinkedin /> linkedin</a>
                            <a href="mailto:aayushkumar1228@gmail.com" className='uppercase sp flex justify-center items-center gap-x-2 text-[#1F1F1F]'><BsEnvelope /> Say hello</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Coffee
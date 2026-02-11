import React from 'react'
import { FaGithub } from "react-icons/fa";
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
                                <span className='sp text-[#C9C7BA]'>Let’s connect</span> and maybe enjoy a cup together sometime.
                            </h3>
                        </div>
                        <div className='py-20 flex justify-start items-center'>
                            <a href="https://www.linkedin.com/in/ayush-kumar2822" target='blank' className='uppercase sp flex justify-center items-center gap-x-2 px-11 text-[#C9C7BA]'><BsLinkedin /> linkedin</a>
                            <a href="https://github.com/lachimolala2628" target='blank' className='uppercase sp flex justify-center items-center gap-x-2 text-[#C9C7BA]'><FaGithub /> github</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Coffee
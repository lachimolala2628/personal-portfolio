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
                            <h3 className='font-light'>
                                I also make a great coffee. <br />
                                Let’s get in touch and maybe share one someday.
                            </h3>
                        </div>
                        <div className='py-20 flex justify-start items-center'>
                            <a href="https://www.linkedin.com/in/ayush-kumar-32856025a" target='blank' className='uppercase font-bold flex justify-center items-center gap-x-2 px-11'><BsLinkedin /> linkedin</a>
                            <a href="mailto:aayushkumar1228@gmail.com" className='uppercase font-bold flex justify-center items-center gap-x-2'><BsEnvelope /> Say hello</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Coffee
import React from 'react'

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
                                but I can certainly <a href="https://drive.google.com/file/d/1oCGMEwAcGBO24IJrp22yyq6aCYqJW8-1/view?usp=sharing" target='_blank' className='cv text-decoration-none font-mono font-extrabold'>
                                    "share"
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
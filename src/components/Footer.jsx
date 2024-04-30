import React from 'react'

const Footer = () => {
    return (
        <>
            <footer>
                <div className="mx-auto max-w-full p-6">
                    <dl className="grid grid-cols-1 gap-y-4 text-center lg:grid-cols-3">
                        <div>
                            <a href="mailto:aayushkumar1228@gmail.com" className='text-sm uppercase'>
                                aayushkumar1228@gmail.com
                            </a>
                        </div>
                        <div>
                            <span className='text-sm uppercase'>
                                design and developed by ayush
                            </span>
                        </div>
                        <div>
                            <span className='text-sm uppercase'>
                                &copy;2024
                            </span>
                        </div>
                    </dl>
                </div>
            </footer>
        </>
    )
}

export default Footer
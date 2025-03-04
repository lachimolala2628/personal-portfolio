import React from 'react'

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer>
                <div className="mx-auto max-w-full p-6 text-[#C9C7BA]">
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
                                &copy;{currentYear}
                            </span>
                        </div>
                    </dl>
                </div>
            </footer>
        </>
    )
}

export default Footer
import React from 'react'

const Header = () => {
    return (
        <>
            <header>
                <nav className="mx-auto flex max-w-full items-center justify-between p-6">
                    <div className='text-[#C9C7BA]'>
                        <a href="#" className="text-base font-bold uppercase">
                            Ayush Kumar
                            <br />
                            <span className='uppercase text-sm tracking-[5px]'>portfolio</span>
                        </a>
                    </div>
                    <div>
                        <div className="loader"></div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header
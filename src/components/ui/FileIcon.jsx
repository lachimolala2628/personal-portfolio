import React from 'react'
import { TbPdf } from "react-icons/tb";

const FileIcon = () => {
    return (
        <div className="relative w-9 h-11">
            <div className="w-full h-full bg-[#f5f0e8] border border-[var(--color-border)] rounded-sm shadow-md relative overflow-hidden text-[20px] text-black flex items-center justify-center">
                <TbPdf />
            </div>
        </div>
    )
}

export default FileIcon
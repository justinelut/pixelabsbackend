import React from 'react'

export default function Logo(){

    return(
        <div className="flex items-center">
            <img src="/assets/logo.png" alt="Logo" />
            <span className="ml-auto w-12 h-12 font-bold">PixelAbs</span>
        </div>
    )
}
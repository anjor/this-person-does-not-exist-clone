import React from 'react'

export default function Images({images, idx}) {
    return (
        <div>
            <img src= { images[idx] } alt ="">
            </img>

        </div>
    )
}
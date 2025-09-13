import React from 'react'
import style from "./Loading.module.css"
export default function Loading() {
  return (
    <div className={`${style.cont}`}>
    
    <span className={`${style.loader} `}></span>
    </div>
  )
}

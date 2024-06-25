import React from 'react'

export default function AboutLink(props) {
  return (
    <div>
        <a href={props.href} target='_blank' rel='noreferrer' className='link' >{props.text}</a><br/>
    </div>
  )
}

import React from 'react'
import user from '../images/luffy.png'
const ContactDetail = (prop) => {
  return (
    <div className='main'>
        <div className='ui card centered'>
            <div className='image'>
                <img src={user} alt="user"/>
            </div>
            <div className='content'>
                <div className='header'>Ari</div>
                <div className='description'>cs.ari@gmail.com</div>
            </div>
        </div>
    </div>
  )
}

export default ContactDetail
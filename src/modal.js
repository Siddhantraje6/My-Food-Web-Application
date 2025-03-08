import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgba(34, 34, 34)',
    transform: 'translate(-50%, -50%)',
    zIndex: 100,
    height: '85%',
    width: '85%'
}

const OVERLAYS_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(0 , 0, 0, .7)',
    zIndex: 100
}

export default function Modal({children, onClose}) {

    return ReactDom.createPortal(
        <>
            <div style={OVERLAYS_STYLES}>
                <div style={MODAL_STYLES}>
                    <button className='btn bg-danger fs-4' style={{marginLeft: '90%', marginTop: '-35px'}} onClick={onClose}>X</button>
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('cart-root')
    )
}
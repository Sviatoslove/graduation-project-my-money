import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const AvatarsField = ({ label, name, type, options, onChange }) => {
  const [index, setIndex] = useState(0)
  const [active, setActive] = useState(null)
  const prevRef = useRef(active)
  const [showClassesIncBt, setShowClassesIncBt] = useState('')
  const [showClassesDecBt, setShowClassesDecBt] = useState('-fill')

  useEffect(() => {
    prevRef.current = active
    toggleActive()
  })

  const prevActive = prevRef.current

  const handleClick = ({ target }) => {
    setActive(target)
    onChange({
      target: {
        name: target.name,
        value: target.src
      }
    })
  }

  const toggleActive = () => {
    if (prevActive !== active) {
      prevActive?.classList.remove('active')
    }
    active?.classList.add('active')
  }

  const drawingAvatars = (n) => {
    return options[n].map((item) => {
      return (
        <img
          alt='icon'
          role='button'
          type={type}
          id={name}
          name={name}
          src={item}
          key={item}
          onClick={handleClick}
          className='avatar'
          style={{ height: '52px', width: '52px', flexGrow: 1 }}
        />
      )
    })
  }

  const handleIncrement = () => {
    if (!index) setShowClassesDecBt('')
    if (index === 8) setShowClassesIncBt('-fill')
    if (index < 9) setIndex((prevState) => ++prevState)
  }

  const handleDecrement = () => {
    if (index === 9) setShowClassesIncBt('')
    if (index === 1) setShowClassesDecBt('-fill')
    if (index > 0) setIndex((prevState) => --prevState)
  }

  return (
    <div className='mb-4'>
      <label htmlFor={name}>{label}</label>
      <div className='input-group mt-2'>{drawingAvatars(index)}</div>
      {options.length > 1 && (
        <div className='text-center mt-2'>
          <button
            className='lh-1 p-0 btn btn-outline-secondary w-50'
            type='button'
            onClick={handleDecrement}
            disabled={showClassesDecBt}
          >
            <i className={'fs-3 bi bi-skip-backward' + showClassesDecBt}></i>
          </button>
          <button
            className='lh-1 p-0 btn btn-outline-secondary w-50'
            type='button'
            onClick={handleIncrement}
            disabled={showClassesIncBt}
          >
            <i className={'fs-3 bi bi-skip-forward' + showClassesIncBt}></i>
          </button>
        </div>
      )}
    </div>
  )
}

AvatarsField.defaultProps = {
  type: 'image'
}

AvatarsField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  type: PropTypes.string
}

export default AvatarsField

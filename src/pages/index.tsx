import { useState, useRef } from 'react'
import PerfectArrow from '../components/arrow'
import Entity from '../components/entity'

const App = () => {
  const ref = useRef<HTMLElement>(null)
  const [movePosition, setMovePosition] = useState({ x: 0, y: 0 })
  const [hoverOnEntity, setHoverOnEntity] = useState('')

  return (
    <div className='App'>
      <p> l3alawil lm9aaaaaaaawd</p>
      <section ref={ref}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          style={{ border: '1px solid #000' }}
          onMouseMove={(e) => {
            if (e.buttons !== 1) return
            const { pageX, pageY } = e

            setMovePosition(() => ({
              x: pageX - (ref.current?.offsetLeft || 0),
              y: pageY - (ref.current?.offsetTop || 0),
            }))
          }}
          onMouseUp={() => {
            setHoverOnEntity('')
          }}>
          <Entity
            name='entity 0'
            hoverOnEntity={hoverOnEntity}
            setHoverOnEntity={setHoverOnEntity}
            initialEntityPosition={{ x: 0, y: 0 }}
            entityPosition={movePosition}
          />

          <Entity
            name='entity 1'
            hoverOnEntity={hoverOnEntity}
            setHoverOnEntity={setHoverOnEntity}
            initialEntityPosition={{ x: 300, y: 300 }}
            entityPosition={movePosition}
          />
        </svg>
      </section>
    </div>
  )
}

export default App

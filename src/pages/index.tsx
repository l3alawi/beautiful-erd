import { useState, useRef } from 'react'
import PerfectArrow from '../components/arrow'
import Entity from '../components/entity'

interface PositionT {
  x: number
  y: number
}

interface DiagramT {
  type: string
  name: string
  attributes: { name: string; type: string; pk: boolean; fk: boolean }[]
  initialPosition: PositionT
}

const createDiagram = ({
  diagram,
  hoverOnEntity,
  setHoverOnEntity,
  movePosition,
  isMoving,
}: {
  diagram: DiagramT[]
  hoverOnEntity: string
  setHoverOnEntity: (name: string) => void
  movePosition: PositionT
  isMoving: boolean
}) => {
  const rendredDiagram = []

  for (let i = 0; i < diagram.length; i += 1) {
    switch (diagram[i].type) {
      case 'E':
        rendredDiagram.push(
          <Entity
            name={`#${i} ${diagram[i].name}`}
            attributes={diagram[i].attributes}
            hoverOnEntity={hoverOnEntity}
            setHoverOnEntity={setHoverOnEntity}
            initialEntityPosition={diagram[i].initialPosition}
            entityPosition={movePosition}
            isMoving={isMoving}
          />
        )
        break
      default:
        rendredDiagram.push(<p>yooo</p>)
        break
    }
  }
  return rendredDiagram
}

const App = () => {
  const ref = useRef<HTMLElement>(null)
  const [diagram, setDiagram] = useState<DiagramT[]>([
    {
      type: 'E',
      name: 'Entity 0',
      attributes: [
        { name: 'userId', type: 'string', pk: true, fk: false },
        { name: 'name', type: 'string', pk: false, fk: true },
        { name: 'age', type: 'number', pk: false, fk: false },
      ],
      initialPosition: {
        x: 200,
        y: 200,
      },
    },
  ])
  const [movePosition, setMovePosition] = useState({ x: 0, y: 0 })
  const [hoverOnEntity, setHoverOnEntity] = useState('')
  const [isMoving, setIsMoving] = useState(false)

  return (
    <div className='App'>
      <div>
        <button
          onClick={() => {
            // setDiagram([
            //   ...diagram,
            //   {
            //     type: 'E',
            //     name: 'Entity 0',
            //     initialPosition: {
            //       x: 0,
            //       y: 0,
            //     },
            //   },
            // ])
          }}>
          Add Entity
        </button>
      </div>
      <section ref={ref}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100vh'
          style={{ border: '1px solid #000' }}
          onMouseMove={(e) => {
            if (e.buttons !== 1) return
            e.preventDefault()
            const { pageX, pageY } = e
            setIsMoving(true)
            setMovePosition(() => ({
              x: pageX - (ref.current?.offsetLeft || 0),
              y: pageY - (ref.current?.offsetTop || 0),
            }))
          }}
          onMouseUp={() => {
            setIsMoving(false)
            setHoverOnEntity('')
          }}>
          {createDiagram({
            diagram,
            hoverOnEntity,
            setHoverOnEntity,
            movePosition,
            isMoving,
          })}
        </svg>
      </section>
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import EntityField from './entityField'

const Entity = ({
  entityPosition,
  initialEntityPosition,
  setHoverOnEntity,
  name,
  hoverOnEntity,
}: {
  entityPosition: { x: number; y: number }
  initialEntityPosition: { x: number; y: number }
  setHoverOnEntity: (name: string) => void
  name: string
  hoverOnEntity: string
}) => {
  const [position, setPosition] = useState(initialEntityPosition)
  const [mouseOver, setMouseOver] = useState(false)

  const { x, y } = position

  useEffect(() => {
    if (hoverOnEntity === name) {
      setPosition(entityPosition)
    }
  }, [entityPosition, hoverOnEntity, name])

  const entityHeight = 40

  return (
    <g
      style={{
        cursor: `${mouseOver && 'move'}`,
        boxShadow: '0 0px 12px 0 rgba(10, 10, 10, 0.1)',
      }}
      name={name}
      onMouseDown={() => {
        console.log(name)
        setMouseOver(true)
        setHoverOnEntity(name)
      }}>
      {generateEntity({
        entityNumber: 5,
        entityPositionY: y,
        entityPositionX: x,
        entityHeight,
      })}
    </g>
  )
}

const generateEntity = ({
  entityNumber,
  entityHeight,
  entityPositionY,
  entityPositionX,
}: {
  entityNumber: number
  entityHeight: number
  entityPositionY: number
  entityPositionX: number
}) => {
  const entity = []
  let entityFieldPositionY = entityPositionY
  let entityFieldPositionX = entityPositionX
  for (let i = 0; i < entityNumber; i += 1) {
    entity.push(
      <EntityField
        key={i}
        index={i}
        entityFieldheight={entityHeight}
        entityFieldPositionY={entityFieldPositionY}
        entityFieldPositionX={entityFieldPositionX}
      />
    )
    entityFieldPositionY += entityHeight
  }
  return entity
}

export default Entity

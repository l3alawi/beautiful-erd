import { useState, useEffect } from 'react'
import EntityField from './entityField'
import EntityHead from './entityHead'

const Entity = ({
  entityPosition,
  initialEntityPosition,
  setHoverOnEntity,
  name,
  attributes,
  hoverOnEntity,
  isMoving,
}: {
  entityPosition: { x: number; y: number }
  initialEntityPosition: { x: number; y: number }
  setHoverOnEntity: (name: string) => void
  name: string
  attributes: { name: string; type: string; pk: boolean; fk: boolean }[]
  hoverOnEntity: string
  isMoving: boolean
}) => {
  const [position, setPosition] = useState(initialEntityPosition)
  const [mouseOver, setMouseOver] = useState(false)

  const { x, y } = position

  useEffect(() => {
    if (hoverOnEntity === name && isMoving) {
      setPosition(entityPosition)
    }
  }, [entityPosition, hoverOnEntity, name, position, isMoving])

  const entityHeight = 40

  return (
    <g
      style={{
        cursor: `${mouseOver && 'move'}`,
        opacity: `${isMoving && mouseOver ? '0.6' : '1'}`,
        transition: 'opacity 0.2s ease-in-out',
      }}
      name={name}
      onMouseDown={(e) => {
        setMouseOver(true)
        setHoverOnEntity(name)
      }}>
      {generateEntity({
        name,
        attributes,
        entityNumber: attributes.length,
        entityPositionY: y,
        entityPositionX: x,
        entityHeight,
      })}
    </g>
  )
}

const generateEntity = ({
  name,
  attributes,
  entityNumber,
  entityHeight,
  entityPositionY,
  entityPositionX,
}: {
  name: string
  attributes: { name: string; type: string; pk: boolean; fk: boolean }[]
  entityNumber: number
  entityHeight: number
  entityPositionY: number
  entityPositionX: number
}) => {
  const entity = []
  let entityFieldPositionY = entityPositionY
  let entityFieldPositionX = entityPositionX
  entity.push(
    <EntityHead
      name={name}
      entityFieldheight={60}
      entityFieldPositionY={entityFieldPositionY}
      entityFieldPositionX={entityFieldPositionX}
    />
  )
  for (let i = 0; i < entityNumber; i += 1) {
    entity.push(
      <EntityField
        key={i}
        attribute={attributes[i]}
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

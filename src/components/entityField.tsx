import { useRef, useEffect, useState } from 'react'
import Text from './text'

const EntityField = ({
  attribute,
  index,
  entityFieldheight,
  entityFieldPositionY,
  entityFieldPositionX,
}: {
  attribute: { name: string; type: string; pk: boolean; fk: boolean }
  index: number
  entityFieldheight: number
  entityFieldPositionY: number
  entityFieldPositionX: number
}) => {
  const rectRef = useRef<SVGRectElement>(null)
  const typeRectRef = useRef<SVGRectElement>(null)

  const { name, type, pk, fk } = attribute

  const [typeRectDimension, setTypeRectDimension] = useState({
    rectWidth: 0,
    rectHeight: 0,
  })
  const [rectDimension, setRectDimension] = useState({
    rectWidth: 0,
    rectHeight: 0,
  })

  useEffect(() => {
    const { width: rectWidth, height: rectHeight } =
      rectRef?.current?.getBBox() as DOMRect
    const { width: typeRectWidth, height: typeRectHeight } =
      typeRectRef?.current?.getBBox() as DOMRect

    setRectDimension({ rectWidth, rectHeight })
    setTypeRectDimension({
      rectWidth: typeRectWidth,
      rectHeight: typeRectHeight,
    })
  }, [rectRef, typeRectRef])

  return (
    <>
      {pk && (
        <>
          <rect
            ref={rectRef}
            className='PKey'
            width='40'
            height={entityFieldheight}
            rx={8}
            ry={8}
            y={entityFieldPositionY}
            x={entityFieldPositionX - 40}
            onClick={() => console.log('click')}
          />
          <text
            x={entityFieldPositionX - 30}
            y={entityFieldPositionY + 25}
            font-family='Verdana'
            font-size='15'
            fill='black'>
            PK
          </text>
        </>
      )}
      {fk && (
        <>
          <rect
            ref={rectRef}
            className='FKey'
            width='40'
            height={entityFieldheight}
            rx={8}
            ry={8}
            y={entityFieldPositionY}
            x={entityFieldPositionX - 40}
            onClick={() => console.log('click')}
          />
          <text
            x={entityFieldPositionX - 30}
            y={entityFieldPositionY + 25}
            font-family='Verdana'
            font-size='15'
            fill='black'>
            FK
          </text>
        </>
      )}
      <rect
        ref={rectRef}
        width='100'
        height={entityFieldheight}
        className='attribute'
        rx={8}
        ry={8}
        y={entityFieldPositionY}
        x={entityFieldPositionX}
        onClick={() => console.log('click')}
      />
      <Text
        entityFieldPositionX={entityFieldPositionX - 20}
        entityFieldPositionY={entityFieldPositionY}
        rectDimension={rectDimension}
        fontSize={25}
        fontFamily='monospace'
        text={name}
        color='black'
      />
      <rect
        ref={typeRectRef}
        width='80'
        height={entityFieldheight}
        className='attributeType'
        rx={8}
        ry={8}
        y={entityFieldPositionY}
        x={entityFieldPositionX + 100}
        onClick={() => console.log('click')}
      />
      <Text
        entityFieldPositionX={entityFieldPositionX + 80}
        entityFieldPositionY={entityFieldPositionY - 5}
        rectDimension={typeRectDimension}
        fontSize={20}
        fontFamily='fantasy'
        text={type}
        color='black'
      />
    </>
  )
}

export default EntityField

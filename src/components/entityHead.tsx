import { useRef, useEffect, useState } from 'react'
import Text from './text'

const EntityHead = ({
  name,
  entityFieldheight,
  entityFieldPositionY,
  entityFieldPositionX,
}: {
  name: string
  entityFieldheight: number
  entityFieldPositionY: number
  entityFieldPositionX: number
}) => {
  const rectRef = useRef<SVGRectElement>(null)
  const [rectDimension, setRectDimension] = useState({
    rectWidth: 0,
    rectHeight: 0,
  })

  useEffect(() => {
    const { width: rectWidth, height: rectHeight } =
      rectRef?.current?.getBBox() as DOMRect

    setRectDimension({ rectWidth, rectHeight })
  }, [rectRef])

  return (
    <>
      <rect
        ref={rectRef}
        className='entityName'
        width={250}
        height={40}
        rx={8}
        ry={8}
        y={entityFieldPositionY - 35}
        x={entityFieldPositionX - 40}
        onClick={() => console.log('click')}
      />
      <Text
        entityFieldPositionX={entityFieldPositionX - 100}
        entityFieldPositionY={entityFieldPositionY - 40}
        rectDimension={rectDimension}
        fontSize={25}
        fontFamily='monospace'
        text={name}
        color='black'
      />
    </>
  )
}

export default EntityHead

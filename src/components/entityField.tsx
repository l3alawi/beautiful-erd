import { useRef, useEffect, useState } from 'react'

const EntityField = ({
  index,
  entityFieldheight,
  entityFieldPositionY,
  entityFieldPositionX,
}: {
  index: number
  entityFieldheight: number
  entityFieldPositionY: number
  entityFieldPositionX: number
}) => {
  const textRef = useRef<SVGTextElement>(null)
  const rectRef = useRef<SVGRectElement>(null)
  const [textDimension, setTextDimension] = useState({
    textWidth: 0,
    textHeight: 0,
  })
  const [rectDimension, setRectDimension] = useState({
    rectWidth: 0,
    rectHeight: 0,
  })

  useEffect(() => {
    const { width: textWidth, height: textHeight } =
      textRef?.current?.getBBox() as DOMRect
    const { width: rectWidth, height: rectHeight } =
      rectRef?.current?.getBBox() as DOMRect
    setTextDimension({ textWidth, textHeight })
    setRectDimension({ rectWidth, rectHeight })
    console.log({
      rectHeight,
      textHeight,
      value:
        (rectDimension.rectHeight - textDimension.textHeight) / 2 +
        textDimension.textHeight / 2,
    })
  }, [textRef])

  return (
    <>
      <rect
        ref={rectRef}
        width='100'
        height={entityFieldheight}
        fill='pink'
        stroke='red'
        rx={index || 8}
        ry={index || 8}
        y={entityFieldPositionY}
        x={entityFieldPositionX}
        onClick={() => console.log('click')}
      />
      <text
        ref={textRef}
        x={
          entityFieldPositionX +
          (rectDimension.rectWidth - textDimension.textWidth) / 2
        }
        y={
          entityFieldPositionY +
          (rectDimension.rectHeight - textDimension.textHeight / 2)
        }
        font-family='Verdana'
        font-size='25'
        fill='blue'>
        Hello
      </text>
    </>
  )
}

export default EntityField

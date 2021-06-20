import { useRef, useEffect, useState } from 'react'

const Text = ({
  entityFieldPositionX,
  entityFieldPositionY,
  rectDimension,
  text,
  fontSize,
  fontFamily,
  color,
}: {
  entityFieldPositionX: number
  entityFieldPositionY: number
  rectDimension: { rectWidth: number; rectHeight: number }
  text: string
  fontSize: number
  fontFamily: string
  color: string
}) => {
  const textRef = useRef<SVGTextElement>(null)
  const [reduceFont, setReduceFont] = useState(0)
  const [textDimension, setTextDimension] = useState({
    textWidth: 0,
    textHeight: 0,
  })
  useEffect(() => {
    const { width: textWidth, height: textHeight } =
      textRef?.current?.getBBox() as DOMRect

    if (rectDimension.rectWidth - textWidth < 20) {
      setReduceFont(5)
    }
    setTextDimension({ textWidth, textHeight })
  }, [textRef, reduceFont])
  return (
    <text
      ref={textRef}
      onClick={() => console.log({ textDimension, rectDimension })}
      x={
        entityFieldPositionX +
        (rectDimension.rectWidth - textDimension.textWidth)
      }
      y={
        entityFieldPositionY +
        (rectDimension.rectHeight - textDimension.textHeight / 2)
      }
      font-family={fontFamily}
      font-size={fontSize - reduceFont}
      fill={color}>
      {text}
    </text>
  )
}

export default Text

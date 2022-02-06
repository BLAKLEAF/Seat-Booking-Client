import { useState, useEffect, useRef } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";

function Canvas() {
  const [rectangles, setRectangles] = useState();
  const [selectedId, selectShape] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const annotationsToDraw = [...annotations, ...newAnnotation];
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (annotations.some((item) => item.key === selectedId)) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [annotations, selectedId]);

  const handleMouseDown = (event) => {
    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
    }
    // deselect when clicked on empty area
    const clickedOnEmpty = event.target === event.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleMouseUp = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: annotations.length + 1,
      };
      annotations.push(annotationToAdd);
      setNewAnnotation([]);
      setAnnotations(annotations);
    }
  };

  const handleMouseMove = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
        },
      ]);
    }
  };

  // const annotationsToDraw = [...annotations, ...newAnnotation];
  // const [rectangles, setRectangles] = useState(annotationsToDraw);
  // const [selectedId, selectShape] = useState(null);
  return (
    <Stage
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      height={750}
      width={1600}
      style={{
        background: "#ffe8d6",
        filter: "drop-shadow(0 0 0.75rem #ddbea9)",
      }}
    >
      <Layer>
        {annotationsToDraw.map((value, i) => {
          return (
            <Rect
              draggable
              onSelect={() => {
                selectShape(value.key);
              }}
              onDragEnd={(e) => {
                const rects = annotationsToDraw.slice();
                rects[i] = {
                  x: e.target.x(),
                  y: e.target.y(),
                };
                setRectangles(rects);
              }}
              onTransformEnd={(e) => {
                // transformer is changing scale of the node
                // and NOT its width or height
                // but in the store we have only width and height
                // to match the data better we will reset scale on transform end
                const node = shapeRef.current;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                // we will reset it back
                node.scaleX(1);
                node.scaleY(1);
                const rects = annotationsToDraw.slice();
                rects[i] = {
                  x: node.x(),
                  y: node.y(),
                  // set minimal value
                  width: Math.max(5, node.width() * scaleX),
                  height: Math.max(node.height() * scaleY),
                };

                setRectangles(rects);
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
              }}
              ref={shapeRef}
              key={value.key}
              x={value.x}
              y={value.y}
              width={value.width}
              height={value.height}
              fill="#cad2c5"
              stroke="black"
            />
          );
        })}
        {annotations.some((item) => item.key === selectedId) && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </Layer>
    </Stage>
  );
}

export default Canvas;

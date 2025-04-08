import { useEffect, useRef, useState } from "react";
import RetroLabeledPanel from "../../components/RetroLabeledPanel.module.css/RetroLabeledPanel"
import classes from './GraphicKey.module.css'

interface Point {
    x: number;
    y: number;
    index: number;
}

interface GraphicKeyProps {
    onGraphicKeyComplete: (newValue: number[]) => void,
    isBlocked: Boolean,
    className?: string;
}


const GraphicKey: React.FC<GraphicKeyProps> = ({
    onGraphicKeyComplete,
    isBlocked,
    className = '',
}) => {
    const width = 500;
    const height = 500;
    const pointSize = 20;
    const pointActiveSize = 30;
    let pointColor = isBlocked? 'red' : '#545454';
    const pointActiveColor = '#006c1b'
    const lineColor = '#006c1b'
    const lineWidth = 3
    const resetOnComplete = true


    const containerRef = useRef<HTMLDivElement>(null);
    const [points, setPoints] = useState<Point[]>([]);
    const [activePoints, setActivePoints] = useState<number[]>([]);
    const [currentPosition, setCurrentPosition] = useState<{ x: number; y: number } | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const gridSize = 3;
        const newPoints: Point[] = [];
        const spacingX = width / (gridSize + 1);
        const spacingY = height / (gridSize + 1);

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                newPoints.push({
                    x: spacingX * (col + 1),
                    y: spacingY * (row + 1),
                    index: row * gridSize + col,
                });
            }
        }

        setPoints(newPoints);
    }, [width, height]);

    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        if (isBlocked) return;
        const { clientX, clientY } = getEventCoordinates(e);
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        setIsDrawing(true);
        checkPointHit(x, y);
    };

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDrawing) return;

        const { clientX, clientY } = getEventCoordinates(e);
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        setCurrentPosition({ x, y });
        checkPointHit(x, y);
    };

    const handleTouchEnd = () => {
        if (isDrawing && activePoints.length > 0) {
            if (onGraphicKeyComplete) {
                onGraphicKeyComplete([...activePoints]);
            }
            if (resetOnComplete) {
                setTimeout(() => {
                    setActivePoints([]);
                }, 300);
            }
        }
        setIsDrawing(false);
        setCurrentPosition(null);
    };

    const getEventCoordinates = (e: React.TouchEvent | React.MouseEvent) => {
        if ('touches' in e) {
            return {
                clientX: e.touches[0].clientX,
                clientY: e.touches[0].clientY,
            };
        } else {
            return {
                clientX: e.clientX,
                clientY: e.clientY,
            };
        }
    };

    const checkPointHit = (x: number, y: number) => {
        const hitRadius = pointActiveSize * 1.5;
        let pointHit = false;

        points.forEach((point) => {
            const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
            if (distance <= hitRadius && !activePoints.includes(point.index)) {
                setActivePoints((prev) => [...prev, point.index]);
                pointHit = true;
            }
        });

        return pointHit;
    };

    const renderLines = () => {
        if (activePoints.length < 1) return null;

        const lines = [];
        for (let i = 0; i < activePoints.length - 1; i++) {
            const startPoint = points[activePoints[i]];
            const endPoint = points[activePoints[i + 1]];

            if (!startPoint || !endPoint) continue;

            const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
            const length = Math.sqrt(
                Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)
            );

            lines.push(
                <div
                    key={`line-${i}`}
                    className="pattern-line"
                    style={{
                        position: 'absolute',
                        left: startPoint.x,
                        top: startPoint.y,
                        width: length,
                        height: lineWidth,
                        backgroundColor: lineColor,
                        transform: `rotate(${angle}rad)`,
                        transformOrigin: '0 0',
                        zIndex: 1,
                    }}
                />
            );
        }

        if (currentPosition && activePoints.length > 0) {
            const lastPoint = points[activePoints[activePoints.length - 1]];
            const angle = Math.atan2(
                currentPosition.y - lastPoint.y,
                currentPosition.x - lastPoint.x
            );
            const length = Math.sqrt(
                Math.pow(currentPosition.x - lastPoint.x, 2) +
                Math.pow(currentPosition.y - lastPoint.y, 2)
            );

            lines.push(
                <div
                    key="current-line"
                    className="pattern-line"
                    style={{
                        position: 'absolute',
                        left: lastPoint.x,
                        top: lastPoint.y,
                        width: length,
                        height: lineWidth,
                        backgroundColor: lineColor,
                        transform: `rotate(${angle}rad)`,
                        transformOrigin: '0 0',
                        zIndex: 1,
                    }}
                />
            );
        }

        return lines;
    };

    return (
        <RetroLabeledPanel 
        label="Графический ключ" 
        labelZIndex={1}
        style = {{
            width: `${width}px`,
            height: `${height}px`,
        }}
        >
            <div
                ref={containerRef}
                className={`pattern-lock ${className}`}
                style={{
                    position: 'relative',
                    width: `${width}`,
                    height: `${height}px`,
                    touchAction: 'none',
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleTouchStart}
                onMouseMove={handleTouchMove}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
            >
                {points.map((point) => (
                    <div
                        key={`point-${point.index}`}
                        className="pattern-point"
                        style={{
                            position: 'absolute',
                            left: point.x - pointSize / 2,
                            top: point.y - pointSize / 2,
                            width: pointSize,
                            height: pointSize,
                            borderRadius: '50%',
                            backgroundColor: activePoints.includes(point.index)
                                ? pointActiveColor
                                : pointColor,
                            transform: activePoints.includes(point.index)
                                ? `scale(${pointActiveSize / pointSize})`
                                : 'scale(1)',
                            transition: 'transform 0.2s, background-color 0.2s',
                            zIndex: 2,
                            cursor: 'pointer',
                        }}
                    />
                ))}
                {renderLines()}
            </div>
        </RetroLabeledPanel>
    );
};

export default GraphicKey;
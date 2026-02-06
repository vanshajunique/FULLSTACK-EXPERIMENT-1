const canvas = document.getElementById('canvas');
const colorPicker = document.getElementById('colorPicker');
const shapeSelect = document.getElementById('shapeSelect');
const undoBtn = document.getElementById('undoBtn');
const clearBtn = document.getElementById('clearBtn');
const shapeCount = document.getElementById('shapeCount');

let shapes = [];
let isDrawing = false;
let startX = 0;
let startY = 0;
let currentShape = null;

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

function getMousePos(event) {
    const canvasRect = canvas.getBoundingClientRect();
    const viewBoxWidth = canvas.viewBox.baseVal.width;
    const viewBoxHeight = canvas.viewBox.baseVal.height;
    
    const scaleX = viewBoxWidth / canvasRect.width;
    const scaleY = viewBoxHeight / canvasRect.height;

    const mouseX = (event.clientX - canvasRect.left) * scaleX;
    const mouseY = (event.clientY - canvasRect.top) * scaleY;

    return {
        x: mouseX,
        y: mouseY
    };
}

function updateViewBox() {
    const canvasRect = canvas.getBoundingClientRect();
    const newViewBox = `0 0 ${canvasRect.width} ${canvasRect.height}`;
    canvas.setAttribute('viewBox', newViewBox);
}

function createCircle(posX, posY, color) {
    const circle = document.createElementNS(SVG_NAMESPACE, 'circle');
    circle.setAttribute('cx', posX);
    circle.setAttribute('cy', posY);
    circle.setAttribute('r', '0');
    circle.setAttribute('fill', color);
    circle.setAttribute('opacity', '0.8');
    return circle;
}

function createRectangle(posX, posY, color) {
    const rectangle = document.createElementNS(SVG_NAMESPACE, 'rect');
    rectangle.setAttribute('x', posX);
    rectangle.setAttribute('y', posY);
    rectangle.setAttribute('width', '0');
    rectangle.setAttribute('height', '0');
    rectangle.setAttribute('fill', color);
    rectangle.setAttribute('opacity', '0.8');
    return rectangle;
}

function createLine(startPosX, startPosY, color) {
    const line = document.createElementNS(SVG_NAMESPACE, 'line');
    line.setAttribute('x1', startPosX);
    line.setAttribute('y1', startPosY);
    line.setAttribute('x2', startPosX);
    line.setAttribute('y2', startPosY);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '3');
    line.setAttribute('stroke-linecap', 'round');
    return line;
}

function calculateDistance(x1, y1, x2, y2) {
    const horizontalDiff = x2 - x1;
    const verticalDiff = y2 - y1;
    const distance = Math.sqrt((horizontalDiff * horizontalDiff) + (verticalDiff * verticalDiff));
    return distance;
}

updateViewBox();
window.addEventListener('resize', updateViewBox);

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    const position = getMousePos(event);
    startX = position.x;
    startY = position.y;

    const selectedShape = shapeSelect.value;
    const selectedColor = colorPicker.value;

    if (selectedShape === 'circle') {
        currentShape = createCircle(startX, startY, selectedColor);
    } else if (selectedShape === 'rectangle') {
        currentShape = createRectangle(startX, startY, selectedColor);
    } else if (selectedShape === 'line') {
        currentShape = createLine(startX, startY, selectedColor);
    }

    canvas.appendChild(currentShape);
});

canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing || !currentShape) {
        return;
    }

    const position = getMousePos(event);
    const selectedShape = shapeSelect.value;

    if (selectedShape === 'circle') {
        const radius = calculateDistance(startX, startY, position.x, position.y);
        currentShape.setAttribute('r', radius);
    } else if (selectedShape === 'rectangle') {
        const width = position.x - startX;
        const height = position.y - startY;
        const absWidth = Math.abs(width);
        const absHeight = Math.abs(height);
        
        currentShape.setAttribute('width', absWidth);
        currentShape.setAttribute('height', absHeight);
        
        if (width < 0) {
            currentShape.setAttribute('x', position.x);
        } else {
            currentShape.setAttribute('x', startX);
        }
        
        if (height < 0) {
            currentShape.setAttribute('y', position.y);
        } else {
            currentShape.setAttribute('y', startY);
        }
    } else if (selectedShape === 'line') {
        currentShape.setAttribute('x2', position.x);
        currentShape.setAttribute('y2', position.y);
    }
});

canvas.addEventListener('mouseup', () => {
    if (isDrawing && currentShape) {
        const selectedShape = shapeSelect.value;
        const isShapeTooSmall = isSmallShape(currentShape, selectedShape);

        if (!isShapeTooSmall) {
            const shapeClone = currentShape.cloneNode(true);
            shapes.push(shapeClone);
            updateShapeCount();
        } else {
            currentShape.remove();
        }

        currentShape = null;
    }

    isDrawing = false;
});

function isSmallShape(shape, shapeType) {
    const MIN_SIZE = 2;
    
    if (shapeType === 'circle') {
        const radius = parseFloat(shape.getAttribute('r'));
        return radius < MIN_SIZE;
    } else if (shapeType === 'rectangle') {
        const width = parseFloat(shape.getAttribute('width'));
        const height = parseFloat(shape.getAttribute('height'));
        return width < MIN_SIZE || height < MIN_SIZE;
    } else if (shapeType === 'line') {
        const x1 = parseFloat(shape.getAttribute('x1'));
        const y1 = parseFloat(shape.getAttribute('y1'));
        const x2 = parseFloat(shape.getAttribute('x2'));
        const y2 = parseFloat(shape.getAttribute('y2'));
        const lineLength = calculateDistance(x1, y1, x2, y2);
        return lineLength < MIN_SIZE;
    }
    
    return false;
}

canvas.addEventListener('mouseleave', () => {
    if (isDrawing && currentShape) {
        currentShape.remove();
        currentShape = null;
    }
    isDrawing = false;
});

function undo() {
    if (shapes.length === 0) {
        return;
    }

    shapes.pop();
    
    const allShapesOnCanvas = canvas.querySelectorAll('circle, rect, line');
    if (allShapesOnCanvas.length > 0) {
        const lastShapeOnCanvas = allShapesOnCanvas[allShapesOnCanvas.length - 1];
        lastShapeOnCanvas.remove();
    }
    
    updateShapeCount();
}

undoBtn.addEventListener('click', undo);

document.addEventListener('keydown', (event) => {
    const isCtrlZ = (event.ctrlKey || event.metaKey) && event.key === 'z';
    if (isCtrlZ) {
        event.preventDefault();
        undo();
    }
});

clearBtn.addEventListener('click', () => {
    if (shapes.length === 0) {
        return;
    }
    
    const userConfirmed = confirm('Are you sure you want to clear all shapes?');
    if (userConfirmed) {
        const allShapesOnCanvas = canvas.querySelectorAll('circle, rect, line');
        allShapesOnCanvas.forEach((shape) => {
            shape.remove();
        });
        shapes = [];
        updateShapeCount();
    }
});

function updateShapeCount() {
    shapeCount.textContent = shapes.length;
    
    if (shapes.length === 0) {
        undoBtn.disabled = true;
    } else {
        undoBtn.disabled = false;
    }
}

updateShapeCount();

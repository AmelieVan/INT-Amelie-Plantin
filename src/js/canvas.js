{
    const $canvas = document.querySelector('canvas');
    const context = $canvas.getContext('2d');

    let drawing = false;

    const init = () => {
        $canvas.width = 300;
        $canvas.height = 300;

        context.strokeStyle = '#000000';
        context.lineWidth = 6;

        $canvas.addEventListener('mousedown', mouseDraw);
        $canvas.addEventListener('mouseup', mouseDraw);
        $canvas.addEventListener('mousemove', mouseDraw);
        
    }

    const mouseDraw = (event) => {
        const mousePos = getMousePosition($canvas, event);
        const startDrawing = event.type === 'mousedown' && drawing === false;
        const continueDrawing = event.type === 'mousemove' && drawing === true;
        const stopDrawing = event.type == 'mouseup'

        if (startDrawing) {
            drawing = true;
            context.beginPath();
            context.moveTo(mousePos.x, mousePos.y);
        } else if (continueDrawing) {
            context.lineTo(mousePos.x, mousePos.y);
            context.stroke();
            context.lineCap = 'round'
        } else if (stopDrawing) {
            drawing = false;
            context.closePath();
        }
    }

    //returns the size of an element and its position relative to the viewport
    const getMousePosition = ($canvas, event) => {
        const rect = $canvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    init();
}
{
    const $canvas = document.querySelector('canvas');
    const context = $canvas.getContext('2d');
    // const restOfSite = document.querySelector('.site-content');

    let drawing = false;

    const init = () => {
        $canvas.width = 300;
        $canvas.height = 300;

        context.strokeStyle = '#000000';
        context.lineWidth = 6;

        const $colourPicker = document.querySelector('.colourpicker');
        $colourPicker.addEventListener('change', handleColourpicker);

        const $resetButton = document.querySelector('.reset');
        $resetButton.addEventListener('click', clearCanvas);

        $canvas.addEventListener('mousedown', mouseDraw);
        $canvas.addEventListener('mouseup', mouseDraw);
        $canvas.addEventListener('mousemove', mouseDraw);

        const $strokeChange = document.querySelector('.strokechange');
        $strokeChange.addEventListener('change', handleStrokeChange);

        // restOfSite.style.visibility = 'hidden';
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
            // restOfSite.style.visibility = 'visible';
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

    const handleColourpicker = (event) => {
        const colour = event.currentTarget.value;
        context.strokeStyle = colour;
    }

    const handleStrokeChange = (event) => {
        console.log('Stroke change event triggered'); // Log message
        const stroke = event.currentTarget.value;
        console.log('New stroke value:', stroke); // Log new value
        context.lineWidth = stroke;
    }

    const clearCanvas = () => {
        context.clearRect(0, 0, $canvas.width, $canvas.height);
    }
    init();
}
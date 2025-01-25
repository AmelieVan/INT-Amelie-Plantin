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

        $canvas.addEventListener('touchstart', touchDraw, { passive: false });
        $canvas.addEventListener('touchmove', touchDraw, { passive: false });
        $canvas.addEventListener('touchend', touchDraw);

        const $strokeChange = document.querySelector('.strokechange');
        $strokeChange.addEventListener('change', handleStrokeChange);

        // restOfSite.style.visibility = 'hidden';
    }

    const mouseDraw = (event) => {
        const mousePos = getMousePosition($canvas, event);
        handleDrawing(event.type, mousePos);
    };

    const touchDraw = (event) => {
        event.preventDefault(); 
        const touch = event.touches[0] || event.changedTouches[0];
        const touchPos = getTouchPosition($canvas, touch);
        handleDrawing(event.type, touchPos);
    };

    // Handle drawing logic
    const handleDrawing = (eventType, pos) => {
        const startDrawing = (eventType === 'mousedown' || eventType === 'touchstart') && !drawing;
        const continueDrawing = (eventType === 'mousemove' || eventType === 'touchmove') && drawing;
        const stopDrawing = eventType === 'mouseup' || eventType === 'touchend';

        if (startDrawing) {
            drawing = true;
            context.beginPath();
            context.moveTo(pos.x, pos.y);
        } else if (continueDrawing) {
            context.lineTo(pos.x, pos.y);
            context.stroke();
            context.lineCap = 'round';
        } else if (stopDrawing) {
            drawing = false;
            context.closePath();
        }
    };

    //returns the size of an element and its position relative to the viewport
    const getMousePosition = ($canvas, event) => {
        const rect = $canvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };

    }
    const getTouchPosition = ($canvas, touch) => {
        const rect = $canvas.getBoundingClientRect();
        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
        };
    };

    const handleColourpicker = (event) => {
        const colour = event.currentTarget.value;
        context.strokeStyle = colour;
    }

    const handleStrokeChange = (event) => {
        console.log('Stroke change event triggered');
        const stroke = event.currentTarget.value;
        console.log('New stroke value:', stroke);
        context.lineWidth = stroke;
    }

    const clearCanvas = () => {
        context.clearRect(0, 0, $canvas.width, $canvas.height);
    }
    init();
}
import React, { useEffect, useRef, useState } from 'react';
import './sketch-photo.css';

/**
 * The colour photo sits underneath; a canvas on top renders a pencil-sketch
 * version of it (grayscale + inverted-blur colour-dodge). Moving the pointer
 * over the canvas "erases" the sketch with a soft brush, revealing the
 * colour photo like a scratch card.
 */
function SketchPhoto({ src, alt }) {
    const wrapRef = useRef(null);
    const canvasRef = useRef(null);
    const strokes = useRef(0);
    const [hintGone, setHintGone] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return undefined;

        let cancelled = false;
        const img = new Image();
        img.src = src;
        img.onload = () => {
            if (cancelled) return;
            const rect = wrap.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(rect.width * dpr);
            canvas.height = Math.round(rect.height * dpr);
            const ctx = canvas.getContext('2d');

            // object-fit: cover crop
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const sw = canvas.width / scale;
            const sh = canvas.height / scale;
            const sx = (img.width - sw) / 2;
            const sy = (img.height - sh) / 2;

            ctx.filter = 'grayscale(1) contrast(1.05)';
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
            // classic pencil-sketch: colour-dodge an inverted blurred copy
            ctx.globalCompositeOperation = 'color-dodge';
            ctx.filter = 'grayscale(1) invert(1) blur(6px)';
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'source-over';
            ctx.filter = 'none';
        };

        return () => {
            cancelled = true;
        };
    }, [src]);

    const erase = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const scale = canvas.width / rect.width;
        const x = (e.clientX - rect.left) * scale;
        const y = (e.clientY - rect.top) * scale;
        const r = 38 * scale;

        const ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'destination-out';
        const brush = ctx.createRadialGradient(x, y, 0, x, y, r);
        brush.addColorStop(0, 'rgba(0,0,0,0.9)');
        brush.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = brush;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        strokes.current += 1;
        if (strokes.current > 8) setHintGone(true);
    };

    return (
        <div ref={wrapRef} className='sketch-photo'>
            <img src={src} alt={alt} className='hero-photo' draggable={false} />
            <canvas
                ref={canvasRef}
                className='sketch-canvas'
                onPointerMove={erase}
                onPointerDown={erase}
                aria-hidden='true'
            />
            <span className={`sketch-hint tag ${hintGone ? 'sketch-hint--gone' : ''}`}>
                ✏️ rub the sketch
            </span>
        </div>
    );
}

export default SketchPhoto;

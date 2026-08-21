import React, { useEffect, useRef, useState } from 'react';
import './sketch-photo.css';

/**
 * The sharp colour photo sits underneath; a canvas on top renders a
 * frosted (blurred, slightly desaturated) version of it. Moving the
 * pointer over the canvas "wipes the frost" with a soft brush, revealing
 * the sharp photo like a fogged-up window.
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

            // frosted overlay: blurred + slightly desaturated. Overscan the
            // draw so the blur doesn't leave transparent fringes at the edges.
            const pad = 24 * dpr;
            ctx.filter = 'blur(6px) saturate(0.78)';
            ctx.drawImage(
                img, sx, sy, sw, sh,
                -pad, -pad, canvas.width + pad * 2, canvas.height + pad * 2
            );
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
                ✨ rub to reveal
            </span>
        </div>
    );
}

export default SketchPhoto;

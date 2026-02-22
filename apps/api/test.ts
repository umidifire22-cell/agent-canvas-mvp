import { renderImageDirect } from './src/core/render-direct';

(async () => {
    try {
        const out = await renderImageDirect("Test Title", "Test Subtitle", 1080, 1080, { primary: "#2997FF", secondary: "#fff", background: "#000" });
        console.log("SUCCESS:", out);
    } catch (e) {
        console.error("FAIL:", e);
    }
})();

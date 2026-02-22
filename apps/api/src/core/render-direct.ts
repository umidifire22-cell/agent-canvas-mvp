import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

// Preload fonts for satori
const interRegularPath = path.join(process.cwd(), 'src', 'assets', 'Inter-Regular.ttf');
const interBoldPath = path.join(process.cwd(), 'src', 'assets', 'Inter-Bold.ttf');

let interRegularBuffer: Buffer | ArrayBuffer | null = null;
let interBoldBuffer: Buffer | ArrayBuffer | null = null;

const loadFonts = async () => {
    if (!interRegularBuffer) {
        interRegularBuffer = fs.readFileSync(interRegularPath);
        interBoldBuffer = fs.readFileSync(interBoldPath);
    }
}

export const renderImageDirect = async (
    title: string,
    subtitle: string,
    width: number,
    height: number,
    colors: any,
    customMarkup?: string,
    dynamicVariables?: Record<string, string>
) => {
    await loadFonts();

    let rawMarkup = customMarkup;

    let isJson = false;
    let parsedElements: any[] = [];
    try {
        if (customMarkup && customMarkup.trim().startsWith('[')) {
            parsedElements = JSON.parse(customMarkup);
            isJson = true;
        }
    } catch (e) {
        console.error("Failed to parse customMarkup as JSON");
    }

    if (isJson) {
        rawMarkup = `<div style="display: flex; position: relative; width: ${width}px; height: ${height}px; background-color: ${colors?.background || '#030303'}; overflow: hidden;">`;
        for (const el of parsedElements) {
            if (el.type === 'image' && el.url) {
                rawMarkup += `<img src="${el.url}" style="position: absolute; left: ${Math.round(el.x)}px; top: ${Math.round(el.y)}px; width: ${Math.round(el.width || 1080)}px; height: ${Math.round(el.height || 1080)}px; object-fit: cover; display: flex;" />`;
            } else if (el.type === 'text') {
                let textContent = el.content || '';
                if (el.isVariable && dynamicVariables && el.variableName) {
                    // Look up variable in dynamicVariables
                    if (dynamicVariables[el.variableName]) {
                        textContent = dynamicVariables[el.variableName];
                    } else if (el.variableName.toLowerCase().includes('title')) {
                        textContent = title;
                    } else if (el.variableName.toLowerCase().includes('subtitle')) {
                        textContent = subtitle;
                    } else if (el.variableName.toLowerCase().includes('topic')) {
                        textContent = title;
                    }
                } else if (el.isVariable) {
                    if (el.variableName?.toLowerCase().includes('title')) textContent = title;
                    else if (el.variableName?.toLowerCase().includes('subtitle')) textContent = subtitle;
                    else if (el.variableName?.toLowerCase().includes('topic')) textContent = title;
                }
                rawMarkup += `<div style="display: flex; position: absolute; left: ${Math.round(el.x)}px; top: ${Math.round(el.y)}px; color: ${el.color || '#FFF'}; font-size: ${el.fontSize || 60}px; font-weight: 800; font-family: Inter; white-space: nowrap;">${textContent}</div>`;
            }
        }
        rawMarkup += `</div>`;
    } else {
        if (!rawMarkup) {
            rawMarkup = `
            <div style="display: flex; flex-direction: column; width: 100%; height: 100%; background-color: {{BACKGROUND_COLOR}}; padding: 60px; justify-content: center; align-items: center; color: {{SECONDARY_COLOR}};">
                
                <!-- Glow background -->
                <div style="display: flex; position: absolute; top: 0; left: 0; width: 100%; height: 100%; justify-content: center; align-items: center;">
                    <div style="display: flex; width: 80%; height: 80%; background: {{PRIMARY_COLOR}}; opacity: 0.3; border-radius: 50%;"></div>
                </div>

                <div style="display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 80%;">
                    <h1 style="font-size: 80px; font-weight: 800; color: {{PRIMARY_COLOR}}; margin: 0 0 20px 0; line-height: 1.1;">
                        {{TITLE}}
                    </h1>
                    
                    {{SUBTITLE_BLOCK}}

                    <div style="display: flex; margin-top: 60px; background-color: {{PRIMARY_COLOR}}; color: {{BACKGROUND_COLOR}}; padding: 20px 60px; border-radius: 20px; font-size: 36px; font-weight: bold;">
                        Explore Now
                    </div>
                </div>
                
                <div style="display: flex; position: absolute; bottom: 40px; right: 40px; align-items: center; font-size: 24px; font-weight: bold; opacity: 0.5;">
                    <span style="display: flex; color: {{PRIMARY_COLOR}}; margin-right: 10px;">★</span>
                    AgentCanvas
                </div>
            </div>
            `;
        }

        const subtitleBlock = subtitle ? `
        <h2 style="font-size: 40px; font-weight: 600; opacity: 0.8; margin: 0 0 40px 0;">
            ${subtitle}
        </h2>
        ` : '';

        rawMarkup = rawMarkup
            .replace(/\{\{TITLE\}\}/g, title)
            .replace(/\{\{SUBTITLE\}\}/g, subtitle || '')
            .replace(/\{\{SUBTITLE_BLOCK\}\}/g, subtitleBlock)
            .replace(/\{\{PRIMARY_COLOR\}\}/g, colors?.primary || '#2997FF')
            .replace(/\{\{SECONDARY_COLOR\}\}/g, colors?.secondary || '#ffffff')
            .replace(/\{\{BACKGROUND_COLOR\}\}/g, colors?.background || '#030303')
            .replace(/\{\{ACCENT_COLOR\}\}/g, colors?.accent || '#FF9F0A');
    }

    // satori-html can parse a string directly
    // @ts-ignore
    const markup = html([rawMarkup]);

    const svg = await satori(markup as any, {
        width,
        height,
        fonts: [
            {
                name: 'Inter',
                data: interRegularBuffer!,
                weight: 400,
                style: 'normal',
            },
            {
                name: 'Inter',
                data: interBoldBuffer!,
                weight: 800,
                style: 'normal',
            },
        ],
    });

    const resvg = new Resvg(svg, {
        background: 'rgba(0,0,0,1)',
        fitTo: { mode: 'width', value: width }
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    // Ensure outputs directory exists in the Next.js app
    const outputDir = path.join(process.cwd(), '..', 'web', 'public', 'outputs');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const filename = `render-${Date.now()}.png`;
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, pngBuffer);

    return `/outputs/${filename}`;
};

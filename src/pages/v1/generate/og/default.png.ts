import type { ResvgRenderOptions } from '@resvg/resvg-js';

export const prerender = true;
import type { APIRoute } from 'astro';
import satori from 'satori';
import { html as toReactElement } from 'satori-html';
import { readFileSync } from 'fs';
import path from 'path';

// Load local Poppins font from public/fonts
const fontPath = path.join(process.cwd(), 'public/fonts/poppins.ttf');
const fontDataPoppins = readFileSync(fontPath);

const height = 630;
const width = 1200;

export const GET: APIRoute = async () => {
  const link = 'storyofstrategy.com';
  
  const html = toReactElement(`
  <div style="background-color: #fff3e6; display: flex; flex-direction: row; justify-content: space-between; align-items: center; height: 100%; width: 100%; padding: 45px; position: relative; font-family: Poppins;">
    
    <!-- Blueprint grid markings (top left, top right, bottom left, bottom right) -->
    <span style="position: absolute; top: 15px; left: 20px; font-size: 24px; font-weight: 700; color: #1f1720; opacity: 0.35;">+</span>
    <span style="position: absolute; top: 15px; right: 20px; font-size: 24px; font-weight: 700; color: #1f1720; opacity: 0.35;">+</span>
    <span style="position: absolute; bottom: 15px; left: 20px; font-size: 24px; font-weight: 700; color: #1f1720; opacity: 0.35;">+</span>
    <span style="position: absolute; bottom: 15px; right: 20px; font-size: 24px; font-weight: 700; color: #1f1720; opacity: 0.35;">+</span>

    <div style="display: flex; flex-direction: column; justify-content: space-between; width: 55%; height: 100%; padding: 15px 0;">
      
      <div style="display: flex; flex-direction: column; align-items: flex-start; width: 100%;">
        <div style="display: flex; background-color: #00ff88; border: 3px solid #1f1720; box-shadow: 4px 4px 0px 0px #1f1720; padding: 6px 16px; margin-bottom: 30px; border-radius: 4px; font-size: 16px; font-weight: 700; color: #1f1720; text-transform: uppercase; letter-spacing: 2px;">
          Think -> Build
        </div>
        
        <div style="display: flex; flex-direction: column; font-size: 56px; font-weight: 700; color: #20141a; letter-spacing: -1.5px; line-height: 68px; margin-bottom: 24px; width: 100%;">
          Story of Strategy
        </div>
        
        <div style="display: flex; flex-direction: column; font-size: 28px; font-weight: 400; color: #5a494f; line-height: 40px; width: 100%;">
          Product teardowns, automations, and interactive prototypes.
        </div>
      </div>
      
      <!-- Left Column Footer -->
      <div style="display: flex; flex-direction: row; align-items: center; gap: 20px;">
        <!-- By Tag -->
        <div style="display: flex; align-items: center; font-size: 24px; font-weight: 700; color: #20141a;">
          By Punith
          <!-- Neon Green status dot -->
          <div style="display: flex; width: 10px; height: 10px; border-radius: 50%; background-color: #00ff88; border: 2px solid #1f1720; margin-left: 12px; margin-top: 4px;"></div>
        </div>
        
        <!-- Divider -->
        <div style="display: flex; width: 2px; height: 24px; background-color: rgba(31, 23, 32, 0.15);"></div>
        
        <!-- URL link badge -->
        <div style="display: flex; background-color: rgba(255, 102, 65, 0.08); border: 2px solid rgba(255, 102, 65, 0.2); padding: 4px 12px; border-radius: 4px; font-size: 20px; font-weight: 700; color: #ff6641; letter-spacing: 0.5px;">
          ${link}
        </div>
      </div>

    </div>

    <!-- RIGHT SIDE: Stylized Neobrutalist Terminal Code Window -->
    <div style="display: flex; flex-direction: column; width: 40%; height: 100%; background-color: #fffaf4; border: 4px solid #1f1720; box-shadow: 12px 12px 0px 0px #1f1720; border-radius: 8px; overflow: hidden;">
      
      <!-- Terminal Header -->
      <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 12px 18px; background-color: #f5ff85; border-bottom: 4px solid #1f1720; width: 100%;">
        <!-- Mac control window dots -->
        <div style="display: flex; flex-direction: row; gap: 8px;">
          <div style="display: flex; width: 14px; height: 14px; border-radius: 50%; background-color: #ff5f56; border: 2px solid #1f1720;"></div>
          <div style="display: flex; width: 14px; height: 14px; border-radius: 50%; background-color: #ffbd2e; border: 2px solid #1f1720;"></div>
          <div style="display: flex; width: 14px; height: 14px; border-radius: 50%; background-color: #27c93f; border: 2px solid #1f1720;"></div>
        </div>
        
        <span style="font-size: 14px; font-weight: 700; color: #1f1720;">
          hermes.log
        </span>
      </div>

      <!-- Terminal Body Content -->
      <div style="display: flex; flex-direction: column; background-color: #1f1720; padding: 25px; height: 100%; justify-content: flex-start; align-items: flex-start; width: 100%;">
        
        <!-- Command Prompt Line -->
        <div style="display: flex; margin-bottom: 14px; width: 100%;">
          <span style="color: #00ff88; font-size: 16px; font-weight: 700;">> </span>
          <span style="color: #fffdf8; font-size: 16px; margin-left: 8px; font-weight: 700;">hermes --run-radar</span>
        </div>

        <!-- Terminal log outputs -->
        <div style="display: flex; margin-bottom: 12px; width: 100%;">
          <span style="color: #ff6641; font-size: 14px; font-weight: 700;">[sync] </span>
          <span style="color: #9ca3af; font-size: 14px; margin-left: 6px;">fetching signals...</span>
        </div>
        
        <div style="display: flex; margin-bottom: 12px; align-items: center; width: 100%;">
          <div style="display: flex; width: 6px; height: 6px; border-radius: 50%; background-color: #ffd049; margin-right: 8px;"></div>
          <span style="color: #fffdf8; font-size: 14px;">Loaded Newsletter Brief</span>
        </div>

        <div style="display: flex; margin-bottom: 12px; align-items: center; width: 100%;">
          <div style="display: flex; width: 6px; height: 6px; border-radius: 50%; background-color: #3cb7b8; margin-right: 8px;"></div>
          <span style="color: #fffdf8; font-size: 14px;">Synced Reddit Radar</span>
        </div>

        <div style="display: flex; margin-bottom: 12px; align-items: center; width: 100%;">
          <div style="display: flex; width: 6px; height: 6px; border-radius: 50%; background-color: #00ff88; margin-right: 8px;"></div>
          <span style="color: #fffdf8; font-size: 14px;">Generated Insight OS</span>
        </div>

        <!-- Cursor blink simulator -->
        <div style="display: flex; margin-top: auto; padding-top: 15px; width: 100%; align-items: center;">
          <span style="color: #00ff88; font-size: 16px; font-weight: 700;">$ </span>
          <div style="display: flex; width: 10px; height: 18px; background-color: #00ff88; margin-left: 8px; opacity: 0.85;"></div>
        </div>

      </div>

    </div>

  </div>
  `);

  const svg = await satori(html, {
    fonts: [
      {
        name: 'Poppins',
        data: fontDataPoppins,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Poppins',
        data: fontDataPoppins,
        weight: 700,
        style: 'normal',
      },
    ],
    height,
    width,
  });

  const opts: ResvgRenderOptions = {
    fitTo: {
      mode: 'width',
      value: width,
    },
  };

  const { Resvg } = await import('@resvg/resvg-js');
  const resvg = new Resvg(svg, opts);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
    headers: {
      'content-type': 'image/png',
    },
  });
};

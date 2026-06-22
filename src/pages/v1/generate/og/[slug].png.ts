import type { ResvgRenderOptions } from '@resvg/resvg-js';

export const prerender = true;
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { html as toReactElement } from 'satori-html';
import { readFileSync } from 'fs';
import path from 'path';

// Load local Poppins font from public/fonts
const fontPath = path.join(process.cwd(), 'public/fonts/poppins.ttf');
const fontDataPoppins = readFileSync(fontPath);

const height = 630;
const width = 1200;

const posts = await getCollection('blog');

export function getStaticPaths() {
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, description: post.data.description },
  }));
}

export const GET: APIRoute = async ({ params, props }) => {
  const link = 'storyofstrategy.com';
  
  const title = props.title.trim() ?? 'Blogpost';
  const description = props.description ?? null;
  const html = toReactElement(`
  <div style="background-color: #fff3e6; display: flex; flex-direction: row; justify-content: space-between; align-items: center; height: 100%; width: 100%; padding: 45px; position: relative; font-family: Poppins;">
    
    <!-- Blueprint grid markings -->
    <span style="position: absolute; top: 15px; left: 20px; font-size: 24px; font-weight: 700; color: #1f1720; opacity: 0.35;">+</span>
    <span style="position: absolute; top: 15px; right: 20px; font-size: 24px; font-weight: 700; color: #1f1720; opacity: 0.35;">+</span>
    <span style="position: absolute; bottom: 15px; left: 20px; font-size: 24px; font-weight: 700; color: #1f1720; opacity: 0.35;">+</span>
    <span style="position: absolute; bottom: 15px; right: 20px; font-size: 24px; font-weight: 700; color: #1f1720; opacity: 0.35;">+</span>

    <div style="display: flex; flex-direction: column; justify-content: space-between; width: 55%; height: 100%; padding: 15px 0;">
      
      <div style="display: flex; flex-direction: column; align-items: flex-start; width: 100%;">
        <div style="display: flex; background-color: #00ff88; border: 3px solid #1f1720; box-shadow: 4px 4px 0px 0px #1f1720; padding: 6px 16px; margin-bottom: 24px; border-radius: 4px; font-size: 16px; font-weight: 700; color: #1f1720; text-transform: uppercase; letter-spacing: 2px;">
          Product Teardown
        </div>
        
        <div style="display: flex; flex-direction: column; font-size: 42px; font-weight: 700; color: #20141a; letter-spacing: -1.2px; line-height: 52px; margin-bottom: 20px; width: 100%;">
          ${title}
        </div>
        
        ${description ? `
        <div style="display: flex; flex-direction: column; font-size: 24px; font-weight: 400; color: #5a494f; line-height: 34px; width: 100%;">
          ${description}
        </div>
        ` : ''}
      </div>
      
      <!-- Left Footer -->
      <div style="display: flex; flex-direction: row; align-items: center; gap: 20px;">
        <div style="display: flex; align-items: center; font-size: 24px; font-weight: 700; color: #20141a;">
          By Punith
          <div style="display: flex; width: 10px; height: 10px; border-radius: 50%; background-color: #00ff88; border: 2px solid #1f1720; margin-left: 12px; margin-top: 4px;"></div>
        </div>
        
        <div style="display: flex; width: 2px; height: 24px; background-color: rgba(31, 23, 32, 0.15);"></div>
        
        <div style="display: flex; background-color: rgba(255, 102, 65, 0.08); border: 2px solid rgba(255, 102, 65, 0.2); padding: 4px 12px; border-radius: 4px; font-size: 20px; font-weight: 700; color: #ff6641; letter-spacing: 0.5px;">
          ${link}
        </div>
      </div>

    </div>

    <!-- RIGHT SIDE: Browser Mockup Card -->
    <div style="display: flex; flex-direction: column; width: 40%; height: 100%; background-color: #fffaf4; border: 4px solid #1f1720; box-shadow: 12px 12px 0px 0px #1f1720; border-radius: 8px; overflow: hidden;">
      
      <!-- Card header -->
      <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 12px 18px; background-color: #ffd049; border-bottom: 4px solid #1f1720; width: 100%;">
        <div style="display: flex; flex-direction: row; gap: 8px;">
          <div style="display: flex; width: 14px; height: 14px; border-radius: 50%; background-color: #ff5f56; border: 2px solid #1f1720;"></div>
          <div style="display: flex; width: 14px; height: 14px; border-radius: 50%; background-color: #ffbd2e; border: 2px solid #1f1720;"></div>
          <div style="display: flex; width: 14px; height: 14px; border-radius: 50%; background-color: #27c93f; border: 2px solid #1f1720;"></div>
        </div>
        
        <span style="font-size: 14px; font-weight: 700; color: #1f1720;">
          preview.spec
        </span>
      </div>

      <!-- Card Body representing a mock interactive content card -->
      <div style="display: flex; flex-direction: column; background-color: #fffaf4; padding: 25px; height: 100%; justify-content: center; align-items: center; position: relative; width: 100%;">
        <!-- Neon Green badge inside mockup -->
        <div style="display: flex; background-color: #00ff88; border: 2px solid #1f1720; box-shadow: 3px 3px 0px 0px #1f1720; padding: 6px 12px; margin-bottom: 20px;">
          <span style="font-size: 16px; font-weight: 700; color: #1f1720; text-transform: uppercase;">
            Interactive PRD
          </span>
        </div>
        
        <!-- Mock card wireframe line 1 -->
        <div style="display: flex; width: 80%; height: 16px; background-color: #1f1720; border-radius: 2px; margin-bottom: 12px;"></div>
        <!-- Mock card wireframe line 2 -->
        <div style="display: flex; width: 90%; height: 16px; background-color: #5a494f; border-radius: 2px; margin-bottom: 12px;"></div>
        <!-- Mock card wireframe line 3 -->
        <div style="display: flex; width: 60%; height: 16px; background-color: #ff6641; border-radius: 2px; margin-bottom: 30px;"></div>
        
        <!-- Live status pill -->
        <div style="display: flex; background-color: #2b3ff7; border: 2px solid #1f1720; padding: 6px 20px; border-radius: 20px; box-shadow: 3px 3px 0px 0px #1f1720;">
          <span style="font-size: 16px; font-weight: 700; color: white;">
            Live Prototype
          </span>
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

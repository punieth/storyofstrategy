import type { ResvgRenderOptions } from '@resvg/resvg-js';

export const prerender = true;
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { html as toReactElement } from 'satori-html';

const fontFile = await fetch(
  'https://og-playground.vercel.app/inter-latin-ext-700-normal.woff'
);
const fontData: ArrayBuffer = await fontFile.arrayBuffer();

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
  <div style="background-color: #f5ff85; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; width: 100%; padding: 40px;">
    <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; width: 100%; background-color: white; border: 6px solid black; box-shadow: 12px 12px 0px 0px #000000; padding: 50px;">
      
      <!-- Top section -->
      <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <!-- Tag / Badge -->
        <div style="display: flex; background-color: #00ff88; border: 3px solid black; box-shadow: 4px 4px 0px 0px #000000; padding: 6px 16px; margin-bottom: 30px;">
          <span style="font-size: 20px; font-weight: 900; color: black; text-transform: uppercase; letter-spacing: 2px;">
            Story of Strategy
          </span>
        </div>
        
        <!-- Title -->
        <div style="display: flex; margin-bottom: 24px;">
          <span style="font-size: 64px; font-weight: 800; color: black; line-height: 1.2;">
            ${title}
          </span>
        </div>
        
        <!-- Description -->
        ${description ? `
        <div style="display: flex;">
          <span style="font-size: 28px; font-weight: 500; color: #4b5563; line-height: 1.4;">
            ${description}
          </span>
        </div>
        ` : ''}
      </div>
      
      <!-- Bottom section / Footer -->
      <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; border-top: 3px solid #e5e7eb; padding-top: 30px; margin-top: auto;">
        <div style="display: flex; align-items: center;">
          <span style="font-size: 28px; font-weight: 700; color: black;">
            By Punith
          </span>
        </div>
        <div style="display: flex; align-items: center;">
          <span style="font-size: 24px; font-weight: 600; color: #9ca3af; letter-spacing: 0.5px;">
            ${link}
          </span>
        </div>
      </div>

    </div>
  </div>
  `);

  const svg = await satori(html, {
    fonts: [
      {
        name: 'Inter Latin',
        data: fontData,
        style: 'normal',
      },
    ],
    height,
    width,
  });

  const opts: ResvgRenderOptions = {
    fitTo: {
      mode: 'width', // If you need to change the size
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

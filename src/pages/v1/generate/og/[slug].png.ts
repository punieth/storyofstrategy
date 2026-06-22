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
  <div style="background-color: #fff3e6; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; width: 100%; padding: 45px;">
    <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; width: 100%; background-color: #fffaf4; border: 6px solid #1f1720; box-shadow: 14px 14px 0px 0px #1f1720; padding: 55px; border-radius: 4px;">
      
      <!-- Top section -->
      <div style="display: flex; flex-direction: column; align-items: flex-start; width: 100%;">
        <!-- Tag / Badge -->
        <div style="display: flex; background-color: #00ff88; border: 3px solid #1f1720; box-shadow: 4px 4px 0px 0px #1f1720; padding: 6px 18px; margin-bottom: 35px;">
          <span style="font-size: 18px; font-weight: 900; color: #1f1720; text-transform: uppercase; letter-spacing: 2px;">
            Story of Strategy
          </span>
        </div>
        
        <!-- Title -->
        <div style="display: flex; margin-bottom: 24px; width: 100%;">
          <span style="font-size: 64px; font-weight: 900; color: #20141a; letter-spacing: -1.5px; line-height: 1.2;">
            ${title}
          </span>
        </div>
        
        <!-- Description -->
        ${description ? `
        <div style="display: flex; width: 100%;">
          <span style="font-size: 28px; font-weight: 500; color: #5a494f; line-height: 1.45; max-width: 90%;">
            ${description}
          </span>
        </div>
        ` : ''}
      </div>
      
      <!-- Bottom section / Footer -->
      <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; border-top: 3px solid rgba(31, 23, 32, 0.1); padding-top: 35px; margin-top: auto; width: 100%;">
        <div style="display: flex; align-items: center;">
          <span style="font-size: 28px; font-weight: 800; color: #20141a;">
            By Punith
          </span>
        </div>
        <div style="display: flex; align-items: center;">
          <span style="font-size: 26px; font-weight: 800; color: #ff6641; letter-spacing: 0.5px;">
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

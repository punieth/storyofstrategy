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

export const GET: APIRoute = async ({ params, props, request }) => {
  const url = new URL(request.url);
  const link = url.hostname === 'localhost' || url.hostname === '127.0.0.1' ? 'storyofstrategy.co' : url.hostname;
  
  const title = props.title.trim() ?? 'Blogpost';
  const description = props.description ?? null;
  const html = toReactElement(`
  <div style="background-color: #f5ff85; display: flex; flex-direction: column; height: 100%; padding: 3rem; width: 100%">
    <div style="display:flex; height: 100%; width: 100%; background-color: white; border: 6px solid black; border-radius: 0.5rem; padding: 2.5rem; filter: drop-shadow(8px 8px 0 rgb(0 0 0 / 1));">
      <div style="display: flex; flex-direction: column; justify-content: space-between; width: 100%;">
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <span style="display: flex; align-self: flex-start; align-items: center; padding: 0.25rem 0.75rem; font-size: 20px; font-weight: 900; background-color: #00ff88; border: 3px solid black; filter: drop-shadow(3px 3px 0 rgb(0 0 0 / 1)); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 1rem;">
            Story of Strategy
          </span>
          <p style="font-size: 56px; font-weight: bold; margin: 0; padding: 0; color: black; line-height: 1.2;">${title}</p>
          ${description ? `<p style="font-size: 28px; color: #444; margin: 0; padding: 0; margin-top: 0.5rem;">${description}</p>` : ''}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <p style="font-size: 28px; font-weight: bold; color: black; margin: 0;">By Punith</p>
          <p style="font-size: 24px; color: #666; margin: 0;">${link}</p>
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

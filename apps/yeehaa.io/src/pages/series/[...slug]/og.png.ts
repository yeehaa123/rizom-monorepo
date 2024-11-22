import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import sharp from "sharp";
import fs from 'fs';
import path from 'path'


async function base64_encode(imageResult: string) {
  var bitmap = fs.readFileSync(process.env.NODE_ENV === 'development'
    ? path.resolve(
      imageResult.replace(/\?.*/, '').replace('/@fs', ''),
    )
    : path.resolve(imageResult.replace('/', 'dist/server/')))
  const postCover = await sharp(
    bitmap
  ).resize(1200).toBuffer()
  return postCover;
}

export async function getStaticPaths() {
  const seriesEntries = await getCollection('Series');
  const promises = seriesEntries.map(async entry => {
    const imageData = entry.data.bannerImageURL;
    const image = await base64_encode(imageData.src);
    return {
      params: { slug: entry.id }, props: { image },
    }

  });
  return await Promise.all(promises);
}

export const GET: APIRoute = async function get({ props }) {
  const image = await props.image;
  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};

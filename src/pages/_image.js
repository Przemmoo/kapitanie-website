import { getImage } from '@astrojs/image/server';

export async function GET({ request }) {
  return getImage({ request });
}

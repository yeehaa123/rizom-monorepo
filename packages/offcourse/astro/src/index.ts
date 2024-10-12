import type { AstroIntegration } from 'astro';

export default function offcourse(): AstroIntegration {
  return {
    name: "@offcourse/server",
    hooks: {
      'astro:config:setup': async ({ injectRoute }) => {
        injectRoute({
          pattern: '/offcourse/query',
          entrypoint: '@offcourse/astro/query.json.ts'
        });
        injectRoute({
          pattern: '/offcourse/command',
          entrypoint: '@offcourse/astro/command.json.ts'
        });
        injectRoute({
          pattern: '/offcourse/handshake',
          entrypoint: '@offcourse/astro/handshake.json.ts',
        });
        injectRoute({
          pattern: '/offcourse/callback',
          entrypoint: '@offcourse/astro/callback.json.ts',
        });
        injectRoute({
          pattern: '/offcourse/register',
          entrypoint: '@offcourse/astro/register.json.ts',
        });
      }
    }
  }
}

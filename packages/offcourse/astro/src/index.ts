import type { AstroIntegration } from 'astro';

export default function offcourse(): AstroIntegration {
  return {
    name: "@offcourse/server",
    hooks: {
      'astro:config:setup': async ({ injectRoute }) => {
        injectRoute({
          pattern: '/offcourse/query.json',
          entrypoint: '@offcourse/astro/query.json.ts'
        });
        injectRoute({
          pattern: '/offcourse/command.json',
          entrypoint: '@offcourse/astro/command.json.ts'
        });
      }
    }
  }
}

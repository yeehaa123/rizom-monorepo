import type { AstroIntegration } from 'astro';

export default function offcourse(): AstroIntegration {
  return {
    name: "@offcourse/server",
    hooks: {
      'astro:config:setup': async ({ injectRoute }) => {
        const baseRoute = "/offcourse";
        const packageName = "@offcourse/astro"
        injectRoute({
          pattern: `${baseRoute}/query`,
          entrypoint: `${packageName}/query.json.ts`
        });
        injectRoute({
          pattern: `${baseRoute}/command`,
          entrypoint: `${packageName}/command.json.ts`
        });
        injectRoute({
          pattern: `${baseRoute}/handshake`,
          entrypoint: `${packageName}/handshake.json.ts`
        });
        injectRoute({
          pattern: `${baseRoute}/callback`,
          entrypoint: `${packageName}/callback.json.ts`
        });
        injectRoute({
          pattern: `${baseRoute}/register`,
          entrypoint: `${packageName}/register.json.ts`
        });
        injectRoute({
          pattern: `${baseRoute}/[courseId]`,
          entrypoint: `${packageName}/course.astro`
        });
        injectRoute({
          pattern: `${baseRoute}/[courseId]/og.png`,
          entrypoint: `${packageName}/og.png.ts`
        });
      }
    }
  }
}

import type { APIContext } from "astro";
import { CollectionType, QueryType } from "@offcourse/schema";
import { handleQuery } from "@offcourse/db/query";

export async function getStaticPaths() {
  const data = await handleQuery({
    type: QueryType.enum.RENDER_COURSE_IMAGES,
    payload: CollectionType.enum.ALL
  }, false)
  const courses = (data?.payload || []) as { courseId: string, png: Buffer }[];
  const promises = courses.map(({ courseId, png }) => {
    return {
      params: { courseId },
      props: {
        courseId,
        png
      }
    }
  })
  return await Promise.all(promises);
}

export async function GET({ props }: APIContext) {
  const { png } = props;
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
}

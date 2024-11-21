import type { APIContext } from "astro";
import type { Course } from "@offcourse/schema";
import { CollectionType, QueryType } from "@offcourse/schema";
import { handleQuery } from "@offcourse/db/query";

export async function getStaticPaths() {
  const data = await handleQuery({
    type: QueryType.enum.GET_COURSES,
    payload: CollectionType.enum.ALL
  }, false)
  const courses = (data?.payload || []) as Course[];
  const promises = courses.map(async (course) => {
    const data = await handleQuery({
      type: QueryType.enum.RENDER_COURSE_IMAGE,
      payload: { course }
    }, false)
    const png = data.payload
    const { courseId } = course;
    return {
      params: { courseId },
      props: {
        png
      }
    }
  })
  return await Promise.all(promises);
}

export async function GET({ props }: APIContext) {
  const { png } = props;
  // @ts-ignore
  console.log(png);
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
}

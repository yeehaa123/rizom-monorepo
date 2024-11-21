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
  return courses.map((course) => {
    const { courseId } = course;
    return {
      params: { courseId },
      props: {
        course
      }
    }
  })
}

export async function GET({ props }: APIContext) {
  const { course } = props;
  const data = await handleQuery({
    type: QueryType.enum.RENDER_COURSE_IMAGE,
    payload: { course }
  }, false)
  const png = data.payload
  // @ts-ignore
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
}

import type { APIContext } from "astro";
import { readFile } from "fs/promises";
import path from "path";
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
    const thin = await readFile(path.join(process.cwd(), "/public/fonts/GT-Ultra-Standard-Thin.otf"));
    const light = await readFile(path.join(process.cwd(), "/public/fonts/GT-Ultra-Standard-Light.otf"));
    const regular = await readFile(path.join(process.cwd(), "/public/fonts/GT-Ultra-Standard-Regular.otf"));
    const bold = await readFile(path.join(process.cwd(), "/public/fonts/GT-Ultra-Standard-Bold.otf"));
    const fonts = [
      {
        name: "GT Ultra Standard",
        data: thin,
        weight: 200,
      },
      {
        name: "GT Ultra Standard",
        data: light,
        weight: 300,
      },
      {
        name: "GT Ultra Standard",
        data: regular,
        weight: 500,
      },
      {
        name: "GT Ultra Standard",
        data: bold,
        weight: 700,
      }
    ];
    const data = await handleQuery({
      type: QueryType.enum.RENDER_COURSE_IMAGE,
      payload: { course, fonts }
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
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
}

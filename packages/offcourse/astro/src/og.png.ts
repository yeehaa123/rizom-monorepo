import type { APIContext } from "astro";
import { readFile } from "fs/promises";
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
  const thin = await readFile("./public/fonts/GT-Ultra-Standard-Thin.otf");
  const light = await readFile("./public/fonts/GT-Ultra-Standard-Light.otf");
  const regular = await readFile("./public/fonts/GT-Ultra-Standard-Regular.otf");
  const bold = await readFile("./public/fonts/GT-Ultra-Standard-Bold.otf");
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
  // @ts-ignore
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
}

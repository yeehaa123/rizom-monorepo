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
  const folderURL = "https://yeehaa.io/fonts";
  const thin = await fetch(`${folderURL}/GT-Ultra-Standard-Thin.otf`);
  const light = await fetch(`${folderURL}/GT-Ultra-Standard-Light.otf`);
  const regular = await fetch(`${folderURL}/GT-Ultra-Standard-Regular.otf`);
  const bold = await fetch(`${folderURL}/GT-Ultra-Standard-Bold.otf`);
  const fonts = [
    {
      name: "GT Ultra Standard",
      data: await thin.arrayBuffer(),
      weight: 200,
    },
    {
      name: "GT Ultra Standard",
      data: await light.arrayBuffer(),
      weight: 300,
    },
    {
      name: "GT Ultra Standard",
      data: await regular.arrayBuffer(),
      weight: 500,
    },
    {
      name: "GT Ultra Standard",
      data: await bold.arrayBuffer(),
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

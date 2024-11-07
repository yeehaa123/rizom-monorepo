import type { APIContext } from "astro";
import fs from "fs";
import { generateOG } from "@/components/OG";
import { CollectionType, QueryType, type Course } from "@offcourse/schema";
import { handleQuery } from "@offcourse/db/query";

export async function getStaticPaths() {
  const data = await handleQuery({
    type: QueryType.enum.GET_COURSES,
    payload: CollectionType.enum.ALL
  }, false)
  const courses = (data?.payload || []) as Course[];
  const fonts = [
    {
      name: "GT Ultra Standard",
      data: fs.readFileSync("./public/fonts/GT-Ultra-Standard-Thin-Trial.otf"),
      weight: 200,
    },
    {
      name: "GT Ultra Standard",
      data: fs.readFileSync("./public/fonts/GT-Ultra-Standard-Light-Trial.otf"),
      weight: 300,
    },
    {
      name: "GT Ultra Standard",
      data: fs.readFileSync("./public/fonts/GT-Ultra-Standard-Regular-Trial.otf"),
      weight: 500,
    },
    {
      name: "GT Ultra Standard",
      data: fs.readFileSync("./public/fonts/GT-Ultra-Standard-Bold-Trial.otf"),
      weight: 700,
    }
  ];
  return courses.map((course) => {
    const { courseId } = course;
    return {
      params: { courseId },
      props: {
        course,
        fonts
      }
    }
  })
}

export async function GET({ props }: APIContext) {
  return generateOG(props);
}

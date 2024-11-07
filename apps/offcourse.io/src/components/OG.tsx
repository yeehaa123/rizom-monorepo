import { ImageResponse } from "@vercel/og";
import { Logo } from "@offcourse/ui/components"
import type { Course } from "@offcourse/schema";

const OG = ({ goal, curator, description, tags }: Course) => {
  return <div style={{ display: "flex" }}>
    <div tw="flex flex-col w-[360px] bg-white">
      <div tw="flex flex-col h-full justify-between p-6">
      <div tw="flex flex-col space-y-1.5 ">
        <h3
          tw={"text-2xl font-bold leading-none tracking-tight"} >
          {goal}
        </h3>
        <div tw="capitalize">
          {curator.alias}
        </div>
        <p tw="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
        <div style={{ gap: 1 }} tw="flex flex-wrap gap-1">
          {tags.map(tag =>
            <div tw="flex text-xs border px-2.5 py-0.5 border-1 items-center border-gray-100">
              <div>
                {tag}
              </div>
            </div>)
          }
        </div>
        </div>
        <svg tw="w-8 h-8 bg-white"
        viewBox="0 0 180 180">
        <path d="M0,0v181h181V0H0z M150,150H30v-30h120V150z" />
        </svg>
        </div>
      </div>
  </div>
}
export const generateOG = ({ course, fonts }: any) => {
  const og = new ImageResponse(<OG {...course} />, { fonts });
  return og;
};


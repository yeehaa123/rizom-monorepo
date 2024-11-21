import type { Checkpoint, Course } from "@offcourse/schema";
import satori from "satori";
import sharp from 'sharp';
import React from "react";

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    tw?: string;
  }
}

export const generateOG = async ({ course, fonts }: { course: Course, fonts: any[] }) => {
  // @ts-ignore
  const svg = await satori(<OG {...course} />, { fonts, width: 1200, height: 630 });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return png;
};


function OGCheckpoint({ task }: Checkpoint) {
  return (
    <li key={task} tw="bg-gray-100">
      <p tw="m-4 text-base leading-tight font-semibold text-gray-900 w-full">
        {task}
      </p>
    </li>
  )
}

function OGHeader({ goal, curator }: Course) {
  return (
    <div tw="flex flex-col">
      <h3
        tw={"text-2xl font-bold leading-none tracking-tight"} >
        {goal}
      </h3>
      <div tw="capitalize">
        {curator.alias}
      </div>
    </div>
  )
}

export function OG(props: Course) {
  const { description, tags, checkpoints } = props;
  return (
    <div tw="flex h-full w-full justify-center items-center bg-gray-900">
      <div tw="flex flex-col bg-white p-6">
        <OGHeader {...props} />
        <div tw="flex">
          <div tw="flex flex-col w-[360px] justify-between">
            <p tw="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
            <div style={{ gap: 1 }} tw="flex flex-wrap">
              {tags.map(tag =>
                <div key={tag} tw="flex text-xs border px-2.5 py-0.5 items-center border-gray-100">
                  <div>
                    {tag}
                  </div>
                </div>)
              }
            </div>
            <svg style={{ height: "24px", width: "24px" }}
              viewBox="0 0 180 180">
              <path d="M0,0v181h181V0H0z M150,150H30v-30h120V150z" />
            </svg>
          </div>
          <div tw="flex flex-col w-[360px] justify-start px-8 items-start">
            <ul style={{ rowGap: "12px" }} tw="flex flex-col">
              {checkpoints.map(cp => <OGCheckpoint key={cp.checkpointId} {...cp} />)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}



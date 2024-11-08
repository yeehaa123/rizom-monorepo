import { ImageResponse } from "@vercel/og";
import type { Checkpoint, Course } from "@offcourse/schema";
export const generateOG = ({ course, fonts }: any) => {
  const og = new ImageResponse(<OG {...course} />, { fonts });
  return og;
};


function OGCheckpoint({ task }: Checkpoint) {
  return <li key={task} tw="bg-gray-100 none">
    <p tw="m-4 text-base leading-tight font-semibold text-gray-900 py-1 w-full">
      {task}
    </p>
  </li>
}

function OGHeader({ goal, curator }: Course) {
  return (
    <div tw="flex flex-col space-y-1.5 ">
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

function OG(props: Course) {
  const { description, tags, checkpoints } = props;
  return (
    <div tw="flex h-full w-full justify-center items-center">
      <div tw="flex flex-col bg-white p-6">
        <OGHeader {...props} />
        <div tw="flex">
          <div tw="flex flex-col w-[360px] justify-between">
            <p tw="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
            <div style={{ gap: 1 }} tw="flex flex-wrap gap-1">
              {tags.map(tag =>
                <div key={tag} tw="flex text-xs border px-2.5 py-0.5 border-1 items-center border-gray-100">
                  <div>
                    {tag}
                  </div>
                </div>)
              }
            </div>
            <svg style={{ height: "36px", width: "36px" }}
              viewBox="0 0 180 180">
              <path d="M0,0v181h181V0H0z M150,150H30v-30h120V150z" />
            </svg>
          </div>
          <div tw="flex flex-col w-[360px] justify-start px-6">
            <ul style={{ rowGap: "12px" }} tw="flex flex-col">
              {checkpoints.map(cp => <OGCheckpoint {...cp} />)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}



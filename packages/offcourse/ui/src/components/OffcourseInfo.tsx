import {
  Logo,
} from "./";
import {
  CardDescription,
} from "@/components/ui/card"
export default function OffcourseInfo() {
  return <>
    <div className="flex w-full justify-center">
      <Logo className="w-24 h-24 mb-8 dark:fill-offwhite fill-offblack" />
    </div>
    <CardDescription>
      <a className="text-secondary" target="_blank" href="https://offcourse.io">Offcourse</a> is an open-source platform designed for online learning, leveraging the wealth of information available on the internet,
      such as blogs, video tutorials, and podcasts. The platform enables users to organize these resources into structured, shareable courses,
      facilitating a concept known as crowdlearning. This approach allows users to share their knowledge and learn from what others have shared.
    </CardDescription>
    <CardDescription>
      The platform is particularly aimed at those interested in integrating various forms of online content
      into coherent educational modules, making it a useful tool for both individual learners and educators.
    </CardDescription>
  </>
}

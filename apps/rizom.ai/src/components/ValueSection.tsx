import { ValueItem } from "./ValueItem"

type Props = {
  title: string,
  description: string,
  index: number,
  sections: any[]
}
export function ValueSection({ title, description, index, sections }: Props) {
  return (
    <section className="space-y-8">
      <h1 className="text-4xl">{title}</h1>
      <p>{description}</p>
      <div className={`flex flex-col ${index % 2 ? "md:flex-row" : "md:flex-row-reverse"} gap-x-8`}>
        <div className="flex-1 invisible">
          Placeholder
        </div>
        <div className="flex-1 space-y-8">
          {sections && sections.map(section => <ValueItem {...section} />)}
        </div>
      </div>
    </section>
  )
}

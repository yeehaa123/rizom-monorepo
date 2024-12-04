type Props = {
  title: string,
  subtitle: string,
  description: string
}

export function ValueItem({ title, subtitle, description }: Props) {
  return (
    <section>
      <h1 className="text-3xl">{title}</h1>
      <h2 className="text-2xl">{subtitle}</h2>
      <p>{description}</p>
    </section>
  )
}

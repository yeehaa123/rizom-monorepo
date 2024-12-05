type Props = {
  title: string,
  subtitle: string,
  description: string
}

export function ValueItem({ title, subtitle, description }: Props) {
  return (
    <section className="">
      <h1 className="text-primary-dark mb-3 text-4xl">{title}</h1>
      <h2 className="text-2xl text-primary mb-3 font-bold">{subtitle}</h2>
      <p>{description}</p>
    </section>
  )
}

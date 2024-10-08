import React from "react"

interface IHeadingProps {
  title: string
  description: string
}

export const Heading: React.FC<IHeadingProps> = ({ description, title }) => {
  return (
    <div>
      <h1 className={"text-2xl sm:text-3xl mb-2 font-medium"}>{title}</h1>
      <p className={"text-sm text-muted-foreground"}>{description}</p>
    </div>
  )
}

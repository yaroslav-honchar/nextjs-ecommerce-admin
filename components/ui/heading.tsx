import React from "react"

interface IHeadingProps {
  title: string
  description: string
}

export const Heading: React.FC<IHeadingProps> = ({ description, title }) => {
  return (
    <div>
      <h1 className={"text-3xl mb-2"}>{title}</h1>
      <p className={"text-sm text-muted-foreground"}>{description}</p>
    </div>
  )
}

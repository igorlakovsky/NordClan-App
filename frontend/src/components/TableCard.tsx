import '../styles/TableCard.scss'

import { Tag } from 'antd'

type CardProps = {
  photo: string
  name: string
  tags: string[]
  author: string
}

export default function TableCard({ photo, name, tags, author }: CardProps) {
  return (
    <div className="table__card">
      <img className="table__card__photo" src={`images/${photo}`} />
      <div className="table__card__description">
        <div className="table__card__name">{name}</div>
        <div className="table__card__author">{`Автор: ${author}`}</div>
        <div className="table__card__tags">
          {tags.map((tag) => {
            return <Tag key={tag}>{tag.toUpperCase()}</Tag>
          })}
        </div>
      </div>
    </div>
  )
}

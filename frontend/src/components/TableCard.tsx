import '../styles/TableCard.scss'

import { Tag } from 'antd'
import { useNavigate } from 'react-router-dom'

type CardProps = {
  id: string
  photo: string
  name: string
  tags: string[]
  author: string
}

export default function TableCard({
  id,
  photo,
  name,
  tags,
  author,
}: CardProps) {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(`/recipe/${id}`)
  }

  return (
    <div className="table__card" onClick={onClick}>
      <img className="table__card__photo" src={`/images/${photo}`} />
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

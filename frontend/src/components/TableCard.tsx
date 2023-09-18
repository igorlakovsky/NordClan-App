import '../styles/TableCard.scss'

import { useNavigate } from 'react-router-dom'

type CardProps = {
  id: string
  photo: string
  name: string
  author: string
}

export default function TableCard({ id, photo, name, author }: CardProps) {
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
      </div>
    </div>
  )
}

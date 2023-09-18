import '../styles/RecipeInfo.scss'

import {
  CoffeeOutlined,
  FieldTimeOutlined,
  HeartOutlined,
} from '@ant-design/icons'

import { Divider } from 'antd'

type RecipeInfoProps = {
  servings: number
  time: number
  rating: number
}

export default function RecipeInfo({
  servings,
  time,
  rating,
}: RecipeInfoProps) {
  return (
    <div className="recipe-info">
      <div className="recipe-info__item">
        <CoffeeOutlined
          style={{
            fontSize: '30px',
            paddingBottom: '6px',
            paddingRight: '4px',
          }}
        />
        <span>{servings} ПОРЦИИ</span>
      </div>
      <Divider type="vertical" className="recipe-info__divider" />
      <div className="recipe-info__item">
        <FieldTimeOutlined style={{ fontSize: '26px', paddingRight: '4px' }} />
        <span>{time} МИНУТ</span>
      </div>
      <Divider type="vertical" className="recipe-info__divider" />
      <div className="recipe-info__item" style={{ cursor: 'pointer' }}>
        <HeartOutlined style={{ fontSize: '24px', paddingRight: '4px' }} />
        <span>{rating}</span>
      </div>
    </div>
  )
}

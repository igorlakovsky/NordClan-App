import '../styles/TableRecipe.scss'

import { CoffeeOutlined, DownOutlined } from '@ant-design/icons'
import { Divider, Popover } from 'antd'

export type IngredientType = {
  title: string
  count: string
}

type RecipeProps = {
  ingredients: IngredientType[]
  servings: number
}

export function TableRecipe({ ingredients, servings }: RecipeProps) {
  const PopoverContent = (
    <div className="table__popover__content">
      {ingredients.map((ingredient, index) => {
        return (
          <div key={index} className="table__popover">
            <p>{ingredient.title}</p>
            <Divider></Divider>
            <span>{ingredient.count}</span>
          </div>
        )
      })}
    </div>
  )

  return (
    <Popover
      content={PopoverContent}
      title="ИНГРЕДИЕНТЫ"
      getPopupContainer={(trigger) => trigger.parentElement!}
    >
      <div className="table__recipe">
        <div className="table__recipe__title">
          <div className="table__recipe__title__count">
            {ingredients.length}
          </div>
          <div className="table__recipe__title__name">ИНГРЕДИЕНТОВ</div>
          <DownOutlined style={{ width: '10px', height: '10px' }} />
        </div>
        <Divider type="vertical" className="table__recipe__divider" />
        <div className="table__recipe__title">
          <CoffeeOutlined style={{ fontSize: '16px' }} />
          <div className="table__recipe__title__count">{servings}</div>
          <div className="table__recipe__title__name">ПОРЦИИ</div>
        </div>
      </div>
    </Popover>
  )
}

import '../styles/recipe.scss'

import { Divider, Timeline, Typography } from 'antd'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { IngredientType } from '../components/TableRecipe'
import RecipeInfo from '../components/RecipeInfo'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography

type RecipeDetailType = {
  id: string
  photo: string
  name: string
  description: string
  key: number
  author: string
  servings: number
  recipe: IngredientType[]
  time: number
  rating: number
  instruction: string[]
}

const data: RecipeDetailType = {
  id: '1',
  photo: 'pancakes.jpg',
  name: 'Банановые панкейки',
  description:
    'Сервис, в котором вы можете просмотреть список рецептов опубликованные пользователями.',
  key: 1,
  author: 'test',
  servings: 6,
  recipe: [
    { title: 'Ингредиент', count: '500 г' },
    { title: 'Ингредиент', count: '500 г' },
    { title: 'Ингредиент', count: '500 г' },
    { title: 'Ингредиент', count: '500 г' },
  ],
  time: 120,
  rating: 5,
  instruction: [
    'Смешать муку, сахар, разрыхлитель, соду и соль.',
    'Банан пюрировать. Желток взбить, добавить молоко, банан и растопленное масло, взбивать 1 минуту.',
    'Мучную смесь смешать с жидкой и перемешать венчиком или миксером.',
    'Белки хорошо взбить и аккуратно добавить в тесто.',
    'Жарить на сухой сковородке с одной стороны до появления пузырьков потом перевернуть.',
    '*из этого количества продуктов получается 9 блинчиков',
  ],
}

const timelineItems = (instruction: string[]) => {
  return instruction.map((text) => {
    return {
      color: 'black',
      children: text,
    }
  })
}

export default function Recipe() {
  const navigate = useNavigate()

  return (
    <main className="recipe-page">
      <div className="recipe-page__wrapper">
        <div
          className="recipe-page__back"
          onClick={() => {
            navigate(`/`)
          }}
        >
          <ArrowLeftOutlined />
          <span>Вернуться к списку</span>
        </div>
        <div className="recipe-page__logo">
          <img src="/images/chef.png"></img>
        </div>
        <Title level={1} className="recipe-page__title">
          {data.name}
        </Title>
        <Paragraph type="secondary" className="recipe-page__description">
          {data.description}
        </Paragraph>
        <RecipeInfo
          servings={data.servings}
          time={data.time}
          rating={data.rating}
        ></RecipeInfo>
        <Divider className="recipe-page__divider">Описание</Divider>
        <div className="recipe-page__info">
          <img
            className="recipe-page__info__photo"
            src={`/images/${data.photo}`}
          />
          <div className="recipe-page__info__ingredients">
            <span>ИНГРЕДИЕНТЫ:</span>
            <div className="recipe-page__info__ingredients__item">
              {data.recipe.map((ingredient, index) => {
                return (
                  <div key={index} className="table__popover">
                    <p>{ingredient.title}</p>
                    <Divider></Divider>
                    <span>{ingredient.count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <Divider className="recipe-page__divider">
          Инструкция приготовления
        </Divider>
        <div className="recipe-page__instruction">
          <Timeline items={timelineItems(data.instruction)} />
        </div>
      </div>
    </main>
  )
}

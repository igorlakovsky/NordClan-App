import '../styles/recipe.scss'

import { Divider, Timeline, Typography, notification } from 'antd'
import axios, { AxiosError } from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import { ArrowLeftOutlined } from '@ant-design/icons'
import RecipeInfo from '../components/RecipeInfo'
import { recipeAdd } from '../store/recipesSlice'
import { useAppSelector } from '../store/hooks'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const { Title, Paragraph } = Typography

const timelineItems = (instruction?: string[]) => {
  return instruction?.map((text) => {
    return {
      color: 'black',
      children: text,
    }
  })
}

export default function Recipe() {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const recipeData = useAppSelector((state) =>
    state.recipes.recipes.find((recipe) => {
      return recipe.id === params.recipeId
    })
  )

  const fetchRecipe = async (id: string) => {
    try {
      const responce = await axios.get(`http://localhost:8080/recipes/${id}`)
      dispatch(recipeAdd(responce.data))
    } catch (error) {
      const err = error as AxiosError
      notification.error({ message: err.message })
    }
  }

  useEffect(() => {
    if (!recipeData) {
      fetchRecipe(params.recipeId!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          {recipeData?.name}
        </Title>
        <Paragraph type="secondary" className="recipe-page__description">
          {recipeData?.description}
        </Paragraph>
        <RecipeInfo
          servings={recipeData?.servings}
          time={recipeData?.time}
          rating={recipeData?.rating}
        ></RecipeInfo>
        <Divider className="recipe-page__divider">Описание</Divider>
        <div className="recipe-page__info">
          <img
            className="recipe-page__info__photo"
            src={`/images/${recipeData?.photo}`}
          />
          <div className="recipe-page__info__ingredients">
            <span>ИНГРЕДИЕНТЫ:</span>
            <div className="recipe-page__info__ingredients__item">
              {recipeData?.recipe.map((ingredient, index) => {
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
          <Timeline items={timelineItems(recipeData?.instruction)} />
        </div>
      </div>
    </main>
  )
}

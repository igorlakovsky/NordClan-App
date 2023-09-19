import '../styles/home.scss'

import {
  Button,
  Divider,
  Input,
  Modal,
  Table,
  Typography,
  notification,
} from 'antd'
import {
  FieldTimeOutlined,
  HeartOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { IngredientType, TableRecipe } from '../components/TableRecipe'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useEffect, useState } from 'react'

import type { ColumnsType } from 'antd/es/table'
import RecipeModal from '../components/RecipeModal'
import TableCard from '../components/TableCard'
import { fetchRecipes } from '../store/recipesSlice'

const { Title, Paragraph } = Typography
const { Search } = Input

export type RecipeType = {
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

const columns: ColumnsType<RecipeType> = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    render: (name, { id, photo, author }) => (
      <TableCard id={id} name={name} photo={photo} author={author} />
    ),
  },
  {
    title: 'Рецепт',
    dataIndex: 'recipe',
    key: 'recipe',
    render: (recipe, { servings }) => (
      <TableRecipe ingredients={recipe} servings={servings}></TableRecipe>
    ),
  },
  {
    title: 'Сложность',
    dataIndex: 'time',
    key: 'time',
    render: (time) => (
      <div className="table__info">
        <FieldTimeOutlined style={{ fontSize: '16px' }} />
        <span>{time} МИНУТ</span>
      </div>
    ),
  },
  {
    title: 'Рейтинг',
    dataIndex: 'rating',
    key: 'rating',
    align: 'center',
    render: (rating) => (
      <div
        className="table__info"
        style={{ justifyContent: 'center', cursor: 'pointer' }}
      >
        <HeartOutlined style={{ fontSize: '16px' }} />
        <span>{rating}</span>
      </div>
    ),
  },
]

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dispatch = useAppDispatch()

  const recipesData = useAppSelector((state) => state.recipes.recipes)
  const recipesStatus = useAppSelector((state) => state.recipes.status)
  const recipesError = useAppSelector((state) => state.recipes.error)

  const modalShow = () => {
    setIsModalOpen(true)
  }

  const modalCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (recipesStatus === 'idle') {
      dispatch(fetchRecipes())
    } else if (recipesStatus === 'failed') {
      notification.error({ message: recipesError })
    }
  }, [recipesStatus, recipesError, dispatch])

  return (
    <main className="home-page">
      <div className="home-page__wrapper">
        <div className="home-page__logo">
          <img src="images/chef.png"></img>
        </div>
        <Title level={1} className="home-page__title">
          Кулинарная книга
        </Title>
        <Paragraph type="secondary" className="home-page__description">
          Сервис, в котором вы можете просмотреть список рецептов опубликованные
          пользователями. Зарегистрируйтесь для возможности создавать свои
          уникальные рецепты и делиться ими с другими людьми.
        </Paragraph>
        <Divider className="home-page__divider">Список рецептов</Divider>
        <div className="home-page__toolbar">
          <Search
            placeholder="Поиск по рецептам"
            className="home-page__search"
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={modalShow}>
            Добавить рецепт
          </Button>
        </div>

        <Table
          showHeader={true}
          columns={columns}
          dataSource={recipesData}
          pagination={{ position: ['bottomCenter'] }}
          className="table"
        />

        <Modal
          className="home-page__modal"
          title="Создание рецепта"
          centered
          width={700}
          footer={null}
          open={isModalOpen}
          onCancel={modalCancel}
        >
          <RecipeModal></RecipeModal>
        </Modal>
      </div>
    </main>
  )
}

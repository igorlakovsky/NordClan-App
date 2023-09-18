import '../styles/home.scss'

import { Divider, Input, Table, Typography } from 'antd'
import { FieldTimeOutlined, HeartOutlined } from '@ant-design/icons'
import { IngredientType, TableRecipe } from '../components/TableRecipe'

import type { ColumnsType } from 'antd/es/table'
import TableCard from '../components/TableCard'

const { Title, Paragraph } = Typography
const { Search } = Input

type RecipeType = {
  id: string
  photo: string
  name: string
  tags: string[]
  key: number
  author: string
  servings: number
  recipe: IngredientType[]
  time: number
  rating: number
}

const data: RecipeType[] = [
  {
    id: '1',
    photo: 'pancakes.jpg',
    name: 'Банановые панкейки',
    tags: ['nice', 'developer'],
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
  },
  {
    id: '2',
    photo: 'pancakes.jpg',
    name: 'Банановые панкейки 2',
    tags: ['nice', 'developer'],
    key: 2,
    author: 'test',
    servings: 4,
    recipe: [
      { title: 'Ингредиент', count: '500 г' },
      { title: 'Ингредиент', count: '500 г' },
      { title: 'Ингредиент', count: '500 г' },
      { title: 'Ингредиент', count: '500 г' },
    ],
    time: 60,
    rating: 3,
  },
]

const columns: ColumnsType<RecipeType> = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    render: (name, { id, photo, tags, author }) => (
      <TableCard
        id={id}
        name={name}
        photo={photo}
        tags={tags}
        author={author}
      />
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
        <Search
          placeholder="Поиск по рецептам"
          className="home-page__search"
          size="large"
        />
        <Table
          showHeader={true}
          columns={columns}
          dataSource={data}
          pagination={{ position: ['bottomCenter'] }}
          className="table"
        />
      </div>
    </main>
  )
}

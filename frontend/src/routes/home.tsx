import '../styles/home.scss'

import { Divider, Input, Table, Typography } from 'antd'
import { IngredientType, TableRecipe } from '../components/TableRecipe'

import type { ColumnsType } from 'antd/es/table'
import { FieldTimeOutlined } from '@ant-design/icons'
import TableCard from '../components/TableCard'

const { Title, Paragraph } = Typography
const { Search } = Input

interface DataType {
  id: string
  photo: string
  name: string
  tags: string[]
  key: number
  author: string
  recipe: IngredientType[]
  time: number
  rating: number
}

const data: DataType[] = [
  {
    id: '1',
    photo: 'pancakes.jpg',
    name: 'Банановые панкейки',
    tags: ['nice', 'developer'],
    key: 1,
    author: 'test',
    recipe: [
      { title: 'Ингредиент', count: '500 г' },
      { title: 'Ингредиент', count: '500 г' },
      { title: 'Ингредиент', count: '500 г' },
      { title: 'Ингредиент', count: '500 г' },
    ],
    time: 120,
    rating: 5,
  },
]

const columns: ColumnsType<DataType> = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    render: (name, { photo, tags, author }) => (
      <TableCard name={name} photo={photo} tags={tags} author={author} />
    ),
  },
  {
    title: 'Рецепт',
    dataIndex: 'recipe',
    key: 'recipe',
    render: (recipe) => (
      <TableRecipe ingredients={recipe} servings={6}></TableRecipe>
    ),
  },
  {
    title: 'Сложность',
    dataIndex: 'time',
    key: 'time',
    render: (time) => (
      <div className="table__time">
        <FieldTimeOutlined style={{ fontSize: '16px' }} />
        <span>{time} МИНУТ</span>
      </div>
    ),
  },
  {
    title: 'Рейтинг',
    dataIndex: 'rating',
    key: 'rating',
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
        <Divider
          className="home-page__divider"
          // orientation="left"
          // orientationMargin="0"
        >
          Список рецептов
        </Divider>
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

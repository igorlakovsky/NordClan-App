import '../styles/home.scss'

import { Divider, Input, Space, Table, Tag, Typography } from 'antd'

import type { ColumnsType } from 'antd/es/table'

const { Title, Paragraph, Text, Link } = Typography
const { Search } = Input

interface DataType {
  id: string
  photo: string
  name: string
  age: number
  tags: string[]
}

const data: DataType[] = [
  {
    id: '1',
    photo: 'pancakes.jpg',
    name: 'Банановые панкейки',
    age: 32,
    tags: ['nice', 'developer'],
  },
]

const columns: ColumnsType<DataType> = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    render: (text, { photo }) => (
      <div className="table__title">
        <img className="table__title__photo" src={`images/${photo}`} />
        <div className="table__title__text">{text}</div>
      </div>
    ),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'photo',
    key: 'photo',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
  },
]

export default function Home() {
  return (
    <main className="home-page">
      <div className="home-page__wrapper">
        <Title level={1} className="home-page__title">
          Кулинарная книга
        </Title>
        <Paragraph type="secondary" className="home-page__description">
          Сервис, в котором вы можете просмотреть список рецептов опубликованные
          пользователями. Зарегистрируйтесь для возможности создавать свои
          уникальные рецепты и делиться ими с другими людьми.
        </Paragraph>
        <Divider />
        <Title level={4}>Список рецептов</Title>
        <Search placeholder="Поиск по рецептам" className="home-page__search" />
        <Table columns={columns} dataSource={data} />
      </div>
    </main>
  )
}

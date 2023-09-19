import '../styles/RecipeModal.scss'

import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Upload,
  notification,
} from 'antd'
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import axios, { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../store/hooks'

import { IngredientType } from '../components/TableRecipe'
import type { UploadFile } from 'antd/es/upload/interface'
import type { UploadProps } from 'antd/es/upload'
import { fetchRecipes } from '../store/recipesSlice'
import { useState } from 'react'

const { TextArea } = Input

type RecipeFormType = {
  name: string
  description: string
  servings: number
  recipe: IngredientType[]
  time: number
  instruction: string[]
}

export default function RecipeModal({ initValue, onClose }) {
  const dispatch = useAppDispatch()

  const [photo, setPhoto] = useState<UploadFile>()

  const userLogin = useAppSelector((state) => state.user.login)

  const changeUpload: UploadProps['onChange'] = (info) => {
    if (info.fileList.length) {
      setPhoto(info.file)
    } else {
      setPhoto(undefined)
    }
  }

  const onFinish = async (values: RecipeFormType) => {
    const data = { ...values, author: userLogin, id: initValue?.id }
    try {
      await axios.post(
        initValue
          ? `${import.meta.env.VITE_BACKEND_HOST}/recipes/update`
          : `${import.meta.env.VITE_BACKEND_HOST}/recipes/create`,
        data
      )
      dispatch(fetchRecipes())
      onClose()
    } catch (error) {
      const err = error as AxiosError
      notification.error({ message: err.message })
    }
  }

  return (
    <Form
      layout="vertical"
      className="recipe-modal"
      initialValues={initValue ?? { recipe: [{}], instruction: [''] }}
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Фотография блюда" valuePropName="fileList">
            <Upload
              listType="picture-card"
              className="recipe-modal__upload"
              // beforeUpload={() => {
              //   return false
              // }}
              onChange={changeUpload}
            >
              {photo ? null : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Выберите файл</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Col>
        <Col span={16}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Наименование"
                name="name"
                rules={[{ required: true, message: 'Заполните поле' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Время приготовления (мин)"
                name="time"
                rules={[{ required: true, message: 'Заполните поле' }]}
              >
                <InputNumber
                  className="recipe-modal__number"
                  min={5}
                  max={720}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Количество порций"
                name="servings"
                rules={[{ required: true, message: 'Заполните поле' }]}
              >
                <InputNumber
                  className="recipe-modal__number"
                  min={1}
                  max={20}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Form.Item label="Описание" name="description">
            <TextArea />
          </Form.Item>
        </Col>
        <Divider orientation="left" orientationMargin="8">
          Список ингредиентов
        </Divider>
        <Col span={24}>
          <Form.List name="recipe">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Row
                    key={field.key}
                    gutter={24}
                    style={
                      index > 0
                        ? { alignItems: 'baseline' }
                        : { alignItems: 'center' }
                    }
                  >
                    <Col span={14}>
                      <Form.Item
                        label={index > 0 ? null : 'Название'}
                        name={[field.name, 'title']}
                        rules={[{ required: true, message: 'Заполните поле' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label={index > 0 ? null : 'Количество'}
                        name={[field.name, 'count']}
                        rules={[{ required: true, message: 'Заполните поле' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    {index > 0 ? (
                      <Col span={2}>
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                          style={{ color: 'red' }}
                        />
                      </Col>
                    ) : null}
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Добавить ингредиент
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>
        <Divider orientation="left" orientationMargin="8">
          Инструкция приготовления
        </Divider>
        <Col span={24}>
          <Form.List name="instruction">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Row
                    key={field.key}
                    gutter={24}
                    style={
                      index > 0
                        ? { alignItems: 'baseline' }
                        : { alignItems: 'center' }
                    }
                  >
                    <Col span={22}>
                      <Form.Item
                        label={index > 0 ? null : 'Описание'}
                        name={field.name}
                        rules={[{ required: true, message: 'Заполните поле' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    {index > 0 ? (
                      <Col span={2}>
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                          style={{ color: 'red' }}
                        />
                      </Col>
                    ) : null}
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Добавить инструкцию
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>
      </Row>
      <Form.Item style={{ textAlign: 'end', marginTop: '20px' }}>
        <Button type="primary" htmlType="submit">
          {initValue ? 'Сохранить' : 'Опубликовать'}
        </Button>
      </Form.Item>
    </Form>
  )
}

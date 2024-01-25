import React from 'react'
import { render, screen } from '@testing-library/react'
import Todo from '../Todos/Todo'

const todo = {
  text: 'Testing todo component',
  done: false,
}

describe('Todo component', () => {
  it('should render a todo', () => {
    const onClickDelete = jest.fn()
    const onClickComplete = jest.fn()

    render(
      <Todo
        todo={todo}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
    )

    expect(screen.getByText('Testing todo component')).toBeInTheDocument()
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
  })
})
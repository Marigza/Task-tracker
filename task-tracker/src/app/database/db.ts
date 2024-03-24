import { Task, Priority, Status } from "../models/task.model";

export const dataBase: Task[] = [
  {
    id: '123',
    title: 'the first task',
    employee: ' Daenerys Targaryen',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, consequatur non. Aliquam, minima quis voluptates beatae, perferendis perspiciatis ipsa quasi natus facere dicta earum dignissimos. Harum a ea tempore architecto?',
    deadline: new Date('03-30-2024').getTime(),
    priority: Priority.Low,
    status: Status.ToDo,
  },
  {
    id: '124',
    title: 'the second task',
    employee: ' Jon Snow',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, consequatur non. Aliquam, minima quis voluptates beatae, perferendis perspiciatis ipsa quasi natus facere dicta earum dignissimos. Harum a ea tempore architecto?',
    deadline: new Date('04-05-2024').getTime(),
    priority: Priority.High,
    status: Status.InProgress,
  },
  {
    id: '125',
    title: 'the third task',
    employee: ' Arya Stark',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, consequatur non. Aliquam, minima quis voluptates beatae, perferendis perspiciatis ipsa quasi natus facere dicta earum dignissimos. Harum a ea tempore architecto?',
    deadline: new Date('05-04-2024').getTime(),
    priority: Priority.Medium,
    status: Status.ToDo,
  },
]

export const employee = [
  'Daenerys Targaryen', 'Jon Snow', 'Sansa Stark', 'Samwell Tarly', ' Lyanna Mormont','Olenna Tyrell', 'Tyrion Lannister', ' Cersei Lannister', ' Arya Stark', ' Brienne Tarth', 'Ramsay Bolton'
]

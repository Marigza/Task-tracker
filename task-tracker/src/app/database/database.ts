import { Task } from "../models/task.model";

export const db: Task[] = [
  {
    id: "123",
    title: "the first task",
    employee: "Daenerys Targaryen",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, consequatur non. Aliquam, minima quis voluptates beatae, perferendis perspiciatis ipsa quasi natus facere dicta earum dignissimos. Harum a ea tempore architecto?",
    deadline: "1711746000000",
    priority: "low",
    status: "to do"
  },
  {
    id: "124",
    title: "the second task",
    employee: "Jon Snow",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, consequatur non. Aliquam, minima quis voluptates beatae, perferendis perspiciatis ipsa quasi natus facere dicta earum dignissimos. Harum a ea tempore architecto?",
    deadline: "1712264400000",
    priority: "high",
    status: "in progress"
  },
  {
    id: "125",
    title: "the third task",
    employee: "Arya Stark",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, consequatur non. Aliquam, minima quis voluptates beatae, perferendis perspiciatis ipsa quasi natus facere dicta earum dignissimos. Harum a ea tempore architecto?",
    deadline: "1714770000000",
    priority: "medium",
    status: "to do"
  }
]


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Todo } from '..';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const todoSchema = z.object({
  id: z.number(),
  content: z.string(),
  completed: z.boolean(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo[]>
) {
  switch (req.method) {
    case 'GET':
      // Get data from your database
      const allTodos = await prisma.todo.findMany();
      res.status(200).json(allTodos);
      break;
    case 'POST':
      // Update or create data in your database
      const data = todoSchema.parse(req.body);
      await prisma.todo.create({
        data: data,
      });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

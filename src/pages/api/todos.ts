// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Todo } from "..";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const reqDataSchema = z.object({
  id: z.number().optional(),
  content: z.string(),
  completed: z.boolean().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo | Todo[]>
) {
  switch (req.method) {
    case "GET":
      // Get data from your database
      res.status(200).json(await prisma.todo.findMany());
      break;
    case "POST":
      // Update or create data in your database
      const createdItem = await prisma.todo.create({
        data: reqDataSchema.parse(req.body),
      });
      res.status(200).json(createdItem);
      break;
    case "PUT":
      // Update data
      const putSchema = z.object({
        id: z.number(),
        content: z.string().optional(),
        completed: z.boolean().optional(),
      });
      const putParsed = putSchema.parse(req.body);
      console.log(putParsed);
      const updatedItem = await prisma.todo.update({
        where: { id: putParsed.id },
        data: putParsed,
      });
      res.status(200).json(updatedItem);
      break;
    case "DELETE":
      // Delete a single ToDo
      const deleteSchema = z.object({
        id: z.number(),
      });
      const deleteParsed = deleteSchema.parse(req.body);
      const deletedItem = await prisma.todo.delete({
        where: { id: deleteParsed.id },
      });
      res.status(200).json(deletedItem);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

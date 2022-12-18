import { UPDATE_STATUS } from '@prisma/client'
import { Request, Response } from 'express'
import prisma from '../db'

//Get all updates
export const getUpdates = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      Products: {
        include: {
          updates: true,
        },
      },
    },
  })

  res.json({ data: user?.Products, errors: [] })
}

//Get one update
export const getUpdate = async (req: Request, res: Response) => {
  const id = req.params.id

  const update = await prisma.update.findUnique({
    where: {
      id,
    },
  })
  res.json({ data: update })
}

//Create update
export const createUpdate = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  })

  if (!product) {
    return res.json({ message: 'nope' })
  }
  const update = await prisma.update.create({
    data: req.body,
  })
  res.json({ data: update })
}

export const update = async (req: Request, res: Response) => {
  const updated = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: {
      title: req.body.title,
      body: req.body.body,
      version: req.body.version,
      asset: req.body.asset,
      updatedAt: new Date(),
    },
  })
  res.json({ data: updated })
}

export const deleteUpdate = async (req: Request, res: Response) => {
  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  })
  res.json({ data: deleted })
}

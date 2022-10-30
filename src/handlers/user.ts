import prisma from '../db'
import { Request, Response } from 'express';
import { comparePassword, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async(req: Request, res:Response) => {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            username: req.body.username,
            password: await hashPassword(req.body.password)
        }
    })
    const token = createJWT(user)
    res.json({token})
}

export const signIn = async(req: Request, res:Response) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        }
    })

    const isValid = await comparePassword(req.body.password, user?.password)

    if(!isValid) {
        res.status(401)
        res.json({message: 'nope!'})
        return
    }

    const token = createJWT(user)
    res.json({token})
}

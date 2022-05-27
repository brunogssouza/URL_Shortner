import { URLModel } from "../database/model/URL";
import { Request, Response } from "express";
import shortId from "shortid"
import { config } from "../config/Constants";

export class URLcontrolller {
    public async shorten(req: Request, res: Response): Promise<void> {
        // verificar se a URL não existe
        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL })

        if (url) {
            res.json(url)
        }
        const hash = shortId.generate()
        const shortenedURL = `${config.API_URL}/${hash}`

        // Salvar a URL no banco , CASO ELA NÃO EXISTA !!

        const newURL = URLModel.create({ hash, shortenedURL, originURL })

        // retornar a URL que queremos
        res.json(newURL)
    }

    public async redirect(req: Request, res: Response): Promise<void> {

        const { hash } = req.params
        const url = await URLModel.findOne({ hash })

        if (url) {
            res.redirect(url.originURL)
            return
        }


        res.status(400).json({ error: 'URL NOT FOUND' })


        res.redirect(url.originURL)
    }
}
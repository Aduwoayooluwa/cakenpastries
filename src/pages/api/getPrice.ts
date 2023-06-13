import { NextApiResponse, NextApiRequest } from "next"
import { supabase } from "./savePrice"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { id } = req.query;

        const { data, error } = await supabase.from("store")
            .select('subtotal').eq('id', id)
            .single()

        
        if (error) {
            res.status(500).json({message: error?.message})
        }
        else {
            res.status(200).json({message: data})
        }
    }
    else {
        res.status(405).json({message: "Method not allowed"})
    }
}
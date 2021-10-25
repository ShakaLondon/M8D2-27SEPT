import createHttpError from "http-errors"
import atob from "atob"
import AuthorModel from "../services/authors/schema.js"

export const basicAuthMiddleware = async (req, res, next) => {

    if (!req.headers.authorization) {
        // check if auth header is received which includes email and password
        next(createHttpError(401, "Please provide credentials in Authorization header!"))
    } else {
        // credentials recieved in base64 have to decode to get the normal text
        const decodedCredentials = atob(req.headers.authorization.split(" ")[1])
        const [email, password] = decodedCredentials.split(":")

        console.log(email, password, "Decoded")
        // Check model to see if email matches in database if not then trigger an error
        const user = await AuthorModel.checkCredentials(email, password)
        // if credentials are returned proceed to next route or error handler
        if (user) {
            req.user = user
            console.log(req.user, "loggedUser")
            next()
        } else {
            next(createHttpError(401, "Credentials are incorrect!"))
        }
        next()
    }
}
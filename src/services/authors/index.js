import express from "express"
import createError from "http-errors"
import q2m from "query-to-mongo"

import AuthorModel from "./schema.js"
import BlogModel from "../blogs/blog-schema.js"
import { basicAuthMiddleware } from "../../auth/basic.js"
import { adminOnly } from "../../auth/adminonly.js"
// import addAuthor from "./insert.js"

const authorRouter = express.Router()

authorRouter.post("/register", async (req, res, next) => {
  try {

    const newAuthor = new AuthorModel(req.body)
    const { _id } = await newAuthor.save()

    res.status(201).send({ _id })

  } catch (error) {

    if (error.name === "ValidationError") {

      next(createError(400, error))

    } else {

      console.log(error)

      next(createError(500, "An error occurred while creating new blog"))
    }
  }
})

authorRouter.get("/", basicAuthMiddleware, adminOnly, async (req, res, next) => {
  try {

    const authorsList = await AuthorModel.find()

    console.log(authorsList, "listOfAuthors")

    res.send(authorsList)

  } catch (error) {

    next(createError(500, "An error occurred while getting authors' list "))

  }
})

// login
authorRouter.post("/me", basicAuthMiddleware, async (req, res, next) => {
  try {
    console.log(req.user, "HERE 5")
    res.send(req.user)
  } catch (error) {
    next(createError(500, "An error occurred while getting author"))
  }
})

authorRouter.get("/me/blogs", basicAuthMiddleware, async (req, res, next) => {
  try {

    const authorId = req.user._id

    console.log(authorId)

    // const authorSearch = String(authorId)

    // console.log(authorSearch)

    const blogsByAuthor = await BlogModel.find({ author: { $in: authorId }}, 
    function(err, result) {
      if (err) {
        res.send(err);
      }
      })

    if (blogsByAuthor) {
      console.log(blogsByAuthor)
      res.send(blogsByAuthor)
    } else {
      next(createError(404, `Author with _id ${authorId} not found!`))
    }
  } catch (error) {
    next(createError(500, "An error occurred while getting author"))
  }
})

authorRouter.get("/:authorId", basicAuthMiddleware, adminOnly, async (req, res, next) => {
  try {

    const authorId = req.params.authorId

    const author = await AuthorModel.findById(authorId)

    if (author) {
      res.send(author)
    } else {
      next(createError(404, `Author with _id ${authorId} not found!`))
    }
  } catch (error) {
    next(createError(500, "An error occurred while getting author"))
  }
})

authorRouter.delete("/:authorId", basicAuthMiddleware, adminOnly, async (req, res, next) => {
  try {
    const authorId = req.params.authorId

    const deletedAuthor = await AuthorModel.findByIdAndDelete(authorId)

    if (deletedAuthor) {
      res.status(204).send()
    } else {
      next(createError(404, `Author with _id ${authorId} not found!`))
    }
  } catch (error) {
    next(createError(500, `An error occurred while deleting author ${req.params.authorId}`))
  }
})

authorRouter.put("/:authorId", basicAuthMiddleware, adminOnly, async (req, res, next) => {
  try {
    const authorId = req.params.authorId

    const updatedAuthor = await AuthorModel.findByIdAndUpdate(authorId, req.body, {
      new: true, // to use existing record n
      runValidators: true,
    })

    if (updatedAuthor) {
      res.send(updatedAuthor)
    } else {
      next(createError(404, `Author with _id ${authorId} not found!`))
    }
  } catch (error) {
    next(createError(500, `An error occurred while updating author ${req.params.authorId}`))
  }
})

authorRouter.get("/:authorId/blogs/", basicAuthMiddleware, adminOnly, async (req, res, next) => {
  try {

    const authorId = req.params.authorId

    console.log(authorId)

    const authorSearch = String(authorId)

    console.log(authorSearch)

    const blogsByAuthor = await BlogModel.find({ author: { $in: authorSearch }}, 
    function(err, result) {
      if (err) {
        res.send(err);
      }
      })

    if (blogsByAuthor) {
      console.log(blogsByAuthor)
      res.send(blogsByAuthor)
    } else {
      next(createError(404, `Author with _id ${authorId} not found!`))
    }
  } catch (error) {
    next(createError(500, "An error occurred while getting author"))
  }
})

export default authorRouter

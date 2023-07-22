const Product = require('../models/product.schema')
const customError = require('../utils/customError')
const { formidable } = require('formidable')
const _ = require('lodash')
const fs = require('fs')

exports.getProductById = async (req, res, next, id) => {
    try {
        const product = await Product.findById(id)

        if (!product) {
            throw new customError("Product not found", 404)
        }

        req.product = product
        next()

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.createProduct = async (req, res) => {
    try {

        const form = formidable({
            keepExtensions: true,
            multiples: true
        })

        form.parse(req, async (error, fields, file) => {
            if (error) {
                throw new customError("Problem with image", 400)
            }

            // changing format of values
            for (let key in fields) {
                fields[key] = fields[key][0]
            }
            file.photo = file.photo[0]

            // destructuring fields
            const { name, description, price, stock, category } = fields

            if (!name || !description || !price || !stock || !category) {
                throw new customError("All fields are required", 400)
            }

            // let product = await new Product({
            //     name: name[0],
            //     description: description[0],
            //     price: price[0],
            //     stock: stock[0],
            //     category: category[0]
            // })

            let product = new Product(fields)

            if (file.photo) {
                if (file.photo.size > 3000000) {
                    throw new customError("File size too big!", 400)
                }


                product.photo.data = fs.readFileSync(file.photo.filepath)
                product.photo.contentType = file.photo.mimetype
            }

            // Save to DB
            const savedProduct = await product.save()

            if (!savedProduct) {
                throw new customError("Saving product failed in DB", 400)
            }

            res.status(200).json({
                success: true,
                product
            })
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getProduct = (req, res) => {
    try {
        req.product.photo = undefined
        res.status(200).json({
            success: true,
            product: req.product
        })
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.photo = (req, res, next) => {
    try {
        if (req.product.photo.data) {
            res.set("Content-Type", req, product.photo.contextType)
            res.send(req.product.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.removeProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.product._id)

        if (!product) {
            throw new customError("Unable to delete product", 400)
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const form = formidable({
            keepExtensions: true,
            multiples: true
        })

        form.parse(req, async (error, fields, file) => {
            if (error) {
                throw new customError("Problem with image", 400)
            }

            // changing format of values
            for (let key in fields) {
                fields[key] = fields[key][0]
            }
            file.photo = file.photo[0]

            let product = req.product
            product = _.extend(product, fields)

            if (file.photo) {
                if (file.photo.size > 3000000) {
                    throw new customError("File size too big!", 400)
                }


                product.photo.data = fs.readFileSync(file.photo.filepath)
                product.photo.contentType = file.photo.mimetype
            }

            // Save to DB
            const updatedProduct = await product.save()

            if (!updatedProduct) {
                throw new customError("Updation of product failed in DB", 400)
            }

            res.status(200).json({
                success: true,
                product
            })
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getProducts = async (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? (req.query.sortBy) : "_id";

    try {
        const products = await Product.find().select("-photo").limit(limit).sort([[sortBy, 'asc']]).populate("category")

        if (!products) {
            throw new customError("Unable to get products", 400)
        }

        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllUniqueCategories = async (req, res) => {
    const category = await Product.distinct('category', {})

    if (!category) {
        throw new customError("Cannot get categories", 400)
    }

    res.status(200).json({
        success: true,
        category
    })
}

exports.updateStock = async (req, res, next) => {
    try {
        const myOperations = req.order.products.map(product => {
            return {
                updateOne: {
                    filter: { _id: product._id },
                    update: { $inc: { stock: -product.count, sold: +product.count } }
                }
            }
        })

        const response = await Product.bulkWrite(myOperations)

        if (!response) {
            throw new customError('Bulk operation failed', 400)
        }

        next()

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}
const Category = require('../models/category.schema');
const customError = require('../utils/customError');

exports.getCategoryById = async (req, res, next, id) => {
    try {
        const category = await Category.findById(id)
        if (!category) {
            throw new customError("Category not found", 404)
        }
        req.category = category
        next()
    }
    catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.createCategory = async (req, res) => {
    try {
        // check if already exists
        if (await Category.findOne(req.body)) {
            throw new customError("Category already exists", 400)
        }

        const category = await Category.create(req.body)

        if (!category) {
            throw new customError("Unable to create category", 400)
        }

        res.status(200).json({
            success: true,
            category
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getCategory = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            category: req.category
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        const names = [];
        if (!categories) {
            throw new customError('Not able get categories', 400)
        }

        categories.map((category) => {
            names.push(category.name);
        })

        res.status(200).json({
            success: true,
            names
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.category._id, req.body)

        if (!category) {
            throw new customError("Not able to update category", 400)
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfuly"
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

exports.removeCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.category._id, req.body)

        if (!category) {
            throw new customError("Not able to delete category", 400)
        }

        res.status(200).json({
            success: true,
            message: `${category.name} category deleted successfuly`
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}
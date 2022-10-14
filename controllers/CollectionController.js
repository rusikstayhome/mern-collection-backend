import CollectionModel from '../models/Collection.js';
import ItemModel from '../models/Item.js'

export const create = async (req, res) => {
    try {
        const doc = new CollectionModel({
            title: req.body.title,
            description: req.body.description,
            topic: req.body.topic,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        })

        const collection = await doc.save();
        res.json(collection)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create collection'
        })
    }
}
export const getAll = async (req, res) => {
    try {
        const collections = await CollectionModel.find().populate('user').populate('items').exec();

        res.json(collections)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get the collections'
        })
    }
}
export const getOne = async (req, res) => {
    try {
        const collectionId = req.params.id;

        const collection = await CollectionModel.findById(collectionId).populate('user').populate('items').exec()

        if (!collection) {
            console.log(err);
            return res.status(404).json({
                message: 'Collection not found'
            })
        }

        res.json(collection)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get the collection'
        })
    }
}
export const remove = async (req, res) => {
    try {
        const collectionId = req.params.id;

        CollectionModel.findOneAndDelete({
            _id: collectionId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: 'Failed to delete the collection'
                })
            }

            if (!doc) {
                console.log(err);
                res.status(500).json({
                    message: 'Failed to get the collection'
                })
            }

            res.json({
                success: true,
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to delete the collection'
        })
    }
}
export const update = async (req, res) => {
    try {
        const collectionId = req.params.id;

        await CollectionModel.updateOne({
            _id: collectionId,
        }, {
            title: req.body.title,
            description: req.body.description,
            topic: req.body.topic,
            imageUrl: req.body.imageUrl,
        })

        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update the collection'
        })
    }
}

export const addItem = async (req, res) => {
    try {
        const collectionId = req.params.id;

        const doc = new ItemModel({
            name: req.body.name,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            parentCollection: collectionId
        })
        const item = await doc.save()

        const collection = await CollectionModel.findById(collectionId);

        collection.items.push(item);
        await collection.save();

        res.json(item);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create an item'
        })
    }

}
export const getAllItems = async (req, res) => {
    try {
        const collectionId = req.params.id;

        const items = await ItemModel.find().populate('user').exec();


        res.json(items)


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get the items'
        })
    }
}
export const getOneItem = async (req, res) => {
    try {
        const itemId = req.params.item;

        const oneItem = await ItemModel.findById(itemId).populate('user').populate('parentCollection').exec();

        if (!oneItem) {
            console.log(err);
            return res.status(404).json({
                message: 'Failed to get the item'
            })
        }

        res.json(oneItem)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get the item'
        })
    }
}
export const removeItem = async (req, res) => {
    try {
        const itemId = req.params.item;

        ItemModel.findOneAndDelete({
            _id: itemId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: 'Failed to delete the item'
                })
            }

            if (!doc) {
                console.log(err);
                res.status(500).json({
                    message: 'Failed to get the item'
                })
            }

            res.json({
                success: true,
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to delete the item.'
        })
    }
}
export const updateItem = async (req, res) => {
    try {
        const itemId = req.params.item;

        await ItemModel.updateOne({
            _id: itemId,
        }, {
            name: req.body.name,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
        })

        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update the item'
        })
    }
}
// export const getLastItems

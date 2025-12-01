import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinaryConfig.js";

//add food item
const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }

        // Upload image to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'food_delivery',
                    resource_type: 'image'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(req.file.buffer);
        });

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: uploadResult.secure_url // Store the full Cloudinary URL
        });

        await food.save();
        res.json({ success: true, message: "Food Added", food });

    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

//listFood item
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error " })

    }

}
//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        // Extract public_id from Cloudinary URL and delete from Cloudinary
        if (food.image) {
            // Extract public_id from URL like: https://res.cloudinary.com/xxx/image/upload/v123/food_delivery/filename.jpg
            const urlParts = food.image.split('/');
            const publicIdWithExtension = urlParts.slice(-2).join('/'); // food_delivery/filename.jpg
            const publicId = publicIdWithExtension.split('.')[0]; // food_delivery/filename

            await cloudinary.uploader.destroy(publicId);
        }

        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error " })

    }

}

export { addFood, listFood, removeFood }
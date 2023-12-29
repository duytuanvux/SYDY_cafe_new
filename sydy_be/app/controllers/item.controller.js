var Item = require('../models/item.model');
var FeedbackModel = require('../models/feedback.model')

async function getAverageRating(itemId) {
    // Replace 'Feedback' with the actual model or function to fetch feedback
    const feedback = await FeedbackModel.getFeedbackForItem(itemId);
    if (feedback.length === 0) {
        return null; // No feedback available, return null or a default value
    }

    const totalRating = feedback.reduce((sum, feedbackItem) => sum + feedbackItem.rating, 0);
    const avgRating = totalRating / feedback.length
    const roundedAvgRating = Math.round(avgRating * 2) / 2;

    return roundedAvgRating;
}

exports.get_all_items = async function(req, res) {
    try {
        const items = await Item.get_all();
        const itemsWithAvgRating = await Promise.all(
            items.map(async (item) => {
                const avgRating = await getAverageRating(item.id);
                const is_visible_boolean = Boolean(item.is_visible); // Convert to boolean
                const discounts = await Item.getDiscountForItem(item.id);
                
                return { ...item, avgRating, is_visible: is_visible_boolean, discounts };
            })
        );
        res.send(itemsWithAvgRating);
    } catch (error) {
        console.error('Error getting items:', error);
        res.status(500).send('Internal Server Error');
    }
}
exports.add_item = async (req, res) => {
    try {
        const newItem = req.body;
        const result = await Item.add_item(newItem);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.edit_item = async (req, res) => {
    try {
        const itemId = req.params.itemId; 
        const updatedItemData = req.body;
        
        const result = await Item.edit_item(itemId, updatedItemData);
        
        if (result.success) {
            res.json(result.item); 
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.get_top_items = async (req, res) => {
    try {
        const data = await Item.getTopItems();
        console.log(data)
        res.json(data);
    } catch (err) {
        // Handle errors gracefully
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
    
}

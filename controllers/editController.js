const express = require('express');
const articles = require('../models/articles')
const router = express.Router();


// router.get("/edit/:id", async(req, res) => {

//     const { id } = req.params;
//     try {
//         const article = await articles.findById(id);
//         if (!article) {
//             return res.status(404).send('Article not found');
//         }

//         res.render('edit', {
//             title: article.title,
//             content: article.content,
//             name: article.author,
//             email: article.email,
//             id:article._id
//         });
//     } catch (error) {
//         console.error('Error fetching article:', error);
//         res.status(500).send('Server error');
//     }

// })

// router.post('/edit', async (req, res) => {
//     const { id, title, content } = req.body;
//     try {
//         await articles.updateOne({ _id: id }, { $set: { title, content } });
//         res.status(200).send({ message: 'Article updated successfully' });
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// });



module.exports = router;

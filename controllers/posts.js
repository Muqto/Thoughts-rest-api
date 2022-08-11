import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"
export const getPosts = async (req, res) => {
    try {
        const posts = await PostMessage.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})
    
    try {
       await newPost.save()
       res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id; 
    try {
        const deletedPost = await PostMessage.findByIdAndRemove(id)
        res.status(200).json(deletedPost)
    } catch (error) {
        res.send(error)
    }
}

export const updatePost = async (req, res) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("Invalid ID")
    }
    const updatedBody = req.body
    try {
       const updatedPost = await PostMessage.findByIdAndUpdate(id, updatedBody, {new : true})
       res.status(200).json(updatedPost)
    } catch (error) {
        res.status(404).json(error)
        console.log(error)
    }
}

export const incrementLike = async (req, res) => {
    const id = req.params.id;

    if(!req.userId) return res.json({message: 'Unautheticated'})

    try {
        const post = await PostMessage.findById(id)
        const index = post.likes.findIndex((id) => id === String(req.userId))
    if (index === -1){
        post.likes.push(req.userId)
    }
    else{
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new : true})
        res.status(200).json(updatedPost)
    } catch (error) {
        console.log(error)
    }
}
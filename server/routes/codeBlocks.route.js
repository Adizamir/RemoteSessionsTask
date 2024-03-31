const express = require('express');
const router = express.Router();
const CodeBlock = require('../models/CodeBlock.model')

//Routes
// Get All CodeBlocks
router.get('/codeblocks',async (req,res) => {
    try {
        const allCodeBlocks =  await CodeBlock.find({});
        res.status(200).json({allCodeBlocks});
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }        
});

// specific codeblock by id , all his info

router.get('/codeblocks/:id',async (req,res) => {
    try {
        const{id} = req.params;
        const CodeBlockInfo = await CodeBlock.findById(id);
        res.status(200).json({CodeBlockInfo});
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }        
});


// Post a CodeBlock
router.post('/codeBlock',async (req,res)=>{
   try {
    
     const codeblock = await CodeBlock.create(req.body);
     res.status(200).json(codeblock);

   } catch(error) {
    res.status(500).json({message: error.message});
   }
});

module.exports = router;



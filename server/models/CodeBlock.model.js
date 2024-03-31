
const mongoose = require('mongoose');

const CodeBlockSchema = mongoose.Schema(
    {
        _id: {
            type: Number,
            required: true,
            default: 1 
        },
          title: {
            type:String,
            required:[true, "Please enter CodeBlock Title"],
          },

          codeContent:{
            type:String,
            required:true,
            default: "",
          },

          codeSolution:
          {
            type:String,
            required:true,
            default: "",
          }
    },
          {
            timestamps: true,
          }
    );


    const CodeBlock = mongoose.model("CodeBlock",CodeBlockSchema);


    module.exports = CodeBlock;
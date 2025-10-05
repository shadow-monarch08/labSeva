import mongoose from 'mongoose' 
const { Schema } = mongoose

const recordSchema = new Schema({
    Unit:{
        type:String,
        required:true
    },
    Test_Name:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true
    },
    Result:{
        type:String,
        required:true
    },
    Reference_Range:{
        type:String,
        required:true
    }

})

const pastRecordSchema = new Schema({
    records:{
        type:Array  [Array[recordSchema]]
    }
})

export default pastRecordModel = new model(pastRecordSchema, "pastRecords")
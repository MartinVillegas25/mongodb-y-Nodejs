const mongoose = require('mongoose');

// para explicar los campos de referencia vamos a realizar como si fuera un curso de videos.

let videoSchema = new mongoose.Schema({
   title: String,
   // esta es la forma que ponemos un campop de referencia
   course:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Course',
       required: true
   },
   //subdocumentos, le puedo pasar un nuevo schema
   tags : [
       new mongoose.Schema({
           type: String
       })
   ]
});


mongoose.model('Video', videoSchema);


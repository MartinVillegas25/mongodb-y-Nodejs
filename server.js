const express = require('express');
const mongoose = require('mongoose');
require('./course');
require('./videos')

const Course = mongoose.model('Course');
const Video = mongoose.model('Video');




mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb+srv://cursonode:bren1234@cluster0.5jg4z.mongodb.net/test", ()=>{ console.log("me pude conectar")});
 

const app= express();

app.get("/", (req, res)=>{
    Course.find({},null,{
       limit: 2,
       skip: 1,
    }).then(doc =>{
        res.json(doc);
    }).catch(err =>{
        res.json(err);
    })  
    
})

 // creamos una funcion get que me devuelva todos los cursos que cree hasta ese momento, uso la propiedad find
app.get("/cursos",(req, res)=>{
    Course.find({}).then(docs=>{
        res.json(docs);
    }).catch(err =>{
        res.json(err);
    })
} )


app.post ('/cursos', (req, res)=>{
//aca vamos a realizar las consultas a la base de datos
// para generar un nuevo registro usamos el metodo created del model
Course.create({
    title: 'curso de mongoose',
    description: 'hola como estas'
}).then(doc => {
    res.json(doc);
}).catch(err =>{
    console.log(err);
    res.json(err);
})
})


// si queremos buscar un registro en particular, usamos el ID que cada uno tiene un valor distints
// podemos usar findByID o findOne, la diferencia que el primero busca solo por Id y el otro le podemos dar los parametros de la  busqueda( a este le pasamos un json)
app.get("/cursos/:id", (req, res)=>{
    Course.findById('60c2893ef544a6250cf07f47').then(doc =>{
            res.json(doc);
        }).catch(err =>{
            res.json(err);
        })  
        
    })


//actualizar
//podemos actualizar muchos a la vez
app.put('/cursos/:id', (req, res)=>{
     Course.updateOne({ numberOfTopics: 0}, {publishedAt: new Date()}).then(r=>{
         res.json(r);
     }).catch(err =>{
         res.json(err);
     })
        
    })
    // otra forma es findOneAndUpdate
    //otra forma es encontrar primero el documento y luego guardarlo con .save()

    // borrar registros

    app.delete('/cursos/:id', (req, res)=>{
        Course.deleteMany({ numberOfTopics: 0}).then(r=>{
            res.json(r);
        }).catch(err =>{
            res.json(err);
        })
           
       })

       //otra opcion es findByIdAndDelete que busca por el id y lo borra


app.post('/videos', (req, res)=>{
    Video.create({
        title: ' primer video',
        course: '60c2cd145c4ec915646037b3', 
       tags : [
           {
               title: 'Ruby',
           },
           {
               title:'mongodb',
           }
       ]
    }).then(video =>{
        res.json(video)
    }).catch(err =>{
        console.log(err);
        res.json(err)
    })

})    

// populate

app.get('/videos', (req, res)=>{
   Video.find().populate('course').then(videos => res.json(videos)).catch (err =>{
       console.log(err);
       res.json(err);
   })
})   

app.listen(8080, ()=>console.log("server en port 8080"));
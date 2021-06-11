const mongoose = require('mongoose');
const slugify = require('slugify');

//1- definir el esquema 
let courseSchema = new mongoose.Schema({
   //:id:objectId ya viene con mongoose: identificador unico de tu documento.
    title: {
        type:String,
        required: true
    },
    description: {
        type: String,
    },
    numberOfTopics:{ 
        type: Number,
        default: 0,
    },
    publishedAt: Date,
    slug: {
        type: String,
        required: true
    },
    video: String
});

// hay campos que no pertenecen a la base de datos, y son llamados virtuales y se define despues del esquema 
// tenes enum para poner un arreglo de lo que debe tener el apartado, maxlength o minlegth para decir el largo maximo o minimo de la caracteristica y match para poner una expresion regular que solo pasa si cumple con esa expresion
// en numeros podemos poner min o max
/* si queremos poner una validadcion personalizada lo hacemos con validator : function(value){
    return true --valido
    return false --- no se cumplio
}
tambien podemos poner un message: ' ' para poner un mje de porque no paso la validacion */ 


// courseSchema.virtual('info')
//    .get(function(){
//        //this => documento
//        return  ` ${this.description}, temas:${this.numberOfTopics}, fecha de lanzamiento: ${publishedAt}`
//    })
//    .set();


   //middlewares son funciones que podemos ejecutar antes o despues de que algo haya sucedido, se define a traves del Schema, el primer arg es el tipo de middleware y el seg argumento es la funcion 

   /*
   validate
   save
   remove
   updateOne
   deleteOne
   init =>sync
   */
//    courseSchema.post('remove', function(next){
       // this =>doc
    //    next()
       //si lo llamamos vacio todo salio bien, sino algo salio mal
//    })
   courseSchema.pre('validate', function(next){
       this.slug = slugify(this.title);
       next();
   })



   //2 definir el modelo

mongoose.model('Course', courseSchema);





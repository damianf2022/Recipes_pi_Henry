import React, { useState, useEffect } from 'react';
import { postRecipe, getDiets } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import styles from './form.module.css'
import { Link } from 'react-router-dom';


export default function RecipeCreate() {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets)
    console.log(diets)

    const [input, setInput] = useState({
        name: "",
        image: "",
        healthScore: 0,
        summary: "",
        steps: "",
        diets: []
    })

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    
    function handleSelect(e) {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }

    function handleSubmit(e) {
      
        if (!input.name || input.name.length <= 2 || input.name.length > 50) {
            e.preventDefault();
            return alert("Debe ingresar un nombre que contenga entre 2 y 50 caracteres")
        } else if (!input.diets.length) {
            e.preventDefault();
            return alert('Selecciona al menos un tipo de dieta')
        } else if (input.image.length === 0){
            e.preventDefault();
            return alert('Debe ingresar la URL de la imagen')
        }else if(!(/https:\/\/[a-zA-Z./-]+/gm).test(input.image)) {
            e.preventDefault();
            return alert('Debes ingresar una URL válida')
        } else if(!input.healthScore || input.healthScore.length <= 0 || input.healthScore.length >= 100){
            e.preventDefault();
            return alert('Debes asignar un nivel de Health Score entre 1 y 100!')
        }else if(!input.summary || input.summary.length <= 0 || input.summary.length < 20){
            e.preventDefault();
            return alert('El resumen del plato debe contener al menos 20 caracteres!')
        }else if(!input.steps || input.steps.length <= 0 || input.steps.length < 20){
            e.preventDefault();
            return alert('El campo del paso a paso debe contener al menos 20 caracteres!')
        }
        dispatch(postRecipe(input))
        alert("Tu receta ha sido creada con éxito!")
        setInput({
            name: "",
            image: "",
            healthScore: 0,
            summary: "",
            steps: "",
            diets: []
        })
    }

    function handleClear(){
        document.getElementById("miForm").reset();
        setInput({
            name: "",
            image: "",
            healthScore: 0,
            summary: "",
            steps: "",
            diets: []
        })
    }

    let handleDelete = (diet) => {
        setInput({
            ...input,
            diets: input.diets.filter(el => el !== diet)
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
            <Link to='/home' style={{ textDecoration: 'none', boxShadow: 'none' }}>
                <h1>#HenryFood</h1>
            </Link>
            </div>
            <div className={styles.cards}>
                <h2>CREÁ TU RECETA</h2>

                <form id="miForm" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <div>
                            <label>Nombre:</label>
                            <input type="text" maxlength="50" id='7' value={input.name} name="name" placeholder='Nombre de tu receta' onChange={(e) => handleChange(e)} style={{width: '300px', fontSize:'15px', textAlign:'center' }}  />
                        </div>
                        
                        <div className={styles.diets}>
                            <label>Tipos de dietas</label>
                            <select id='8' onChange={(e) => handleSelect(e)} style={{width: '300px', fontSize:'15px', textAlign: 'center'}}>
                                {console.log(diets)}
                                <option value="" hidden name="diets">Elegí los tipos de dietas:</option>
                                {
                                    diets?.map(el => {
                                        return (<option value={el.name} key={el.id}>{el.name}</option>)
                                        
                                    })
                                }
                                 
                            </select>
                            <ul style={{ listStyle: 'none' }}>
                                <li>
                                    {
                                        input.diets.map(el =>
                                            <div className={styles.delete}>
                                                <h5>
                                                    {diets?.find(p => p.name === el)?.name}
                                                    <button onClick={() => handleDelete(el)}>x</button>
                                                </h5>
                                            </div>
                                        )
                                    }
                                </li>
                            </ul>
                            {
                               
                            }
                        </div>

                        <div>
                            <label>Imagen:</label>
                            <input type="url" id='9' value={input.image} name="image" placeholder='Ingresá el URL de una imagen...' onChange={(e) => handleChange(e)} style={{width: '300px', fontSize:'15px', textAlign:'center' }} />
                        </div>

                    </div>
                    <div>

                        <div>
                            <label>Nivel de "comida saludable" :</label>
                            <input type="range" name="healthScore" onChange={handleChange} style={{ width: '70%', height: '60px', fontSize:'15px', textAlign:'center' }} min="1" max="100"  required />
                            <h5>{input.healthScore + '%'}</h5>
                        </div>
                        <br />
                        <div className={styles.summary}>
                            <label>Resumen del plato:</label>
                            <input type="text" name="summary" cols="30" rows="10" onChange={handleChange} style={{ width: '300px', height: '100px', fontSize:'15px', textAlign: 'left' }} min="20" max="500"  />
                            
                        </div>
                        <br />
                        <div className={styles.steps}>
                            <label>Paso a paso:</label>
                            <input type="text" name="steps" onChange={handleChange} style={{ width: '300px', height: '150px', fontSize:'15px' }} min="20" max="500" required/>
  
                        </div>
                    </div>
                </form>
              <button id='submit' type='submit' onClick={(e) => handleSubmit(e)}>CREAR</button>
                <button type="reset" onClick={(e) => handleClear(e)}>LIMPIAR</button>
            </div>
        </div>
    )


}


/*Ruta de creación de recetas: debe contener

[ ] Un formulario controlado con JavaScript con los siguientes campos:
Nombre
Resumen del plato
Nivel de "comida saludable" (health score)
Paso a paso
[ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
[ ] Botón/Opción para crear una nueva receta
Es requisito que el formulario de creación esté validado con JavaScript y no sólo con validaciones HTML. 
Pueden agregar las validaciones que consideren. Por ejemplo: Que el nombre de la receta no pueda contener 
símbolos, que el health score no pueda exceder determinado valor, etc. */







/*import  { 
    FormContainerSVG, 
    InputName, 
    InputSummary, 
    InputHealthScore, 
    InputScore, 
    SelectDiets, 
    InputSteps,
    ButtonSubmit, 
    P_button,
    DivDietasOn,
    DivDietas,
    ButtonCloseDiets,
    DivSubmitContainer,
}from './FormStyled.jsx';

import React from 'react';
import { useNavigate }  from 'react-router-dom'
import { getTypes, postRecipes} from '../actions/index.js';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'




// Validar que el campo nombre de mi objeto este completado antes de 
// transformarlo a json y mandarlo por body

function validate(input){
    let errors = {}
    if(!input.name) {
        errors.name = 'Name is require'
    }
    if(!input.summary) {
        errors.summary = 'Summary is require'
    }
    return errors
}


function Form() {

    const dispatch = useDispatch()
    const history = useNavigate()
    const type = useSelector((state) => state.types)     
    const allState = useSelector((state) => state.recipesAll)
    const [error, setError] = useState({})
    // console.log(allState);
    
  
    const [input, setInput] = useState({
        name: '',
        summary: '',
        score: 0, 
        healthScore: 0,
        image: 'https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg',
        steps: '',
        diets: []
    })

    useEffect(() => {
        dispatch(getTypes())
     }, [])
 
    async function handleSubmit(evt){
        evt.preventDefault()
        dispatch(postRecipes(input))
        history('/home')
    }
   

    function handleSelect(evt){
        if(!input.diets.includes(evt.target.value)){
            setInput({
                ...input,
                diets: [...input.diets, evt.target.value]
            })
        }
        console.log(input)
    }


    function handleChange(evt){
        setInput({
            ...input,
            [evt.target.name]: evt.target.value
        })
        setError(validate({
            ...input,
            [evt.target.name]:evt.target.value
        }))
        if(allState.find(recipe => recipe.name.toLowerCase() === evt.target.value.toLowerCase())){
            setError({
                ...input,
                [evt.target.name]: 'Recipe is found'
            })
        }
        console.log(input)
    }


    
    function handleNumber(evt){
        try{
            const parsValue = parseInt(evt.target.value)
            if ((Number.isInteger(parsValue)) && (parsValue >= 0) && (parsValue <= 99)){
                setInput({
                    ...input,
                    [evt.target.name]: parsValue
                })
            }
        }catch{
            console.log('error')
        }
        // console.log(input)
    }


    
    function handleDelete(evt){
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== evt)
        })
    }

 console.log(input);

    return (
        
            <>
                 <FormContainerSVG/>
                 <form onSubmit={(evt) => handleSubmit(evt)}>

                       <InputName 
                        type="text"
                        autoComplete="off"
                        value = {input.name}
                        name = 'name' 
                        placeholder='Agregar Nombre...'
                        onChange = {evt => handleChange(evt)}
                       />


                       <InputSummary  
                        type="text"
                        value = {input.summary}
                        name = 'summary'
                        placeholder='Escribe aqui el Summary...'
                        onChange = {evt => handleChange(evt)}
                        />

                       <InputScore
                        type="number"
                        value = {input.score}
                        name = 'score'
                        onChange = {evt => handleNumber(evt)}
                       />

                       <InputHealthScore
                        className= "controls"
                        type="number"
                        value = {input.healthScore}
                        name = 'healthScore'
                        onChange = {evt => handleNumber(evt)}
                       />

                       <InputSteps
                
                        type="text"
                        value = {input.steps}
                        name = 'steps'
                        placeholder='Escribe aqui los Steps...'
                        onChange = {evt => handleChange(evt)}
                       />

                
                    <SelectDiets defaultValue='Diets' onChange={(evt) => handleSelect(evt)}>
                        <option disabled>Diets</option>
                            {type?.map((type) => <option key={type.name} value={type.name}>{type.name}</option>)}
                    </SelectDiets>  

                  <DivSubmitContainer>  

                    {((input.name !== '') && (!error.name) && (input.summary !=='')) ?
                         
                             <ButtonSubmit type='submit'>Recipes Create</ButtonSubmit>
                              :  input.name === ''? <P_button>Name is require</P_button>
                              :  <P_button>Summary is require</P_button>
                      }
                  </DivSubmitContainer> 
                
                  <DivDietas>

                    {input.diets.map(
                        (el, index) => <DivDietasOn key = {index}><p>{el}</p>
                      <ButtonCloseDiets onClick={() => handleDelete(el)}>x</ButtonCloseDiets></DivDietasOn>)}
               
                 </DivDietas>
                 

                 </form>
            </>
    
    )
}

export default Form;
 */
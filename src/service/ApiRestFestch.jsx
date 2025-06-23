let cabeceros=
{
    'content-type':'application/json'
}

export async function getCategorias()
{
    let Respuesta = await fetch('https://localhost:7014/api/Categoria', {headers: cabeceros});
    const Resultado = await Respuesta.json();
    return Resultado;
}

export async function addCategorias(datos) {
       const respuesta = await fetch(`https://localhost:7014/api/Categoria/PostCategoria`, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: cabeceros
        }) 
        return await respuesta.json()
        
}

export async function editCategorias(datos, id) {

    const respuesta = await fetch(`https://localhost:7014/api/Categoria/PutCategoria/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(datos),
        headers: cabeceros
    })
    await respuesta.json()

}

export async function deleteCategorias(id) {

    const respuesta = await fetch(`https://localhost:7014/api/Categoria/DeleteCategoria/${id}`, {
        method: 'DELETE',
    })
    return await respuesta.json();

   
}
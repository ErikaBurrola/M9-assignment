export async function loadEmployees(){
     
    const myFetch = (url) => { 
        return new Promise((resolve, reject) => { 
            const xhr = new XMLHttpRequest(); 
            xhr.responseType = 'json'; 
            xhr.onreadystatechange = () => { 
                if (xhr.readyState == 4) {
                    (xhr.status == 200) ? 
                    resolve(xhr.response) : 
                    reject(new Error(`Error code: ${xhr.status}`));
                }
            };
            xhr.open('GET', url);
            xhr.send();
        }); 
    };
    
try {
      // Devolvemos la promesa, lo que nos permitirá utilizar "await" fuera de esta función
      const employees = await myFetch('../data/employees.json');
        return employees;  // Retornamos los datos de empleados
      } catch (error) {
        console.log(error);
        return [];  // Retornamos un arreglo vacío en caso de error
      }
}

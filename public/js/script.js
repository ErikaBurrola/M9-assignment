import  {loadEmployees} from './modules/init.js';


// GET DOM ELEMENTS
let empTable    = document.querySelector('#employees')
let empCount    = document.querySelector('#empCount')
let count  =  empTable.rows.length;

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
// GET DOM ELEMENTS
document.addEventListener("DOMContentLoaded",function() {
    buildGrid();
    
});


// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    count  =  empTable.rows.length;
    if (e.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let rowIndex = e.target.parentNode.parentNode.rowIndex
            // REMOVE EMPLOYEE FROM ARRAY
            empTable.deleteRow(rowIndex)
            count-=1;
         
        }
    }
    // UPDATE EMPLOYEE COUNT
    empCount.value = `(${count-1})`
})

// BUILD THE EMPLOYEES GRID
async function buildGrid() {
    let count = 0;
    let employeesData = await loadEmployees();
    let employees = employeesData.employees;
    let tbody = document.createElement('tbody')

    for(let x in employees){
        console.log("empleado:", employees); 
        tbody.innerHTML += `
        <tr>
            <td>${employees[x].id}</td>
            <td>${employees[x].name}</td>
            <td>${employees[x].ext}</td>
            <td>${employees[x].email}</td>
            <td>${employees[x].department}</td>
            <td><button class="delete" style="background-color: red;" >X</button></td> <!-- Botón en cada fila -->
        </tr>`;
        count +=1;

    }
    empTable.appendChild(tbody);  // Añade el tbody con las filas generadas

    // BIND THE TBODY TO THE EMPLOYEE TABLE*/
    empTable.appendChild(tbody)
    // UPDATE EMPLOYEE COUNT
    empCount.value = `(${count})`
}
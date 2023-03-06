$(document).ready(function(){
    //PRODUZIDO POR FERNANDOO ARTUR LUITHARDT
    async function inicio(){
        cleanLocalStorage();
        const data = await apiGet('/employees');
        if(data){
            render(data?.data)
            data?.data?.forEach((item, key) => {
                localStorage.setItem(
                    `dataEmploye-${key}`,
                    JSON.stringify(item)
                );
            })
        }
    }
    inicio()

    $(document).on('click', '#add', create);
    async function create(){
        const newEmploye = await apiPost('/create', {
            employee_name: $('#employee_name').val(),
            employee_salary: $('#employee_salary').val(),
            employee_age: $('#employee_age').val()
        });
        if(newEmploye){
            render([{
                employee_name: newEmploye?.data?.employee_name,
                employee_salary: newEmploye?.data?.employee_salary,
                employee_age: newEmploye?.data?.employee_age,
                id: newEmploye?.data?.id,
            }]);
            localStorage.setItem(
                localStorageLastKeyAvaliable(),
                JSON.stringify(item)
            );
        }
    }

    function render(data){
        data?.forEach(item => {
            const salary = parseFloat(item?.employee_salary || 0).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })
            $('#table').append(`
                <tr class="table-row" data-id="${item?.id}">
                    <td contenteditable="true" class="id">${item?.id || ''}</td>
                    <td contenteditable="true" class="employee_name">${item?.employee_name || ''}</td>
                    <td contenteditable="true" class="employee_salary">${salary}</td>
                    <td contenteditable="true" class="employee_age">${item?.employee_age || ''}</td>
                    <td class="delete-row"><button type="button" class="delete-row-button">Delete</button></td>
                </tr>
            `)
        });
    }

    $(document).on('click', '.delete-row-button',async function(){
        const id = $(this).parents('.table-row').attr('data-id');
        const deleteRow = await deleteBanco('delete', id)
        if(deleteRow){
            $(this).parents('.table-row').remove()
            localStorageFind.removeItem(localStorageFind(id))
        }
    })

    $('body').on('focusout', '.employee_name',async function() {
        const id = parseInt($(this).parents('.table-row').attr('data-id'));
        const employee_name = $(this).parents('.table-row').find('.employee_name').text();
        const employee_salary = removeNumberFormat($(this).parents('.table-row').find('.employee_salary').text().substring(2));
        const employee_age = parseInt($(this).parents('.table-row').find('.employee_age').text());
        const update = await apiPut('/update/', id, {
            name: employee_name,
            salary: employee_salary,
            age: employee_age
        })
        if(update){
            alert('atulizado com sucesso')
            localStorage.setItem(
                localStorageFind(id),
                JSON.stringify(item)
            );
        }else{
            alert('Erro da api', 'warning')
        }
    })

    function removeNumberFormat(number) {
        return typeof number == "string"
            ? parseFloat(number.split(".").join("").split(",").join("."))
            : number;
    }

    function localStorageFind(findId){
        for (var i = 0;; i++) {
            const employe = localStorage.getItem(`dataEmploye-${i}`);
            if(employe?.id == findId) return `dataEmploye-${i}`;
            if (employe === null) break;
        }
    }
    function localStorageLastKeyAvaliable(){
        for (var i = 0;; i++) {
            const employe = localStorage.getItem(`dataEmploye-${i}`);
            if (employe === null) return `dataEmploye-${i}`;
        }
    }
    function cleanLocalStorage(findId){
        for (var i = 0;; i++) {
            const employe = localStorage.getItem(`dataEmploye-${i}`);
            if (employe === null) break;
        }
    }
})
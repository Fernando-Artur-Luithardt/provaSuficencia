const apiRoute = 'https://dummy.restapiexample.com/api/v1';
function deleteBanco(route, id) {
    return new Promise((res, rej) => {
        $.ajax({
            url: `${apiRoute}/${route}/${id}`,
            type: 'DELETE',
            success: function() {
                res(true);
            },
            error: function() {
                rej(false);
            }
        });
    })
}

function apiPost(route, dataJson) {
    return new Promise((res, rej) => {
        $.ajax({
            type: "post",
            url: `${apiRoute + route}`,
            contentType: "application/json",
            data: JSON.stringify( dataJson ),
            success: function(data){
                res(data)
            },
            error: function(){
                rej('error')
            }
        })
    })
}

function apiGet(route) {
    return new Promise((res, rej) => {
        $.getJSON(`${apiRoute + route}`, function(data){
            res(data)
        }).fail(function() { rej(false); })
    })
}

function apiPut(route, id, dataJson) {
    return new Promise((res, rej) => {
        $.ajax({
            url: `${apiRoute + route + id}`,
            type: 'PUT',
            data: JSON.stringify( dataJson ),
            success: function(data) {
                res(data)
            },
            error: function(){
                rej(false)
            }
        })
    })
}
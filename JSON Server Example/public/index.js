function addPost()
{
    var id = Number(document.getElementById("idInput").value);
    var title = document.getElementById("titleInput").value;
    var author = document.getElementById("authorInput").value;

    let post ={
        "id":id,
        "title":title,
        "author":author
    } 

    fetch("http://localhost:3000/post/",{

        method:"POST",
        headers:
        {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(post)
    }).then((response) => {
        console.warn(response);
        }).then((res)=>{
        console.log(res);
    })

    getPost();
}


function editPost()
{
    var id = Number(document.getElementById("idInput").value);
    var title = document.getElementById("titleInput").value;
    var author = document.getElementById("authorInput").value;

    let post ={
        "id":id,
        "title":title,
        "author":author
    }   
    fetch("http://localhost:3000/post/"+`${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(post)
    }).then((res)=>{
        console.log(res);
    })

    getPost();
}



function getPost()
{
    fetch("http://localhost:3000/post/",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        return (res.json());
    }).then((data)=>{
        var html = '<table class="m-auto px-5 bg-secondary tables">';
        console.log(data);
       
        data.forEach(element => {
            html+= `<tr class="trs"><td class="tds text-center px-2 mx-2 " >${element.id}</td><td class="tds mx-4 px-4">${element.title}</td><td class="tds text-center mx-4 px-4 ">${element.author}</td></tr>`;
        });
        html+='</html>'
        document.getElementById("output2").innerHTML = html;
        
    }
    )
}




function deletePost()
{
    var id = Number(prompt("Enter ID"))
    var shouldDelete = false;
    fetch("http://localhost:3000/post/",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        return (res.json());
    }).then((data)=>{
       
       
        data.forEach(element => {
           if(element.id === id)
           {
               shouldDelete = true;
               
           }

        });
       
        
    }
    )
    if(shouldDelete){
    fetch("http://localhost:3000/post/"+`${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        console.log(res);
    })
    }
    else
    {
        alert("ID "+id+" does not exist");
    }
}

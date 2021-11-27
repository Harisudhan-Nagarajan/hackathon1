

//createing a div in body 
document.body.innerHTML='<div id="main-container" ></div>';
const maincotainer = document.querySelector('#main-container');

//createing  div inside main-container
const headercontainer= document.createElement('div');
headercontainer.id="header-container";
maincotainer.appendChild(headercontainer);

//createing img and heading in headercontainer
headercontainer.innerHTML=
`<img src="https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU" alt="GitHub" id="image-id">
<br /><br />
<h2 id="heading-text">GitHub</h2>`

// createing another div inside main-container
const inputcontainer = document.createElement('form');
inputcontainer.id="input-container";
maincotainer.appendChild(inputcontainer);

// createing input field and button in inputcontainer
inputcontainer.innerHTML=
`<label for="username" id="lab-user">User Name</label> 
<input type="text" id="input-text" placeholder="Please Enter Valid UserName">
<br />  
<input type="button" id="search-btn" onclick="searchh()" value="search">
<br />
`

//createing another div inside maincontainer
const datacollection = document.createElement('div');
datacollection.id="data-container";
maincotainer.appendChild(datacollection);

//github api
const GIT_URL="https://api.github.com/users/";


const repofetch2 = (data) =>{
    // repositories details
    const repo2 = document.querySelector("#repo2");
    data.forEach(element => {
        const div = document.createElement("div");
        div.id="repo-element";
        div.innerHTML=`
        <a href="${element.html_url}" target="_blank" id="repoulr">${element.name}</a> <br />
        <label for="">${element.stargazers_count} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg></label>
        <label for="">${element.forks_count} Forks</label>
        <br />`;

        repo2.appendChild(div);
    });
   
}

//fetching repo url
const repofetch1 = async (data) =>{
   await fetch(data.repos_url)
    .then((res)=> res.json())
    .then((data)=> 
    //calling repofetch2 to  return repositories details
     repofetch2(data));
}

const repofetch =  (data) =>{

    if(data.message=="Not Found"){
        datacollection.innerHTML="User Not Found"
    }
    else{
    datacollection.innerHTML=
    `<div id="firstdatacollection"><img src="${data.avatar_url}" alt="User image" id="imageurl">
    <label for="" id="name"> ${data.name}</label>
 <label for="" id="user-name"> ${data.login}</label></div>
 <hr id="line"/>
 <label for="">Repositories</label>
 <div id="repo2"></div>
 `;
 //calling repofetch1 to fetch repo ulr
   repofetch1(data);
    }
}


//onclick function
const searchh = async () =>{
    const inputtext=document.querySelector("#input-text").value;

    if(inputtext.length==0){
        datacollection.innerHTML="Please Enter the User Name";
    }
    else{
        //fetching username url
        const user_url= GIT_URL+inputtext;
         await fetch(user_url)
        .then((res)=> res.json())
        .then((data)=>{
            //calling repofetch to give user image name 
            repofetch(data);
        })
        .catch((err)=>  datacollection.innerHTML=`${err}`);
        
    }
    
    
};

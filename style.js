
let currentTab='all';
let tabActive=["bg-black","text-white"];
let tabInactive=["bg-gray-300","text-black"];




let allContainer=document.getElementById("all-container");
let interviewContainer=document.getElementById("interview-container");
let rejectedContainer=document.getElementById("rejected-container");
let emptyElement=document.getElementById("empty-state")




function switchTab(tab){
    
    const tabs=["all","interview","rejected"];
    currentTab=tab;
    for(let t of tabs){
        let tabName=document.getElementById("tab-"+t);
        if( t===tab){
            tabName.classList.remove(...tabInactive);
            tabName.classList.add(...tabActive);
        }else{
            tabName.classList.remove(...tabActive);
            tabName.classList.add(...tabInactive);
        }
    }

  
    allContainer.classList.add("hidden");
    interviewContainer.classList.add("hidden");
    rejectedContainer.classList.add("hidden");

    emptyElement.classList.add("hidden")
  

    if(tab==="all"){
        allContainer.classList.remove("hidden");
        if(allContainer.children.length<1){
            emptyElement.classList.remove("hidden") 
        }
    }else if(tab==="interview"){
        interviewContainer.classList.remove("hidden");
        if(interviewContainer.children.length<1){
            emptyElement.classList.remove("hidden") 
        }
    }else{ 
        rejectedContainer.classList.remove("hidden");
        if(rejectedContainer.children.length<1){
            emptyElement.classList.remove("hidden") 
        }
    }
}


let totalStat=document.getElementById("stat-total");
let interviewStat=document.getElementById("stat-interview");
let rejectedStat=document.getElementById("stat-rejected");
let availableStat=document.getElementById('available')


totalStat.innerText=allContainer.children.length;

switchTab(currentTab);

document.getElementById("jobs-container").addEventListener("click",function(event){
   let clickElement=event.target;
   let card=clickElement.closest(".card");
   if(!card) return; 

   if(clickElement.classList.contains("interview")){
     interviewContainer.appendChild(card);
     updateStat()
   }

   if(clickElement.classList.contains("rejected")){
    rejectedContainer.appendChild(card);
    updateStat()
   }

   if(clickElement.classList.contains("delete")){
       card.remove();
       updateStat()
  
   }
});



function updateStat(){
//     totalStat.innerText=allContainer.children.length
//     interviewStat.innerText=interviewContainer.children.length
//   rejectedStat.innerText=rejectedContainer.children.length


let count={
    all:allContainer.children.length,
    interview:interviewContainer.children.length,
    rejected:rejectedContainer.children.length
}
totalStat.innerText=count['all']
interviewStat.innerText=count['interview']
rejectedStat.innerText=count['rejected']

availableStat.innerText=count[currentTab]
if(count[currentTab]<1){
   emptyElement.classList.remove("hidden") 
}
else{
     emptyElement.classList.add("hidden") 
}
switchTab(currentTab)
}
updateStat()
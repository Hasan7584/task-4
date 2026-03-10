//  spinner part start 
const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("level-container").classList.add("hidden");
  } 
  else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("level-container").classList.remove("hidden");
  }
}
// spinner part end

// new start

let allLessons = [];
// Api load korsi
const loadLesson = () => {
   manageSpinner(true);
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
      allLessons = data.data; 
      disPlayLesson(allLessons); 

      // Page load e "All" tab active
      document.getElementById('tab-all').classList.add('bg-black','text-white');
      manageSpinner(false);
    })
}

// modal start hoise
const loadWord= async(id)=>{
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    // console.log(url)
    const res=await fetch(url)
    const details=await res.json()
    disPlayWord(details.data)
}

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }

const disPlayWord=(word)=>{
    console.log(word)
    const detailsBox=document.getElementById("details-container")
    detailsBox.innerHTML=`
    
       <div class=" mb-5 shadow-lg  bg-gray-100 p-6 gap-4 border rounded">
          <h2 class="text-2xl font-bold">${word.title}</h2> <br>
      <div class="flex  items-center gap-2 mb-2" >
             <button class="bg-green-500 p-2 rounded-xl">${word.status}</button> 
         <p>${word.assignee}</p>
         <p>${word.createdAt}</p> </div>
         <div>
   ${word.labels?.[0] ? `<button class="bg-red-200 px-2 py-1 rounded">${word.labels[0]}</button>` : ''}
   ${word.labels?.[1] ? `<button class="bg-blue-200 px-2 py-1 rounded">${word.labels[1]}</button>` : ''}
         </div>
        <p class="text-sm">${word.description}</p>
        <div class="flex justify-between " >
         <p class="text-md font-semi-bold">Assignee: <br>
         ${word.assignee}</p>
          <p class="text-md font-semi-bold">Priority: <br>
         ${word.priority}</p>
      </div>
    `
    document.getElementById("word_modal").showModal()
}
// modal part ses hoise

const disPlayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    
    // card modde lcon jonno code start
let statusImg = "";
if (lesson.status === "open") {
    
  statusImg = "./assets/Open-Status.png";    
} else if (lesson.status === "closed") {
  statusImg = "./assets/Closed-Status.png";   
}
//  card modde lcon jonno code end

// dynamic babe card api teke banaisi
    const btnDiv = document.createElement("div");
    btnDiv.className = `
      border-t-4 
      ${lesson.status === "open" ? "border-green-500" : "border-purple-500"}
      bg-white p-4 rounded shadow
      cursor-pointer
    `;
    
    btnDiv.innerHTML = `
      <div class=" mb-5 shadow-lg bg-gray-100 p-6 h-90 gap-4 border rounded"
       onclick="loadWord(${lesson.id})">
        <div class="flex justify-between">
          <button> <img src="${statusImg}" class="w-6 h-6"></button>
          <button class="rounded-lg p-2 bg-pink-300">${lesson.priority}</button>
        </div>
        <h2 class="text-xl">${lesson.title}</h2>
        <p class="text-sm">${lesson.description}</p>
        <div class="flex gap-2 mt-2">
          ${lesson.labels?.[0] ? `<button class="bg-red-200 px-2 py-1 rounded">${lesson.labels[0]}</button>` : ''}
          ${lesson.labels?.[1] ? `<button class="bg-blue-200 px-2 py-1 rounded">${lesson.labels[1]}</button>` : ''}
        </div>
        <p class="mt-2 font-semibold">${lesson.status}</p>
        <p class="mt-2 text-sm text-gray-700">${lesson.author}</p>
        <p class="text-sm text-gray-500">${new Date(lesson.updatedAt).toLocaleDateString()}</p>
      </div>     
    `;
    levelContainer.append(btnDiv);
  }
}

// Tab switch + bg-color change+ filter
const switchTab = (tab) => {
  // সব button reset
  document.querySelectorAll('#tab-all, #tab-opened, #tab-closed').forEach(b => {
    b.classList.remove('bg-black', 'text-white');
    // b.classList.add('bg-red', 'text-black');
  });

  // clicked button active
  document.getElementById(`tab-${tab}`).classList.add('bg-black', 'text-white');
  // data filter 1=lesson 
  if (tab === "all") disPlayLesson(allLessons);
  else if (tab === "opened") disPlayLesson(allLessons.filter(l => l.status === "open"));
  else if (tab === "closed") disPlayLesson(allLessons.filter(l => l.status === "closed"));
}

// Search function kas start
const searchIssue = () => {
  const query = document.getElementById("search-input").value.toLowerCase();
  const filtered = allLessons.filter(lesson => 
    lesson.title.toLowerCase().includes(query) || lesson.description.toLowerCase().includes(query)
  );
  disPlayLesson(filtered);
}


loadLesson();
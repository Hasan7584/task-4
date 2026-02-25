1️⃣ getElementById vs getElementsByClassName vs querySelector / querySelectorAll
🔹 getElementById("id")
একটাই element return করে
শুধু id দিয়ে কাজ করে
দ্রুত (fastest)
Return type: Element
Js
Copy code
let box = document.getElementById("myBox");
🔹 getElementsByClassName("class")
একই class থাকলে একাধিক element return করে
Return type: HTMLCollection
Live collection (DOM change হলে auto update হয়)
Js
Copy code
let items = document.getElementsByClassName("item");
🔹 querySelector()
CSS selector ব্যবহার করে
শুধু প্রথম matching element return করে
Return type: Element
Js
Copy code
let box = document.querySelector(".item");
🔹 querySelectorAll()
সব matching element return করে
Return type: NodeList
Static (auto update হয় না)
Js
Copy code
let items = document.querySelectorAll(".item");
✅ মূল পার্থক্য
Method
Return
কয়টা Element
Live/Static
getElementById
Element
1
Live
getElementsByClassName
HTMLCollection
Many
Live
querySelector
Element
1
Static
querySelectorAll
NodeList
Many
Static
2️⃣ DOM এ নতুন Element তৈরি ও Insert করা


Step 1: Create
Js
Copy code
let div = document.createElement("div");
Step 2: Content যোগ করা
Js
Copy code
div.innerText = "Hello JS";
Step 3: Insert করা
Js
Copy code
document.body.appendChild(div);
অথবা
Js
Copy code
parent.append(div);


3️⃣ Event Bubbling কী?

Event bubbling মানে event নিচের element থেকে উপরের parent এ যেতে থাকে।
উদাহরণ:
Html
Copy code
<div id="parent">
  <button id="child">Click</button>
</div>
Js
Copy code
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent Clicked");
});

document.getElementById("child").addEventListener("click", () => {
  console.log("Child Clicked");
});
👉 Button এ click করলে output হবে:
Copy code

Child Clicked
Parent Clicked
কারণ event নিচ থেকে উপরে bubble হয়।


4️⃣ Event Delegation কী? কেন দরকার?


Event Delegation মানে parent element এ event লাগিয়ে child গুলো control করা।
কেন দরকার?
Memory save হয়
Dynamic element এ কাজ করে
Code clean থাকে
উদাহরণ:
Js
Copy code
document.getElementById("parent").addEventListener("click", function(e){
   if(e.target.tagName === "BUTTON"){
       console.log("Button clicked");
   }
});
👉 এখানে সব button এর জন্য আলাদা listener লাগাতে হয় না।
5️⃣ preventDefault() vs stopPropagation()



🔹 preventDefault()
Default behaviour বন্ধ করে।
উদাহরণ:
Js
Copy code
form.addEventListener("submit", function(e){
   e.preventDefault();
});

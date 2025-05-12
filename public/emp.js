let getall = document.getElementById('getall');
let insert = document.getElementById('insert');

getall.addEventListener("click", () => {
    location.href = "http://localhost:8181/employee/getall";
});
insert.addEventListener("click", () => {
    location.href = "http://localhost:8181/employee/insertone";
});

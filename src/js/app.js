"use strict";

window.onload = async () => {
    /* const thCodeElement = document.getElementById("table-code");
    const thNameElement = document.getElementById("table-name");
    const thProgElement = document.getElementById("table-prog"); */

    /* const thElements = document.getElementsByTagName("th");
    
    thElements.forEach((th) => {
        th.addEventListener("click", () => sortCourses(th.innerHTML));
        console.log(th);
    }); */

    const url = "https://dahlgren.miun.se/ramschema_ht23.php";
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();

        createTable(data);
    } else {
        console.log("ERROR: " + response.statusText);
    }
}

function createTable(courses) {
    const tableElement = document.getElementsByTagName("tbody")[0];

    courses.forEach((course) => {
        tableElement.appendChild(createTableRow(course));
    });
}

function createTableRow(course) {
    const trElement = document.createElement("tr");

    const codeElement = document.createElement("td");
    const codeText = document.createTextNode(course.code);
    codeElement.appendChild(codeText);

    const nameElement = document.createElement("td");
    const nameText = document.createTextNode(course.coursename);
    nameElement.appendChild(nameText);

    const progElement = document.createElement("td");
    const progText = document.createTextNode(course.progression);
    progElement.appendChild(progText);

    trElement.appendChild(codeElement);
    trElement.appendChild(nameElement);
    trElement.appendChild(progElement);

    return trElement;
}
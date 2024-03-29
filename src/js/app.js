"use strict";

window.onload = async () => {
    const url = "https://dahlgren.miun.se/ramschema_ht23.php";
    const response = await fetch(url);

    if (response.ok) {
        let data = await response.json();
        
        const inputElement = document.getElementById("search-input");
        inputElement.addEventListener("keyup", () => {
            createTable(searchCourses(inputElement.value.toLowerCase(), data));
        });
        
        Array.from(document.getElementsByTagName("th")).forEach((title) => {
            title.onclick = () => {
                createTable(sortCourses(title.id, searchCourses(inputElement.value.toLowerCase(), data)));
            }
        });

        createTable(data);
    } else {
        console.log("ERROR: " + response.statusText);
    }
}

function searchCourses(input, courses) {
    return courses.filter(course => {
        return course.code.includes(input) || course.coursename.toLowerCase().includes(input);
    });
}

function resetColumns(a, b, c) {
    a.setAttribute("data-sortOrder", "asc");
    b.setAttribute("data-sortOrder", "default");
    c.setAttribute("data-sortOrder", "default");
}

function sortCourses(choice, courses) {
    const codeElement = document.getElementById("table-code");
    const nameElement = document.getElementById("table-name");
    const progElement = document.getElementById("table-prog");

    switch (choice) {
        case "table-code":
            if (codeElement.getAttribute("data-sortOrder") != "asc") {
                courses.sort((a, b) => (a.code > b.code) ? 1 : -1);
                resetColumns(codeElement, nameElement, progElement);
            } else {
                courses.sort((a, b) => (a.code < b.code) ? 1 : -1);
                codeElement.setAttribute("data-sortOrder", "desc");
            }
            
            break;
        case "table-name":
            if (nameElement.getAttribute("data-sortOrder") != "asc") {
                courses.sort((a, b) => (a.coursename > b.coursename) ? 1 : -1);
                resetColumns(nameElement, codeElement, progElement);
            } else {
                courses.sort((a, b) => (a.coursename < b.coursename) ? 1 : -1);
                nameElement.setAttribute("data-sortOrder", "desc");
            }
        
            break;
        case "table-prog":
            if (progElement.getAttribute("data-sortOrder") != "asc") {
                courses.sort((a, b) => (a.progression > b.progression) ? 1 : -1);
                resetColumns(progElement, codeElement, nameElement);
            } else {
                courses.sort((a, b) => (a.progression < b.progression) ? 1 : -1);
                progElement.setAttribute("data-sortOrder", "desc");
            }
            
            break;
        default:
            console.log("INVALID CHOICE-ID");
    }

    return courses;
}

function createTable(courses) {
    const tableElement = document.getElementsByTagName("tbody")[0];
    tableElement.innerHTML = "";

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

    trElement.onclick = () => window.open(course.syllabus, "_blank");

    return trElement;
}
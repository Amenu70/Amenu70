let form = document.getElementById('myForm');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    myFunction();
});


function myFunction() {
    let tableBody = document.getElementById('tbodyPatientsList');
    let row = tableBody.insertRow();
    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();
    let cell4 = row.insertCell();
    let cell5 = row.insertCell();
    let cell6 = row.insertCell();
    let cell7 = row.insertCell();

    cell1.innerHTML = document.getElementById("patientIdNumber").value;
    cell2.innerHTML = document.getElementById("firstName").value;
    cell3.innerHTML = document.getElementById("middleInitials").value;
    cell4.innerHTML = document.getElementById("lastName").value;
    cell5.innerHTML = document.getElementById("dateOfBirth").value;
    cell6.innerHTML = document.getElementById("ddlDepartment").value;
    cell7.innerHTML = document.querySelector('input[name="radioIsOutPatient"]:checked').value;
}


let showElederlycheckBox = document.getElementById('chkElderlyPatients');
showElederlycheckBox.addEventListener('change', function () {
    let tbody = document.getElementById('tbodyPatientsList');
    let rows = tbody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let dateOfBirthCell = row.cells[4];
        let dateOfBirth = new Date(dateOfBirthCell.textContent);
        let age = calculateAge(dateOfBirth);

        if (showElederlycheckBox.checked) {
            if (age < 65) {
                row.style.display = 'none'; // Hide non-elderly patients
            } else {
                row.style.display = ''; // Show elderly patients
            }
        } else {
            row.style.display = ''; // Show all patients
        }
    }
});

function calculateAge(dateOfBirth) {
    let today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    let monthDiff = today.getMonth() - dateOfBirth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
        age--;
    }

    return age;
};


let showOutPatientcheckBox = document.getElementById('chkShowOutPatients');
showOutPatientcheckBox.addEventListener('change', function () {
    let tbody = document.getElementById('tbodyPatientsList')
    let rows = tbody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let outPatient = row.cells[6];
        if (showOutPatientcheckBox.checked) {
            if (outPatient.textContent === 'No') {
                row.style.display = 'none'
            }
            else {
                row.style.display = '';
            }
        }
        else {
            row.style.display = '';
        }
        
    }
});
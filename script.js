
var chemicalSuppliesData = [
    {
        "id": 1,
        "chemical_name": "Ammonium Persulfate",
        "vendor": "LG Chem",
        "density": 3525.92,
        "viscosity": 60.63,
        "packaging": "Bag",
        "pack_size": 100.00,
        "unit": "kg",
        "quantity": 6495.18
    },
    {
        "id": 2,
        "chemical_name": "Caustic Potash",
        "vendor": "Formosa",
        "density": 3172.15,
        "viscosity": 48.22,
        "packaging": "Bag",
        "pack_size": 100.00,
        "unit": "kg",
        "quantity": 8751.90
    },
    {
        "id": 3,
        "chemical_name": "Dimethylaminopropylamino",
        "vendor": "LG Chem",
        "density": 8435.37,
        "viscosity": 12.62,
        "packaging": "Barrel",
        "pack_size": 75.00,
        "unit": "L",
        "quantity": 5964.61
    },
    {
        "id": 4,
        "chemical_name": "Mono Ammonium Phosphate",
        "vendor": "Sinopec",
        "density": 1597.65,
        "viscosity": 76.51,
        "packaging": "Bag",
        "pack_size": 105.00,
        "unit": "kg",
        "quantity": 8183.73
    },
    {
        "id": 5,
        "chemical_name": "Ferric Nitrate",
        "vendor": "DowDuPont",
        "density": 364.04,
        "viscosity": 14.90,
        "packaging": "Bag",
        "pack_size": 105.00,
        "unit": "kg",
        "quantity": 4154.33
    },
    {
        "id": 6,
        "chemical_name": "n-Pentane",
        "vendor": "Sinopec",
        "density": 4535.26,
        "viscosity": 66.76,
        "packaging": "N/A",
        "pack_size": "N/A",
        "unit": "t",
        "quantity": 6272.34
    },
    {
        "id": 7,
        "chemical_name": "Glycol Ether PM",
        "vendor": "LG Chem",
        "density": 6495.18,
        "viscosity": 72.12,
        "packaging": "Bag",
        "pack_size": 250.00,
        "unit": "kg",
        "quantity": 8749.54
    },
    {
        "id": 8,
        "chemical_name": "Sodium Hydroxide",
        "vendor": "BASF",
        "density": 2185.52,
        "viscosity": 25.43,
        "packaging": "Bag",
        "pack_size": 100.00,
        "unit": "kg",
        "quantity": 7253.84
    },
    {
        "id": 9,
        "chemical_name": "Hydrogen Peroxide",
        "vendor": "LG Chem",
        "density": 1425.65,
        "viscosity": 18.92,
        "packaging": "Barrel",
        "pack_size": 200.00,
        "unit": "L",
        "quantity": 5496.30
    },
    {
        "id": 10,
        "chemical_name": "Sulfuric Acid",
        "vendor": "DuPont",
        "density": 3685.43,
        "viscosity": 52.15,
        "packaging": "Tank",
        "pack_size": 500.00,
        "unit": "L",
        "quantity": 9632.10
    },
    {
        "id": 11,
        "chemical_name": "Acetone",
        "vendor": "Formosa",
        "density": 1432.21,
        "viscosity": 30.47,
        "packaging": "Drum",
        "pack_size": 200.00,
        "unit": "L",
        "quantity": 6524.35
    },
    {
        "id": 12,
        "chemical_name": "Sodium Bicarbonate",
        "vendor": "Sinopec",
        "density": 2595.24,
        "viscosity": 40.78,
        "packaging": "Bag",
        "pack_size": 50.00,
        "unit": "kg",
        "quantity": 5643.89
    },
    {
        "id": 13,
        "chemical_name": "Methyl Ethyl Ketone",
        "vendor": "LG Chem",
        "density": 1712.92,
        "viscosity": 35.41,
        "packaging": "Barrel",
        "pack_size": 150.00,
        "unit": "L",
        "quantity": 7334.71
    },
    {
        "id": 14,
        "chemical_name": "Sodium Chloride",
        "vendor": "DowDuPont",
        "density": 1542.65,
        "viscosity": 29.43,
        "packaging": "Bag",
        "pack_size": 100.00,
        "unit": "kg",
        "quantity": 8451.23
    },
    {
        "id": 15,
        "chemical_name": "Ammonium Chloride",
        "vendor": "Formosa",
        "density": 1825.39,
        "viscosity": 45.32,
        "packaging": "Bag",
        "pack_size": 75.00,
        "unit": "kg",
        "quantity": 7621.49
    }
]
var alertTimeout; // Variable to store the timeout ID
var tempData = JSON.parse(JSON.stringify(chemicalSuppliesData)); // Store the temperory data
var currentSelectedIndex = -1;
var selectedIds = {}; // key -> object_id | value -> index at which it is present in the array
var tableContent = document.getElementById("tableContent");
let lastElement = null; // last selected column for sorting purpose

function addRow() {
    // Create a new row object with default values and a unique ID
    const newRow = {
        id: Math.floor(Math.random() * 100000), // Unique random ID
        chemical_name: "--",
        vendor: "--",
        density: "--",
        viscosity: "--",
        packaging: "--",
        pack_size: "--",
        unit: "--",
        quantity: "--",
        isEditable: true
    };

    // Add the new row to the tempData array
    selectedIds[newRow.id] = tempData.length;
    tempData.push(newRow);
    // Refresh the table with the updated data
    getData(tempData, "New row added\nPlease add the content", true);
}


function saveData() {

    // Saving editable content if any
    Object.entries(selectedIds).forEach(([id, index]) => {
        if (!tempData[index]['isEditable']) {
            return;
        }
        // Get the editable content using the table row and index
        const row = document.querySelector(`tr[index="${index}"]`);

        if (row) {
            const cells = row.querySelectorAll('td');

            // Update the respective fields in the tempData array
            tempData[index].chemical_name = cells[1].textContent.trim();
            tempData[index].vendor = cells[2].textContent.trim();
            tempData[index].density = parseFloat(cells[3].textContent.trim());
            tempData[index].viscosity = parseFloat(cells[4].textContent.trim());
            tempData[index].packaging = cells[5].textContent.trim();
            tempData[index].pack_size = parseFloat(cells[6].textContent.trim());
            tempData[index].unit = cells[7].textContent.trim();
            tempData[index].quantity = parseFloat(cells[8].textContent.trim());

            // After saving, deleting 'isEditable' so the row is no longer editable
            delete tempData[index].isEditable;
        }
    });

    // Reset the data--------------
    selectedIds = {};
    if (lastElement) {
        lastElement.removeAttribute('order'); // Remove the 'order' attribute from the previous column selected for sorting
        lastElement.querySelector('.arrow').innerHTML = ''; // Reset the arrow content for the previous column
    }
    // ---------------------------------------------
    // Refresh the table with the updated data
    chemicalSuppliesData = JSON.parse(JSON.stringify(tempData));
    getData(tempData, "Data Saved Successfully", true);
}

function editRow() {
    if (Object.keys(selectedIds).length === 0) {
        return;
    }
    var lock = 0;
    var exitFunction = 0;
    Object.entries(selectedIds).forEach(([key, value]) => {
        // case when we've already selected editable rows and made some changes, now again we want to edit some other selected rows for that to give an alert that previous changes would be removed if proceed further 
        if (tempData[value].hasOwnProperty('isEditable') && lock === 0) {
            if (confirm('Unsaved Changes will be removed') === true) {
                lock = 1;
            } else {
                exitFunction = 1;
                lock = 1;
                return;
            }
        }
        if (exitFunction === 1) {
            return;
        }
        tempData[value]['isEditable'] = true;
    })
    if (exitFunction === 1) {
        return;
    }
    getData(tempData, 'Content is made editable', true);
}

function changeRowPosition(pos) {
    var currIndex;
    var selectedRowsLength = Object.keys(selectedIds).length;

    if (selectedRowsLength != 1) {
        alert("Please Select 1 row");
        return;
    } else {
        currIndex = Object.values(selectedIds)[0];
    }

    // Reset the sorted data------------
    if (lastElement) {
        lastElement.removeAttribute('order');
        lastElement.querySelector('.arrow').innerHTML = '';
    }
    //-------------------------------------------------------

    var swapIndex;

    if (pos === 'down') {
        swapIndex = currIndex + 1;
    } else {
        swapIndex = currIndex - 1;
    }

    if (swapIndex === -1 || swapIndex === tempData.length) {
        return;
    }
    swapRow(swapIndex, currIndex);
}

function swapRow(swapIndex, currIndex) {
    var temp = tempData[swapIndex];
    tempData[swapIndex] = tempData[currIndex];
    tempData[currIndex] = temp;
    // Now currIndex points to swapIndex
    currentSelectedIndex = swapIndex;
    getData(tempData);

}

function deleteRows() {
    var selectedRowsLength = Object.keys(selectedIds).length;
    if (selectedRowsLength === 0) {
        alert("No Row Selected");
        return;
    }

    var deletedRows = tempData.filter((item) => {
        return (selectedIds.hasOwnProperty(item.id));
    });

    if (!confirm(`${deletedRows.length} ${deletedRows.length === 1 ? 'Row' : 'Rows'} will be deleted.\nAre You Sure you want to delete`)) {
        return;
    }

    tempData = tempData.filter((item) => {
        return !(selectedIds.hasOwnProperty(item.id));
    });
    selectedIds = {};
    getData(tempData, `${deletedRows.length} ${deletedRows.length === 1 ? 'Row' : 'Rows'} Deleted Successfully`, true);
}

function selectRow(event) {
    const clickedRow = event.currentTarget;
    var key = clickedRow.getAttribute('_id'); // id of the selected row
    var currentSelectedIndex = parseInt(clickedRow.getAttribute('index'));

    if (tempData[currentSelectedIndex]['isEditable']) { // no toggling for editable content
        return;
    }
    
    clickedRow.classList.toggle('row_selected');

    if (!selectedIds.hasOwnProperty(key)) {
        selectedIds[key] = currentSelectedIndex;
    } else {
        if (selectedIds.hasOwnProperty(key)) {
            delete selectedIds[key]; // Remove the key if the value is 1 (deselect the row)
        } else {
            selectedIds[key] = currentSelectedIndex;
        }
    }
    if (Object.keys(selectedIds).length === 0) {
        currentSelectedIndex = -1;
    }
}

function changeOrder(event) {
    const element = event.currentTarget;
    if (lastElement && lastElement !== element) {
        lastElement.removeAttribute('order'); // Remove the 'order' attribute from the previous column selected for sorting
        lastElement.querySelector('.arrow').innerHTML = ''; // Reset the arrow content for the previous column
    }

    // Get the current 'order' attribute value
    let orderValue = element.getAttribute('order');
    let key = element.getAttribute('key'); // get the column name for sorting purpose
    const arrowSpan = element.querySelector('.arrow');

    if (orderValue === '0') {
        element.setAttribute('order', '1');
        arrowSpan.innerHTML = '&#8593;'; // Change the text of the last span to an upward arrow (descending order)
        tempData = customSort(tempData, key, 1); // Sort data in desc order
    } else {
        element.setAttribute('order', '0');
        arrowSpan.innerHTML = '&#8595;'; // Change the text of the last span to a downward arrow (ascending order)
        tempData = customSort(tempData, key, 0); //Sort the data in asc order
    }

    getData(tempData);
    lastElement = element;
}

function customSort(data, key, order) {
    return data.sort((a, b) => {
        let valueA = a[key];
        let valueB = b[key];

        // Converting non-numeric strings like "N/A" to a very low or high value
        const isANonNumeric = isNaN(valueA) || valueA === "N/A";
        const isBNonNumeric = isNaN(valueB) || valueB === "N/A";

        // Edge case -> where either value is non-numeric
        if (isANonNumeric && !isBNonNumeric) {
            return order === 0 ? 1 : -1; // If sorting in ascending order, "N/A" goes to the bottom
        } else if (!isANonNumeric && isBNonNumeric) {
            return order === 0 ? -1 : 1; // If sorting in ascending order, numbers come before "N/A"
        }

        // Handle numbers and strings differently
        if (typeof valueA === 'string') {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
        } else {
            valueA = parseFloat(valueA);
            valueB = parseFloat(valueB);
        }
        if (order === 0) {
            // Ascending order
            return valueA > valueB ? 1 : -1;
        } else {
            // Descending order
            return valueA < valueB ? 1 : -1;
        }
    });
}

function getData(data, msg, showMsg) {
    var tableHtmlChunk = ``;
    data.forEach((item, index) => {
        if (selectedIds.hasOwnProperty(item.id)) {
            selectedIds[item.id] = index;
            currentSelectedIndex = index;
        }
        tableHtmlChunk += `<tr class="row ${selectedIds.hasOwnProperty(item.id) ? 'row_selected' : ''} ${item.isEditable ? 'row_editable' : ''}" index=${index} _id=${item.id} onclick="selectRow(event)">
                            <td>${index}</td>
                            <td style="border-right: 1px solid #dddddd;" contenteditable=${item.isEditable ? true : false}>${item.chemical_name}</td>
                            <td contenteditable=${item.isEditable ? true : false}>${item.vendor}</td>
                            <td style="border: 1px solid #dddddd;" contenteditable=${item.isEditable ? true : false}>${item.density}</td>
                            <td style="border: 1px solid #dddddd;" contenteditable=${item.isEditable ? true : false}>${item.viscosity}</td>
                            <td contenteditable=${item.isEditable ? true : false}>${item.packaging}</td>
                            <td contenteditable=${item.isEditable ? true : false}>${item.pack_size}</td>
                            <td contenteditable=${item.isEditable ? true : false}>${item.unit}</td>
                            <td style="border: 1px solid #dddddd;" contenteditable=${item.isEditable ? true : false}>${item.quantity}</td>
                        </tr>`;
    });
    tableContent.innerHTML = tableHtmlChunk;
    if (showMsg) {
        if (alertTimeout) {
            clearTimeout(alertTimeout); // Clear any previous timeout
        }

        alertTimeout = setTimeout(() => {
            alert(msg);
        }, 500);

    }
}

function refreshData() {
    // Reset the data--------------
    selectedIds = {};

    if (lastElement) {
        lastElement.removeAttribute('order'); // Remove the 'order' attribute from the previous column selected for sorting
        lastElement.querySelector('.arrow').innerHTML = ''; // Reset the arrow content for the previous column
    }
    //-----------------------------------
    tempData = JSON.parse(JSON.stringify(chemicalSuppliesData));
    var msg = "Data Refreshed Successfully";
    getData(tempData, msg, true);
}

getData(tempData);

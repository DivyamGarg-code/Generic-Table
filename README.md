<h1>Chemical Supplies Data Table</h1>
    
<p>This project is a web-based interactive data table for managing chemical supplies. The table includes features like adding new rows, editing existing ones, sorting columns, moving rows up/down, deleting rows, and saving data. It also allows the user to refresh the table data. The table is initialized with sample data and allows operations on the fly.</p>
<h2>Table of Contents</h2>
<ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#functions">Functions</a></li>
</ul>

<h2 id="features">Features</h2>
<ul>
    <li><strong>Add Row</strong>: Add a new row with default values.</li>
    <li><strong>Edit Row</strong>: Enable editing for selected rows.</li>
    <li><strong>Move Rows</strong>: Change the position of selected rows (up or down).</li>
    <li><strong>Delete Rows</strong>: Delete selected rows from the table.</li>
    <li><strong>Sorting</strong>: Sort the data by clicking the column headers.</li>
    <li><strong>Refresh Data</strong>: Reset the table to its original state.</li>
    <li><strong>Save Data</strong>: Save the changes made to the table.</li>
</ul>

<h2 id="functions">Functions</h2>

<h3><code>addRow()</code></h3>
<p>Adds a new row with default values (<code>--</code>) for each field. The new row is marked as editable, allowing the user to input values.</p>

<h3><code>saveData()</code></h3>
<p>Saves the editable rows by updating the temporary data (<code>tempData</code>) with the user's input. Resets the <code>selectedIds</code> object to clear selected rows and sorts state. Updates the table with saved data.</p>

<h3><code>editRow()</code></h3>
<p>Makes the selected row(s) editable. Displays an alert if any previous unsaved changes exist before proceeding. Adds the <code>isEditable</code> property to the selected rows to enable content editing.</p>

<h3><code>changeRowPosition(pos)</code></h3>
<p>Moves the selected row up or down depending on the input <code>pos</code> (<code>up</code> or <code>down</code>). Ensures that only one row is selected when moving.</p>

<h3><code>swapRow(swapIndex, currIndex)</code></h3>
<p>Helper function to swap two rows in the <code>tempData</code> array and update the table accordingly.</p>

<h3><code>deleteRows()</code></h3>
<p>Deletes the selected row(s) from the table. Displays a confirmation prompt before deletion.</p>

<h3><code>selectRow(event)</code></h3>
<p>Toggles the selection state of a row. Manages row selection for editing, moving, or deleting operations.</p>

<h3><code>changeOrder(event)</code></h3>
<p>Sorts the data based on the column header clicked. Supports ascending and descending order toggling. Resets the previously sorted column to maintain clean UI.</p>

<h3><code>customSort(data, key, order)</code></h3>
<p>A custom sorting function that sorts the table data based on the <code>key</code> (column). Handles both numeric and string values and special cases like "N/A" for missing data.</p>

<h3><code>getData(data, msg, showMsg)</code></h3>
<p>Updates the HTML table based on the provided data. Optionally displays a message (<code>msg</code>) in an alert box if <code>showMsg</code> is <code>true</code>.</p>

<h3><code>refreshData()</code></h3>
<p>Resets the table to its initial state (reloading the original data). Clears any selected rows or sorting order applied.</p>

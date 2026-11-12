/* =========================================================
   RENTAL DATA AND UI STATE
   ========================================================= */

/*
 * Tracks whether the additional ADA pricing column
 * is currently displayed in the table.
 */
let column = false;

/*
 * IDs of the rental filter controls.
 * These are used to highlight the active selection.
 */
const RentalType = [
    'Stroller',
    'ADA'
];


/* =========================================================
   RENTAL DISPLAY
   ========================================================= */

/*
 * Updates the Rentals page based on the selected product type.
 *
 * Available selections:
 * - Stroller
 * - ADA
 *
 * The function updates:
 * - Page heading
 * - Description
 * - Pricing table
 * - Product imagery
 * - Active filter styling
 */
function Rental(type) {

    const btext =
        document.getElementById("LogoText");

    const bottomText =
        document.getElementById("bottomText");

    const Rtype =
        document.getElementById("RentalType");

    const tableH =
        document.querySelector('.ProductDescription');

    const tbody =
        document.querySelector('#dataTable tbody');


    /* =====================================================
       ADA RENTALS
       ===================================================== */

    if (type === 'ADA') {

        tableH.textContent =
            'ADA Options';

        /*
         * ADA rentals use an additional pricing column.
         * Add it only if it is not already displayed.
         */
        if (!column) {
            addColumn();
        }

        column = true;

        document.querySelector(
            "#dataTable tr th:nth-child(3)"
        ).textContent = "ENHANCED";

        btext.textContent =
            'Wheelchair / ECV Rentals';

        bottomText.textContent =
            'SAMPLE PRICING FOR PORTFOLIO DEMONSTRATION ONLY.';

        Rtype.textContent =
            'Wheelchairs and Electric Convenience Vehicles (ECVs) ' +
            'are available to rent near participating destination entrances.';

        tbody.innerHTML = '';

        const row = `
            <tr>
                <td>
                    <div class='bigfont'>
                        <img
                            src="./images/SampleWheelchair.png"
                            alt="Wheelchair"
                            width="190">
                        Wheelchair
                    </div>
                </td>

                <td>$18.00</td>

                <td>N/A</td>
            </tr>

            <tr>
                <td>
                    <div class='bigfont'>
                        <img
                            src="./images/SampleECV.png"
                            alt="Electric Convenience Vehicle"
                            width="190">
                        Electric Convenience Vehicle
                    </div>
                </td>

                <td>$68.00</td>

                <td>$88.00</td>
            </tr>
        `;

        tbody.insertAdjacentHTML(
            'beforeend',
            row
        );
    }


    /* =====================================================
       STROLLER RENTALS
       ===================================================== */

    if (type === 'Stroller') {

        column = false;

        tableH.textContent =
            'PICK YOUR STROLLER STYLE';

        btext.textContent =
            'Strollers';

        bottomText.textContent =
            'SAMPLE PRICING FOR PORTFOLIO DEMONSTRATION ONLY. ' +
            'QUANTITIES MAY BE LIMITED. RESTRICTIONS MAY APPLY.';

        Rtype.textContent =
            'Convenient stroller rentals are available for use ' +
            'throughout participating areas of the destination.';

        tbody.innerHTML = '';

        /*
         * ADA includes an additional pricing column.
         * Remove it when returning to Strollers.
         */
        deleteColumnIfExists('ENHANCED');

        const row = `
            <tr>
                <td>
                    <div class='bigfont'>
                        <img
                            src="./images/SampleStroller.png"
                            alt="Stroller"
                            width="190">
                        Stroller
                    </div>
                </td>

                <td>$35.00</td>
            </tr>
        `;

        tbody.insertAdjacentHTML(
            'beforeend',
            row
        );
    }


    /*
     * Highlight the selected rental filter.
     */
    used(
        RentalType,
        type
    );
}


/* =========================================================
   TABLE COLUMN UTILITIES
   ========================================================= */

/*
 * Adds an additional column to the table.
 *
 * The ADA view uses this column to display
 * a second sample rental option/price.
 */
function addColumn() {

    const table =
        document.getElementById("dataTable");

    const rows =
        table.rows;

    for (let i = 0; i < rows.length; i++) {

        const cell =
            i === 0
                ? document.createElement('th')
                : document.createElement('td');

        /*
         * The temporary content is replaced when
         * the ADA table is rendered.
         */
        cell.textContent =
            i === 0
                ? `Header ${rows[0].cells.length + 1}`
                : `Row ${i}, Col ${rows[i].cells.length + 1}`;

        rows[i].appendChild(cell);
    }
}


/*
 * Finds a table column by its header text
 * and removes that column from every row.
 *
 * Used when switching from ADA rentals
 * back to Stroller rentals.
 */
function deleteColumnIfExists(columnName) {

    const table =
        document.getElementById("dataTable");

    if (!table) {
        return;
    }

    const headerCells =
        table.rows[0].cells;

    let colIndex = -1;

    for (let i = 0; i < headerCells.length; i++) {

        if (
            headerCells[i]
                .textContent
                .trim()
                .toLowerCase() ===
            columnName.toLowerCase()
        ) {
            colIndex = i;
            break;
        }
    }

    if (colIndex !== -1) {

        for (const row of table.rows) {

            if (row.cells.length > colIndex) {
                row.deleteCell(colIndex);
            }
        }
    }
}


/* =========================================================
   ACTIVE CONTROL STATE
   ========================================================= */

/*
 * Highlights the currently selected rental option
 * using the shared yellow application accent.
 */
function used(ids, activeId) {

    ids.forEach(id => {

        const btn =
            document.getElementById(id);

        if (btn) {

            btn.style.color =
                id === activeId
                    ? '#FFDA61'
                    : '#aeada3';
        }
    });
}
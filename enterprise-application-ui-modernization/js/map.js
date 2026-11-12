/* =========================================================
   MAP UI STATE
   ========================================================= */

/*
 * Stores the ID of the category panel that was
 * most recently opened.
 */
let prevtoggle = null;


/*
 * IDs of the five destination categories displayed
 * above the fictional park map.
 */
const categoryIds = [
    'Thrills',
    'family',
    'kids',
    'shows',
    'relax'
];


/* =========================================================
   CATEGORY PANEL VISIBILITY
   ========================================================= */

/*
 * Opens or closes a category panel.
 *
 * Category panels:
 * - Thrills & Adventures
 * - Family Fun
 * - Kids' Adventures
 * - Live Entertainment
 * - Relax & Recharge
 *
 * Only one category panel can remain open at a time.
 *
 * The Terms/Demo Information modal is handled separately
 * because it is independent of the map categories.
 */
function toggleVisibility(box, btn) {

    const selected =
        document.getElementById(box);

    if (!selected) {
        return;
    }


    /*
     * Any requested panel not listed in categoryIds is
     * treated as an independent modal.
     *
     * This currently applies to the portfolio
     * Demo Information panel.
     */
    if (!categoryIds.includes(box)) {

        selected.classList.toggle('is-hidden');

        return;
    }


    /*
     * This CSS class comes from the original implementation.
     *
     * Despite the class name "is-hidden", the existing CSS
     * uses the class to display the selected category panel.
     */
    const selectedIsAlreadyOpen =
        selected.classList.contains('is-hidden');


    /*
     * Reset every category panel before deciding
     * whether to open the newly selected one.
     */
    categoryIds.forEach(function (id) {

        const panel =
            document.getElementById(id);

        if (panel) {

            panel.classList.remove('is-hidden');

            /*
             * Remove visibility values that may have
             * been applied by the production JavaScript.
             */
            panel.style.removeProperty('visibility');
        }
    });


    /*
     * Remove the active appearance from every
     * category button.
     */
    document
        .querySelectorAll('.submenu .LbuttonsMap')
        .forEach(function (button) {

            button.classList.remove('active');
        });


    /*
     * If the selected panel was not already open,
     * display it and highlight its button.
     *
     * Selecting the same button again closes it.
     */
    if (!selectedIsAlreadyOpen) {

        selected.classList.add('is-hidden');

        if (btn) {

            btn.classList.add('active');

            /*
             * Remove keyboard/mouse focus after selection
             * so the active CSS style is easier to distinguish.
             */
            btn.blur();
        }

        prevtoggle = box;

    } else {

        prevtoggle = null;
    }
}


/* =========================================================
   DESTINATION MAP SELECTION
   ========================================================= */

/*
 * Opens one of the detailed destination maps.
 *
 * The HTML image map passes the ID of the corresponding
 * hidden image:
 *
 * ADVENTURE
 * DISCOVERY
 * WATER
 * GALAXY
 *
 * The image already has a click listener assigned by
 * getPics() in map.html. Calling click() allows the image-map
 * hotspot and gallery image to use the same full-screen logic.
 */
function imageToggle(box) {

    const destinationMap =
        document.getElementById(box);

    if (!destinationMap) {
        return;
    }

    destinationMap.click();
}


/* =========================================================
   PORTFOLIO PARK HOURS
   ========================================================= */

/*
 * Production implementation
 * ---------------------------------------------------------
 *
 * The production application retrieved live operating hours
 * from an internal enterprise API.
 *
 * Original data flow:
 *
 * getHours()
 *     ↓
 * fetch(INTERNAL_API_URL)
 *     ↓
 * Check response.ok
 *     ↓
 * response.json()
 *     ↓
 * Array of operating-hours records
 *     ↓
 * renderData(data)
 *     ↓
 * Dynamic HTML table
 *
 * The production code followed this general structure:
 *
 * function getHours() {
 *
 *     const url = "[INTERNAL HOURS API REMOVED]";
 *
 *     fetch(url)
 *         .then(response => {
 *
 *             if (!response.ok) {
 *                 throw new Error(
 *                     `HTTP error! status: ${response.status}`
 *                 );
 *             }
 *
 *             return response.json();
 *         })
 *
 *         .then(data => {
 *             renderData(data);
 *         })
 *
 *         .catch(error => {
 *             console.error(
 *                 "Unable to load operating hours:",
 *                 error
 *             );
 *         });
 * }
 *
 * The production response contained fields such as:
 *
 * - Park
 * - Hours
 * - Title
 *
 * The earlier renderData() implementation checked whether
 * Title contained "Hours", ignored records with a value of
 * zero, and excluded early-admission records.
 *
 * Portfolio implementation
 * ---------------------------------------------------------
 *
 * The public portfolio does not call the internal API.
 * Fictional local data is passed through the same high-level
 * loading and rendering workflow:
 *
 * demoParkHours
 *     ↓
 * getHours()
 *     ↓
 * renderData()
 *     ↓
 * Dynamic HTML table
 */


/* =========================================================
   FICTIONAL DEMO HOURS
   ========================================================= */

/*
 * All destination names and operating hours below are
 * fictional sample data created for this portfolio demo.
 */
const demoParkHours = [

    {
        Park: 'Adventure Park',
        Hours: '9:00 AM - 9:00 PM'
    },

    {
        Park: 'Discovery Park',
        Hours: '9:00 AM - 10:00 PM'
    },

    {
        Park: 'Splash Harbor',
        Hours: '10:00 AM - 7:00 PM'
    },

    {
        Park: 'Galaxy Park',
        Hours: '10:00 AM - 11:00 PM'
    }

];


/* =========================================================
   PARK HOURS DATA LOADING
   ========================================================= */

/*
 * Loads fictional portfolio operating hours.
 *
 * The function retains the same role as the
 * original production getHours() function.
 *
 * Production source:
 * Internal API response
 *
 * Portfolio source:
 * demoParkHours
 */
function getHours() {

    renderData(demoParkHours);
}


/* =========================================================
   PARK HOURS RENDERING
   ========================================================= */

/*
 * Converts each fictional destination-hours object
 * into an HTML table row.
 *
 * Example:
 *
 * {
 *     Park: "Adventure Park",
 *     Hours: "9:00 AM - 9:00 PM"
 * }
 *
 * becomes:
 *
 * Adventure Park | 9:00 AM - 9:00 PM
 */
function renderData(data) {

    const tbody =
        document.querySelector(
            '#dataTable-left tbody'
        );


    /*
     * Stop safely if the hours table does not
     * exist on the current page.
     */
    if (!tbody) {
        return;
    }


    /*
     * Clear previously rendered operating hours.
     */
    tbody.innerHTML = '';


    /*
     * Display a fallback row if no sample hours
     * are available.
     */
    if (!data || data.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="2">
                    Sample operating hours unavailable
                </td>
            </tr>
        `;

        return;
    }


    /*
     * Generate one table row for every fictional
     * destination-hours record.
     */
    data.forEach(function (destination) {

        const row = `
            <tr>

                <td>
                    <div class="bigfont">
                        ${destination.Park}
                    </div>
                </td>

                <td>
                    ${destination.Hours}
                </td>

            </tr>
        `;


        tbody.insertAdjacentHTML(
            'beforeend',
            row
        );
    });
}
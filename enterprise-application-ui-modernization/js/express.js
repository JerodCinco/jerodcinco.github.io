var tdata;
var ptype;
const ExpressType = [
    'Unlimited Access',
    'Standard Access',
    'Water Adventure',
    'Galaxy Access'
];

const DEMO_MODE = true;

/*
 * All product names and prices below are fictional
 * sample data created specifically for this portfolio demo.
 *
 * Production:
 * Product and pricing records came from an enterprise API.
 *
 * Portfolio:
 * Equivalent-shaped records are stored locally so the
 * existing filtering and rendering behavior can still
 * be demonstrated.
 */
const demoExpressData = [

    // Unlimited Access
    {
        Title: "1-Day Premium Access Pass",
        Price: "129",
        EType: "Unlimited Access"
    },

    {
        Title: "2-Day Premium Access Pass",
        Price: "219",
        EType: "Unlimited Access"
    },

    // Standard Access
    {
        Title: "1-Day Standard Access Pass",
        Price: "89",
        EType: "Standard Access"
    },

    {
        Title: "2-Day Standard Access Pass",
        Price: "159",
        EType: "Standard Access"
    },

    // Water Adventure
    {
        Title: "Water Adventure Access",
        Price: "59",
        EType: "Water Adventure"
    },

    {
        Title: "Water Adventure Plus",
        Price: "79",
        EType: "Water Adventure"
    },

    // Galaxy Access
    {
        Title: "Galaxy Access Pass",
        Price: "109",
        EType: "Galaxy Access"
    },

    {
        Title: "Galaxy Unlimited Access",
        Price: "169",
        EType: "Galaxy Access"
    }
];

/* =========================================================
   PRODUCT DATA LOADING
   ========================================================= */

/*
 * PRODUCTION IMPLEMENTATION
 * ---------------------------------------------------------
 *
 * The production application retrieved Premium Access
 * product and pricing information for the selected date
 * from an internal enterprise API.
 *
 * Original data flow:
 *
 * Selected Date
 *      ↓
 * Build API request using the selected date
 *      ↓
 * fetch()
 *      ↓
 * Check response.ok
 *      ↓
 * response.json()
 *      ↓
 * Store returned products in tdata
 *      ↓
 * filterTable(null)
 *      ↓
 * Apply the default/current product category
 *      ↓
 * renderData()
 *      ↓
 * Dynamic pricing table
 *
 * The production implementation followed this
 * general structure:
 *
 * function getData(selectedDate) {
 *
 *     const url =
 *         "[INTERNAL PREMIUM ACCESS API REMOVED]"
 *         + selectedDate;
 *
 *     fetch(url)
 *
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
 *
 *             tdata = data;
 *
 *             filterTable(null);
 *         })
 *
 *         .catch(error => {
 *
 *             console.error(
 *                 "Unable to load pricing:",
 *                 error
 *             );
 *         });
 * }
 *
 * Once the API response was stored in tdata,
 * changing Premium Access categories reused the
 * in-memory dataset instead of making another request.
 *
 *
 * PORTFOLIO IMPLEMENTATION
 * ---------------------------------------------------------
 *
 * The public portfolio does not connect to the
 * internal production API.
 *
 * Fictional product and pricing records are instead
 * stored locally in demoExpressData.
 *
 * Portfolio data flow:
 *
 * demoExpressData
 *      ↓
 * getData()
 *      ↓
 * Store records in tdata
 *      ↓
 * filterTable(null)
 *      ↓
 * Apply selected access category
 *      ↓
 * renderData()
 *      ↓
 * Dynamic pricing table
 *
 * The source of the data changed, but the original
 * frontend concepts remain:
 *
 * - Application state
 * - Product filtering
 * - Dynamic headings
 * - Dynamic table rendering
 * - Active control styling
 * - Date-control behavior
 *
 * Internal API URLs are intentionally excluded
 * from the public portfolio source.
 */
function getData($Date) {

    if (DEMO_MODE) {

        tdata = demoExpressData;

        filterTable(null);

        return;
    }

    // Production API removed for portfolio version.
}

function renderData(data) {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = ''; // Clear existing rows
    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3">No matching records found</td></tr>`;
        return;
    }
    data.forEach(d => {
        const row = `<tr>
            <td>
                <div class='bigfont'>${d.Title}</div>
            </td>

            <td>
                <b>$${d.Price}</b>
            </td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

function filterTable(type) {
    const Descr = document.querySelector('.ProductDescription');
    const tbody = tdata

    if (type == null) {
        if (ptype == null) {
            ptype = 'Unlimited Access'
        }
        type = ptype;
    }

    ptype = type

    switch (ptype) {

    case 'Unlimited Access':
        Descr.textContent =
            'UNLIMITED USES PER ATTRACTION';
        break;

    case 'Standard Access':
        Descr.textContent =
            'STANDARD ACCESS PER ATTRACTION';
        break;

    case 'Water Adventure':
        Descr.textContent =
            'WATER ADVENTURE ACCESS';
        break;

    case 'Galaxy Access':
        Descr.textContent =
            'GALAXY ACCESS';
        break;
    }

    /*
    * Keep only products whose category exactly
    * matches the currently selected access type.
    *
    * Exact matching prevents product names such as
    * "Galaxy Unlimited Access" from incorrectly appearing
    * under the "Unlimited Access" category.
    */
    const filteredData = tbody.filter(data =>
        data.EType === ptype
    );

    renderData(filteredData);
    used(ExpressType, ptype)
}

/* =========================================================
   ATTRACTION EXCLUSIONS
   ========================================================= */

/*
 * PRODUCTION IMPLEMENTATION
 * ---------------------------------------------------------
 *
 * The production application used a SECOND API request
 * to retrieve attractions where access was unavailable.
 *
 * This API was separate from the pricing API used by
 * getData().
 *
 * Original exclusions data flow:
 *
 * exclusion()
 *      ↓
 * fetch(INTERNAL_EXCLUSIONS_API)
 *      ↓
 * Check response.ok
 *      ↓
 * response.json()
 *      ↓
 * Array of attraction records
 *      ↓
 * forEach()
 *      ↓
 * Read each record's Title
 *      ↓
 * Insert attraction names into .notValid
 *
 * The production implementation followed this
 * general structure:
 *
 * function exclusion() {
 *
 *     const url =
 *         "[INTERNAL EXCLUSIONS API REMOVED]";
 *
 *     const container =
 *         document.querySelector('.notValid');
 *
 *     container.replaceChildren("");
 *
 *     fetch(url)
 *
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
 *
 *             data.forEach(record => {
 *
 *                 const row =
 *                     `<br>${record.Title}<br>`;
 *
 *                 container.insertAdjacentHTML(
 *                     'beforeend',
 *                     row
 *                 );
 *             });
 *         })
 *
 *         .catch(error => {
 *
 *             console.error(
 *                 "Unable to load exclusions:",
 *                 error
 *             );
 *         });
 * }
 *
 *
 * PORTFOLIO IMPLEMENTATION
 * ---------------------------------------------------------
 *
 * The public portfolio does not connect to the
 * internal exclusions API.
 *
 * Fictional attraction records are stored locally
 * in demoExclusions.
 *
 * Portfolio exclusions data flow:
 *
 * demoExclusions
 *      ↓
 * exclusion()
 *      ↓
 * forEach()
 *      ↓
 * Read each fictional Title
 *      ↓
 * Insert attraction names into .notValid
 *
 * This preserves the original dynamic rendering
 * behavior without publishing proprietary attraction
 * names or internal service information.
 */

const demoExclusions = [
    {
        Title: "Attraction Alpha"
    },
    {
        Title: "Attraction Bravo"
    },
    {
        Title: "Attraction Charlie"
    }
];

function exclusion() {

    const tbody =
        document.querySelector('.notValid');

    tbody.replaceChildren("");

    demoExclusions.forEach(d => {

        const row =
            `<br>${d.Title}<br>`;

        tbody.insertAdjacentHTML(
            'beforeend',
            row
        );

    });
}

function used(ids, activeId) {
    ids.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.style.color = (id === activeId) ? '#FFDA61' : '#aeada3';
        }
    });
}
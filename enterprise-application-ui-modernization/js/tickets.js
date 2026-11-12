/* =========================================================
   TICKET DATA AND UI STATE
   ========================================================= */

/*
 * Stores the complete ticket dataset currently loaded
 * by the application.
 *
 * Production Version:
 * - Data was retrieved from the ticket pricing API.
 *
 * Portfolio Version:
 * - Data comes from demoTicketData.
 *
 * Keeping the complete dataset in memory allows the user
 * to change filters without loading the source data again.
 */
var tdata;


/*
 * Stores the currently selected admission type.
 *
 * Expected values:
 * - BASE: one park per day
 * - PTP: Park-to-Park admission
 */
var ptype;


/*
 * Stores the currently selected ticket product group.
 *
 * Expected values:
 * - 2 Park
 * - 3 Park
 */
var pproduct;


/*
 * Lists the HTML element IDs used for the
 * ticket product-group controls.
 *
 * These values are also used by used() to
 * highlight the currently selected button.
 */
const TicketType = [
    '2 Park',
    '3 Park'
];


/*
 * Lists the HTML element IDs used for
 * admission-type controls.
 */
const BaseType = [
    'BASE',
    'PTP'
];


/* =========================================================
   PORTFOLIO DEMO DATA
   ========================================================= */

/*
 * All ticket names and prices below are fictional
 * sample data created specifically for this portfolio demo.
 *
 * The production application consumed current ticket
 * pricing data from enterprise APIs.
 *
 * The portfolio version uses local fictional data so
 * the application can be demonstrated without access
 * to private systems.
 *
 * This preserves:
 * - Filtering
 * - Rendering
 * - State management
 * - Price calculations
 * - User interface behavior
 */
const DEMO_MODE = true;


const demoTicketData = [

    // =====================================================
    // 2 PARK - BASE
    // =====================================================

    {
        Title: "1-Day Theme Park Ticket",
        AdultPrice: "149",
        ChildPrice: "139",
        ProductType: "2 Park",
        Type: "BASE"
    },

    {
        Title: "2-Day Theme Park Ticket",
        AdultPrice: "219",
        ChildPrice: "199",
        ProductType: "2 Park",
        Type: "BASE"
    },

    {
        Title: "3-Day Theme Park Ticket",
        AdultPrice: "279",
        ChildPrice: "259",
        ProductType: "2 Park",
        Type: "BASE"
    },


    // =====================================================
    // 2 PARK - PARK TO PARK
    // =====================================================

    {
        Title: "2-Day Park-To-Park Ticket",
        AdultPrice: "299",
        ChildPrice: "279",
        ProductType: "2 Park",
        Type: "PTP"
    },

    {
        Title: "3-Day Park-To-Park Ticket",
        AdultPrice: "359",
        ChildPrice: "339",
        ProductType: "2 Park",
        Type: "PTP"
    },


    // =====================================================
    // 3 PARK - BASE
    // =====================================================

    {
        Title: "2-Day 3-Park Ticket",
        AdultPrice: "349",
        ChildPrice: "329",
        ProductType: "3 Park",
        Type: "BASE"
    },

    {
        Title: "3-Day 3-Park Ticket",
        AdultPrice: "429",
        ChildPrice: "399",
        ProductType: "3 Park",
        Type: "BASE"
    },


    // =====================================================
    // 3 PARK - PARK TO PARK
    // =====================================================

    {
        Title: "2-Day 3-Park Park-To-Park Ticket",
        AdultPrice: "469",
        ChildPrice: "439",
        ProductType: "3 Park",
        Type: "PTP"
    },

    {
        Title: "3-Day 3-Park Park-To-Park Ticket",
        AdultPrice: "549",
        ChildPrice: "519",
        ProductType: "3 Park",
        Type: "PTP"
    }

];


/* =========================================================
   DATA RETRIEVAL
   ========================================================= */

/*
 * PRODUCTION IMPLEMENTATION
 * ---------------------------------------------------------
 *
 * The production application retrieved ticket pricing
 * for the selected visit date from an internal enterprise API.
 *
 * Original data flow:
 *
 * Selected Visit Date
 *        ↓
 * Build API Request
 *        ↓
 * fetch()
 *        ↓
 * Check response.ok
 *        ↓
 * response.json()
 *        ↓
 * Store returned records in tdata
 *        ↓
 * filterTable(null, null)
 *        ↓
 * Apply default/current filters
 *        ↓
 * renderData()
 *        ↓
 * Dynamic pricing table
 *
 * The production implementation followed this
 * general structure:
 *
 * function getData(ticketdate) {
 *
 *     const url =
 *         "[INTERNAL TICKET PRICING API REMOVED]"
 *         + ticketdate;
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
 *             filterTable(null, null);
 *         })
 *
 *         .catch(error => {
 *
 *             console.error(
 *                 "Unable to load ticket pricing:",
 *                 error
 *             );
 *         });
 * }
 *
 * Once the API response was stored in tdata,
 * switching between:
 *
 * - 2 Park / 3 Park
 * - BASE / PTP
 *
 * did not require another API request.
 *
 *
 * PORTFOLIO IMPLEMENTATION
 * ---------------------------------------------------------
 *
 * The public portfolio does not connect to the
 * internal enterprise API.
 *
 * Instead, fictional ticket records are stored
 * locally in demoTicketData.
 *
 * Portfolio data flow:
 *
 * Selected Visit Date
 *        ↓
 * getData()
 *        ↓
 * demoTicketData
 *        ↓
 * Store records in tdata
 *        ↓
 * filterTable(null, null)
 *        ↓
 * Apply default/current filters
 *        ↓
 * renderData()
 *        ↓
 * Dynamic pricing table
 *
 * Although the source of the data changed, the
 * important frontend behavior remains:
 *
 * - Application state
 * - Array filtering
 * - Product selection
 * - Admission-type selection
 * - Dynamic table rendering
 * - Per-day price calculations
 * - Active control styling
 *
 * Internal API URLs and production credentials are
 * intentionally excluded from the public portfolio.
 */
function getData(ticketdate) {

    /*
     * If no date was supplied, use today's date.
     *
     * This preserves the behavior of the original
     * date-driven production implementation.
     */
    if (!ticketdate) {

        ticketdate =
            new Date()
                .toISOString()
                .split('T')[0];
    }


    if (DEMO_MODE) {

        console.log(
            "Using local demo data"
        );

        /*
         * Store the complete fictional dataset
         * in application state.
         */
        tdata = demoTicketData;


        /*
         * Apply the default or currently selected
         * product filters.
         */
        filterTable(
            null,
            null
        );

        return;
    }


    // Production API code removed from portfolio version.
}


/* =========================================================
   TABLE RENDERING
   ========================================================= */

/*
 * Converts the currently loaded ticket dataset
 * into HTML table rows.
 *
 * This rendering logic works independently of whether
 * the data originated from the production API or the
 * fictional portfolio dataset.
 *
 * Responsibilities:
 * - Clear existing table rows
 * - Build pricing rows
 * - Calculate per-day pricing callouts
 * - Insert generated HTML into the page
 */
function renderData(data) {

    /*
     * Locate the table body where dynamic
     * ticket rows will be inserted.
     */
    const tbody =
        document.querySelector(
            '#dataTable tbody'
        );


    /*
     * Remove previously rendered products.
     */
    tbody.innerHTML = '';


    /*
     * Display a readable fallback instead of
     * leaving the table empty when no products
     * match the selected filters.
     */
    if (data.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="3">
                    No matching records found
                </td>
            </tr>
        `;

        return;
    }


    /*
     * Loop through every matching ticket product
     * and generate an HTML row.
     */
    data.forEach(d => {

        var pd;


        /*
         * Calculate the displayed
         * "Less Than $X Per Day" value.
         *
         * If an adult price is unavailable,
         * use the child price instead.
         */
        if (d.AdultPrice == '') {

            pd =
                ppd(
                    d.ChildPrice,
                    d.Title
                );

        } else {

            pd =
                ppd(
                    d.AdultPrice,
                    d.Title
                );
        }


        var adultText;


        /*
         * Only multi-day tickets display
         * the per-day pricing callout.
         *
         * The first character of the title represents
         * the ticket duration in the fictional dataset.
         */
        if (
            parseInt(
                d.Title[0],
                10
            ) > 1
        ) {

            adultText = `
                <div class='prk2prk-title'>

                    <div class='ppd'>

                        <span class='lessthan'>
                            LESS THAN
                        </span>

                        <br>

                        <span class='sign'>
                            $
                        </span>

                        <span class='price'>
                            ${pd}
                        </span>

                        <div class='pd'>
                            PER DAY
                        </div>

                    </div>

                </div>
            `;

        } else {

            adultText = ``;
        }


        /*
         * Template literal used to generate one
         * HTML table row.
         *
         * ${value} injects JavaScript values
         * directly into the generated markup.
         */
        const row = `
            <tr>

                <td>

                    <div class='bigfont'>
                        ${d.Title}
                    </div>

                    <div class='priceText'>
                        ${adultText}
                    </div>

                </td>


                <td>
                    <b>
                        $ ${d.AdultPrice}
                    </b>
                </td>


                <td>
                    <b>
                        $ ${d.ChildPrice}
                    </b>
                </td>


                <td hidden>
                    ${d.ProductType?.name || ''}
                </td>


                <td hidden>
                    ${d.Type?.name || ''}
                </td>

            </tr>
        `;


        /*
         * Append the generated row to the end
         * of the existing table body.
         */
        tbody.insertAdjacentHTML(
            'beforeend',
            row
        );
    });
}


/* =========================================================
   PRODUCT FILTERING
   ========================================================= */

/*
 * Filters ticket products using two pieces
 * of application state.
 *
 * Product Group:
 * - 2 Park
 * - 3 Park
 *
 * Admission Type:
 * - BASE
 * - PTP
 *
 * Responsibilities:
 * - Determine the active filters
 * - Preserve the selected state
 * - Update the page heading
 * - Filter the loaded ticket dataset
 * - Render matching products
 * - Update active button styling
 */
function filterTable(
    Type,
    Product
) {

    /*
     * Locate the heading that describes the
     * currently selected admission option.
     */
    const Descr =
        document.querySelector(
            '.ProductDescription'
        );


    /*
     * Work against the ticket dataset already
     * stored in memory rather than loading it again.
     */
    const tbody =
        tdata;


    /*
     * Determine the current admission type.
     *
     * If nothing has been selected yet,
     * BASE becomes the default.
     */
    if (Type == null) {

        if (ptype == null) {

            Type = 'BASE';

        } else {

            Type = ptype;
        }
    }


    /*
     * Determine the current park grouping.
     *
     * If nothing has been selected yet,
     * 2 Park becomes the default.
     */
    if (Product == null) {

        if (pproduct == null) {

            Product =
                '2 Park';

        } else {

            Product =
                pproduct;
        }
    }


    /*
     * Save the selected values so future
     * filter changes preserve application state.
     */
    pproduct =
        Product;

    ptype =
        Type;


    /*
     * Update the visible description to match
     * the selected admission type.
     */
    if (ptype == 'BASE') {

        Descr.textContent =
            'Single Park Admission - One Park Per Day';

    } else {

        Descr.textContent =
            'Park-to-Park Admission - Multiple Parks Each Day';
    }


    /*
     * Array.filter() checks every ticket record
     * currently stored in tdata.
     *
     * The arrow-function parameter "data"
     * represents one ticket record at a time.
     *
     * A record is retained only when BOTH:
     *
     * data.Type matches the selected admission type
     *
     * AND
     *
     * data.ProductType matches the selected
     * park grouping.
     *
     *
     * Example:
     *
     * Record:
     *
     * {
     *     ProductType: "2 Park",
     *     Type: "BASE"
     * }
     *
     * Current Selection:
     *
     * pproduct = "2 Park"
     * ptype = "BASE"
     *
     * Evaluation:
     *
     * true && true
     *
     * Result:
     *
     * The record is retained.
     */
    const filteredData =
        tbody.filter(data =>

            data.Type.includes(ptype) &&

            data.ProductType.includes(
                pproduct
            )
        );


    /*
     * Render the newly filtered products.
     */
    renderData(
        filteredData
    );


    /*
     * Update the visual state of the
     * corresponding controls.
     */
    used(
        TicketType,
        pproduct
    );

    used(
        BaseType,
        ptype
    );
}


/* =========================================================
   PRICE CALCULATIONS
   ========================================================= */

/*
 * Calculates the displayed per-day ticket cost.
 *
 * Example:
 *
 * 2-Day Ticket
 * $120
 *
 * becomes:
 *
 * $60 PER DAY
 *
 * Math.ceil() always rounds the result
 * upward to the nearest whole dollar.
 */
function ppd(
    price,
    days
) {

    var pd =
        Math.ceil(
            price /
            parseInt(
                days[0],
                10
            )
        );

    return pd;
}


/* =========================================================
   UI STATE MANAGEMENT
   ========================================================= */

/*
 * Updates the visual state of filter controls.
 *
 * The currently selected control uses the
 * shared yellow accent color.
 *
 * Inactive controls return to the
 * default gray appearance.
 */
function used(
    ids,
    activeId
) {

    ids.forEach(id => {

        /*
         * Locate the control whose ID corresponds
         * to the current array value.
         */
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


/* =========================================================
   DATE PICKER UTILITY
   ========================================================= */

/*
 * Opens the browser's native date picker
 * when showPicker() is supported.
 *
 * Browsers without showPicker() support continue
 * using the standard date-input behavior.
 */
function openPicker(input) {

    try {

        if (
            typeof input.showPicker ===
            'function'
        ) {

            input.showPicker();
        }

    } catch (e) {

        console.warn(
            'showPicker not available:',
            e
        );
    }
}
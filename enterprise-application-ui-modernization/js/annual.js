var tdata;
var ptype;
var pproduct;
const typeButtons = ['Resident', 'NonResident'];
const parkButtons = ['2-Park', '3-Park'];

const DEMO_MODE = true;
/*
 * All membership names, prices, payment amounts,
 * and benefits below are fictional sample data
 * created specifically for this portfolio demo.
 *
 * Production:
 * Membership products and pricing originated
 * from an enterprise API.
 *
 * Portfolio:
 * Equivalent-shaped records are stored locally
 * so the original filtering, pricing-state, and
 * rendering behavior can still be demonstrated.
 *
 * Each fictional record intentionally contains
 * two pricing sets:
 *
 * Resident:
 * - TotalPrice
 * - MonthlyPrice
 * - DownPaymentPrice
 *
 * Non-Resident:
 * - NonResidentTotalPrice
 * - NonResidentMonthlyPrice
 * - NonResidentDownPayment
 *
 * This mirrors the original application's concept
 * of selecting different pricing fields according
 * to customer type without publishing real pricing.
 */
const demoAnnualData = [
// =====================================================
// 2-PARK MEMBERSHIPS
// =====================================================

{
    Description: `
        <div class="bigfont">2-Park Essential Membership</div>
        <div>Entry-level membership with standard access benefits</div>
    `,
    PassType: "2-Park",

    TotalPrice: "299.00",
    MonthlyPrice: "14.99",
    DownPaymentPrice: "149.11",

    NonResidentTotalPrice: "329.00",
    NonResidentMonthlyPrice: "16.49",
    NonResidentDownPayment: "147.61"
},

{
    Description: `
        <div class="bigfont">2-Park Plus Membership</div>
        <div>Includes additional sample destination benefits</div>
    `,
    PassType: "2-Park",

    TotalPrice: "349.00",
    MonthlyPrice: "17.49",
    DownPaymentPrice: "156.61",

    NonResidentTotalPrice: "379.00",
    NonResidentMonthlyPrice: "18.99",
    NonResidentDownPayment: "155.11"
},

{
    Description: `
        <div class="bigfont">2-Park Preferred Membership</div>
        <div>Includes expanded sample membership benefits</div>
    `,
    PassType: "2-Park",

    TotalPrice: "449.00",
    MonthlyPrice: "22.49",
    DownPaymentPrice: "201.61",

    NonResidentTotalPrice: "479.00",
    NonResidentMonthlyPrice: "23.99",
    NonResidentDownPayment: "200.11"
},

{
    Description: `
        <div class="bigfont">2-Park Signature Membership</div>
        <div>Includes the highest sample benefit tier in this demo</div>
    `,
    PassType: "2-Park",

    TotalPrice: "599.00",
    MonthlyPrice: "29.99",
    DownPaymentPrice: "269.11",

    NonResidentTotalPrice: "629.00",
    NonResidentMonthlyPrice: "31.49",
    NonResidentDownPayment: "267.61"
},


// =====================================================
// 3-PARK MEMBERSHIPS
// =====================================================

{
    Description: `
        <div class="bigfont">3-Park Essential Membership</div>
        <div>Entry-level membership with standard access benefits</div>
    `,
    PassType: "3-Park",

    TotalPrice: "349.00",
    MonthlyPrice: "17.49",
    DownPaymentPrice: "156.61",

    NonResidentTotalPrice: "379.00",
    NonResidentMonthlyPrice: "18.99",
    NonResidentDownPayment: "155.11"
},

{
    Description: `
        <div class="bigfont">3-Park Plus Membership</div>
        <div>Includes additional sample destination benefits</div>
    `,
    PassType: "3-Park",

    TotalPrice: "399.00",
    MonthlyPrice: "19.99",
    DownPaymentPrice: "179.11",

    NonResidentTotalPrice: "429.00",
    NonResidentMonthlyPrice: "21.49",
    NonResidentDownPayment: "177.61"
},

{
    Description: `
        <div class="bigfont">3-Park Preferred Membership</div>
        <div>Includes expanded sample membership benefits</div>
    `,
    PassType: "3-Park",

    TotalPrice: "499.00",
    MonthlyPrice: "24.99",
    DownPaymentPrice: "224.11",

    NonResidentTotalPrice: "529.00",
    NonResidentMonthlyPrice: "26.49",
    NonResidentDownPayment: "222.61"
},

{
    Description: `
        <div class="bigfont">3-Park Signature Membership</div>
        <div>Includes the highest sample benefit tier in this demo</div>
    `,
    PassType: "3-Park",

    TotalPrice: "649.00",
    MonthlyPrice: "32.49",
    DownPaymentPrice: "291.61",

    NonResidentTotalPrice: "679.00",
    NonResidentMonthlyPrice: "33.99",
    NonResidentDownPayment: "290.11"
}
];

/* =========================================================
   MEMBERSHIP DATA LOADING
   ========================================================= */

/*
 * PRODUCTION IMPLEMENTATION
 * ---------------------------------------------------------
 *
 * The production application retrieved membership products,
 * pricing, monthly-payment amounts, and initial-payment
 * amounts from an internal enterprise API.
 *
 * The selected park option was included in the request:
 *
 * - 2-Park
 * - 3-Park
 *
 * Original data flow:
 *
 * Selected Park Option
 *      ↓
 * Build API request using 2-Park or 3-Park
 *      ↓
 * fetch()
 *      ↓
 * Check response.ok
 *      ↓
 * response.json()
 *      ↓
 * Store returned membership records in tdata
 *      ↓
 * filterTable(null, Park)
 *      ↓
 * Determine Resident / Non-Resident selection
 *      ↓
 * renderData()
 *      ↓
 * Select the appropriate pricing properties
 *      ↓
 * Dynamic membership table
 *
 * The production implementation followed this
 * general structure:
 *
 * function getData(Park) {
 *
 *     const url =
 *         "[INTERNAL MEMBERSHIP PRICING API REMOVED]"
 *         + Park;
 *
 *     fetch(url)
 *
 *         .then(response => {
 *
 *             if (!response.ok) {
 *
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
 *             filterTable(
 *                 null,
 *                 Park
 *             );
 *         })
 *
 *         .catch(error => {
 *
 *             console.error(
 *                 "Unable to load membership pricing:",
 *                 error
 *             );
 *         });
 * }
 *
 *
 * PRODUCTION PRICING SELECTION
 * ---------------------------------------------------------
 *
 * Each production membership record contained pricing
 * information for more than one customer type.
 *
 * renderData() selected which pricing values to display
 * according to the current Resident / Non-Resident state.
 *
 * Conceptually:
 *
 * Resident
 *      ↓
 * Standard total price
 * Standard monthly payment
 * Standard initial/down payment
 *
 * Non-Resident
 *      ↓
 * Alternate total price
 * Alternate monthly payment
 * Alternate initial/down payment
 *
 * This allowed the same membership product to remain in
 * the dataset while its displayed pricing changed according
 * to the selected customer type.
 *
 *
 * PORTFOLIO IMPLEMENTATION
 * ---------------------------------------------------------
 *
 * The public portfolio does not connect to the internal
 * membership API.
 *
 * Fictional membership records are instead stored locally
 * in demoAnnualData.
 *
 * Portfolio data flow:
 *
 * demoAnnualData
 *      ↓
 * getData(Park)
 *      ↓
 * Store records in tdata
 *      ↓
 * filterTable(null, Park)
 *      ↓
 * Filter 2-Park / 3-Park memberships
 *      ↓
 * renderData()
 *      ↓
 * Select Resident / Non-Resident pricing
 *      ↓
 * Dynamic membership table
 *
 * The portfolio therefore preserves the major frontend
 * concepts from the production application:
 *
 * - Application state
 * - Park-selection filtering
 * - Resident / Non-Resident pricing states
 * - Dynamic product descriptions
 * - Dynamic table rendering
 * - Monthly-payment presentation
 * - Initial-payment presentation
 * - Active control styling
 *
 * Internal API URLs and production business data are
 * intentionally excluded from the public portfolio source.
 */
function getData(Park) {

    if (DEMO_MODE) {

        tdata = demoAnnualData;

        filterTable(null, Park);

        return;
    }

    // Production API removed from portfolio version.
}

/* =========================================================
   MEMBERSHIP TABLE RENDERING
   ========================================================= */

/*
 * Converts the currently filtered membership records
 * into HTML table rows.
 *
 * This function also demonstrates an important part of
 * the original application architecture:
 *
 * The selected customer type determines WHICH pricing
 * properties are read from each membership object.
 *
 * Resident:
 *
 * TotalPrice
 * MonthlyPrice
 * DownPaymentPrice
 *
 * Non-Resident:
 *
 * NonResidentTotalPrice
 * NonResidentMonthlyPrice
 * NonResidentDownPayment
 *
 * The product itself does not need to be replaced when
 * the customer type changes. The function simply selects
 * a different set of pricing properties from that product.
 *
 * This same concept existed in production, although the
 * original property names/data originated from the API.
 */

function renderData(data, ptype) {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = ''; // Clear existing rows
    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="24">No matching records found</td></tr>`;
        return;
    }
    data.forEach(d => {
        var flexpay;
        var price;
        var downpayment;
        var monthly;
        flexpay = `<div class='flexpay'>${d.Description}</div>`

        if (ptype == 'Resident') {
            price = d.TotalPrice
            monthly = d.MonthlyPrice
            downpayment = d.DownPaymentPrice
        } else {
            downpayment = d.NonResidentDownPayment
            price = d.NonResidentTotalPrice
            monthly = d.NonResidentMonthlyPrice
        }


        const row = `<tr>
            <td>${flexpay}</td>

            <td>
                <span class='flexPrice'>$${price}</span>
            </td>

            <td class='flexPayCol'>
                <span class='flexPrice'>$${monthly}</span>
                <span class='flexpayPostText'> / Month</span>
                <br>
                (Sample 11-month plan)

                <hr>

                $${downpayment} / Initial Payment
                <br>
                (Fictional portfolio pricing)
            </td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

/* =========================*===============================
  *MEMBERSHIP FILTERING AND STATE
   *==================================*===================== */

/*
 * Co*trols two independent pieces of UI*state:
 *
 * Customer Type:
 * - R*sident
 * - Non-Resident
 *
 * Par* Option:
 * - 2-Park
 * - 3-Park
 *
 * The park option determines whi*h membership records
 * remain in *ilteredData.
 *
 * The customer ty*e does not remove membership produ*ts.
 * Instead, it tells renderDat*() which pricing properties
 * sho*ld be displayed for those products*
 *
 * Example:
 *
 * Product sele*tion:
 * 3-Park
 *
 * Customer sel*ction:
 * Non-Resident
 *
 * Resul*:
 *
 * filterTable()
 *      ↓
 **Keeps only PassType = "3-Park"
 * *    ↓
 * renderData(filteredData, *NonResident")
 *      ↓
 * Display* NonResidentTotalPrice,
 * NonResidentMonthlyPrice, and
 * NonResidentDownPayment
 */
function filterTable(Type, Product) {
    const Descr = document.querySelector('.ProductDescription');
    const tbody = tdata
    console.log(tdata)
    if (Type == null) {
        if (ptype == null) {
            Type = 'Resident';
        } else {
            Type = ptype
        }
    }
    if (Product == null) {
        if (pproduct == null) {
            Product = '2-Park';
        } else {
            Product = pproduct
        }

    }
    pproduct = Product
    ptype = Type

    if (ptype == 'Resident') {
    Descr.textContent =
        `Resident ${Product} Membership Options`;
    } else {
        Descr.textContent =
            `Non-Resident ${Product} Membership Options`;
    }
        /*
    * Creates a new array containing only memberships
    * that match the currently selected park option.
    *
    * Example:
    * If pproduct = "2-Park", only records whose
    * PassType contains "2-Park" are kept.
    */
    const filteredData = tbody.filter(data =>
        data.PassType.includes(pproduct)
    );

    console.log(filteredData);
    renderData(filteredData, ptype);
    used(typeButtons, ptype);
    used(parkButtons, pproduct);
}

function used(ids, activeId) {
    ids.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.style.color = (id === activeId) ? '#FFDA61' : '#aeada3';
        }
    });
}
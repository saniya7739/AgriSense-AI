/*
  compliance-data.js
  Complete compliance dataset for AgriSense AI.

  Includes:
  - 50 farmers (F1001-F1050)
  - 200 transactions
  - Exactly 30% intentional violations (60/200)
  - Helper functions for querying and summaries
*/
(function (global) {
  "use strict";

  // ----------------------------
  // Constants
  // ----------------------------
  const DISTRICTS = ["Pune", "Satara", "Sangli", "Nashik", "Kolhapur"];
  const CROPS = ["Wheat", "Rice", "Sugarcane", "Cotton", "Tomato", "Onion"];
  const LAND_OWNERSHIP = ["Owned", "Leased"];

  const CROP_ECONOMICS = {
    Wheat: { incomePerHa: 85000, fertilizer: { urea: 12, dap: 6, potash: 4 }, msp: 2275 },
    Rice: { incomePerHa: 90000, fertilizer: { urea: 13, dap: 7, potash: 4 }, msp: 2300 },
    Sugarcane: { incomePerHa: 130000, fertilizer: { urea: 16, dap: 8, potash: 6 }, msp: 340 },
    Cotton: { incomePerHa: 110000, fertilizer: { urea: 14, dap: 7, potash: 5 }, msp: 7121 },
    Tomato: { incomePerHa: 150000, fertilizer: { urea: 10, dap: 6, potash: 6 }, msp: 1200 },
    Onion: { incomePerHa: 140000, fertilizer: { urea: 11, dap: 6, potash: 5 }, msp: 1400 }
  };

  const FERTILIZER_PRICES = {
    urea: 266,
    dap: 1350,
    potash: 1700
  };

  const FARMER_NAMES = [
    "Ramesh Patil", "Suresh Jadhav", "Vijay Shinde", "Mahadev Pawar", "Ganesh More",
    "Dnyaneshwar Chavan", "Sanjay Deshmukh", "Prakash Kadam", "Nilesh Bhosale", "Anil Gaikwad",
    "Santosh Kamble", "Bharat Salunkhe", "Rajendra Mane", "Shankar Thorat", "Pandurang Mohite",
    "Sunil Khot", "Datta Nalawade", "Ashok Chorge", "Mohan Bane", "Kishor Kolekar",
    "Ajit Barde", "Tukaram Chougule", "Baban Nimbalkar", "Sachin Borade", "Deepak Jagtap",
    "Harish Wagh", "Ravindra Sonawane", "Umesh Chavan", "Balasaheb Ghorpade", "Nitin Koli",
    "Kailas Dhumal", "Shivaji Kokate", "Madhukar Shelke", "Arun Ingale", "Subhash Gavhane",
    "Pravin Chitale", "Eknath Doke", "Shrikant Tarte", "Vilas Ahire", "Bapu Dhok",
    "Mangesh Pise", "Kiran Landge", "Avinash Kale", "Yogesh Khandekar", "Maruti Godase",
    "Raju Pansare", "Vikram Raut", "Bhaskar Khairnar", "Narayan Bhalerao", "Hemant Suryawanshi"
  ];

  // ----------------------------
  // Utility helpers
  // ----------------------------
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  // Deterministic pseudo-random for reproducible dataset.
  function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function pickFrom(arr, index) {
    return arr[index % arr.length];
  }

  function pad(num, size) {
    return String(num).padStart(size, "0");
  }

  function dateFromIndex(baseDate, index) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + index);
    return d.toISOString().slice(0, 10);
  }

  function toRupeeInt(value) {
    return Math.round(value);
  }

  // ----------------------------
  // Build Farmers (50)
  // ----------------------------
  const farmers = FARMER_NAMES.map(function (name, i) {
    const idx = i + 1;
    const farmerId = "F" + String(1000 + idx);
    const district = pickFrom(DISTRICTS, i);
    const primaryCrop = pickFrom(CROPS, i * 3 + 1);

    const sizeBase = 0.5 + seededRandom(idx * 13) * 9.5;
    const farmSize = Number(sizeBase.toFixed(1));

    const landOwnership = seededRandom(idx * 31) > 0.22 ? LAND_OWNERSHIP[0] : LAND_OWNERSHIP[1];

    const cropProfile = CROP_ECONOMICS[primaryCrop];
    const baseIncome = cropProfile.incomePerHa * farmSize * (landOwnership === "Owned" ? 0.95 : 0.78);
    const noise = (seededRandom(idx * 47) - 0.35) * 50000;
    const annualIncome = clamp(toRupeeInt(baseIncome + noise), 50000, 800000);

    const isTaxpayer = annualIncome >= 300000;

    const urea = Math.max(2, Math.round(cropProfile.fertilizer.urea * farmSize * 0.55));
    const dap = Math.max(1, Math.round(cropProfile.fertilizer.dap * farmSize * 0.45));
    const potash = Math.max(1, Math.round(cropProfile.fertilizer.potash * farmSize * 0.4));

    return {
      farmer_id: farmerId,
      name: name,
      district: district,
      farm_size: farmSize,
      land_ownership: landOwnership,
      primary_crop: primaryCrop,
      annual_income: annualIncome,
      is_taxpayer: isTaxpayer,
      fertilizer_usage: {
        urea_bags: urea,
        dap_bags: dap,
        potash_bags: potash
      }
    };
  });

  const farmerById = farmers.reduce(function (acc, farmer) {
    acc[farmer.farmer_id] = farmer;
    return acc;
  }, {});

  // ----------------------------
  // Build Transactions (200)
  // ----------------------------
  let txCounter = 1;
  const transactions = [];

  function nextTxId() {
    const id = "T" + pad(txCounter, 5);
    txCounter += 1;
    return id;
  }

  function addTransaction(tx) {
    const record = Object.assign(
      {
        transaction_id: nextTxId(),
        violation_code: null,
        violation_note: null,
        is_violation: false
      },
      tx
    );
    transactions.push(record);
    return record;
  }

  // 50 Subsidy claims (PM-KISAN): 40 unique + 10 deliberate duplicate claims.
  const subsidyBase = [];
  for (let i = 0; i < 40; i++) {
    const farmer = farmers[i];
    const tx = addTransaction({
      transaction_type: "subsidy_claim",
      scheme: "PM-KISAN",
      farmer_id: farmer.farmer_id,
      district: farmer.district,
      date: dateFromIndex("2025-04-01", i * 3),
      amount: 2000,
      metadata: {
        installment: (i % 3) + 1,
        farm_size_snapshot: farmer.farm_size
      }
    });
    subsidyBase.push(tx);
  }

  for (let i = 0; i < 10; i++) {
    const original = subsidyBase[i];
    addTransaction({
      transaction_type: "subsidy_claim",
      scheme: "PM-KISAN",
      farmer_id: original.farmer_id,
      district: original.district,
      date: dateFromIndex("2025-07-01", i * 4),
      amount: 2000,
      metadata: {
        installment: original.metadata.installment,
        duplicate_of: original.transaction_id,
        farm_size_snapshot: farmerById[original.farmer_id].farm_size
      }
    });
  }

  // 40 Insurance claims (PMFBY)
  for (let i = 0; i < 40; i++) {
    const farmer = farmers[i];
    const claimAmount = toRupeeInt(9000 + seededRandom(100 + i) * 85000);
    const eventDate = dateFromIndex("2025-08-01", i * 2);
    const reportedDate = dateFromIndex("2025-08-02", i * 2);

    addTransaction({
      transaction_type: "insurance_claim",
      scheme: "PMFBY",
      farmer_id: farmer.farmer_id,
      district: farmer.district,
      date: reportedDate,
      amount: claimAmount,
      metadata: {
        event_date: eventDate,
        report_delay_days: 1,
        cause: pickFrom(["excess_rain", "dry_spell", "pest_attack", "flood"], i)
      }
    });
  }

  // 55 Fertilizer purchases
  for (let i = 0; i < 55; i++) {
    const farmer = farmers[i % 50];
    const profile = CROP_ECONOMICS[farmer.primary_crop].fertilizer;

    const ureaBags = Math.max(2, Math.round(profile.urea * farmer.farm_size * 0.30 + (i % 4)));
    const dapBags = Math.max(1, Math.round(profile.dap * farmer.farm_size * 0.22 + (i % 3)));
    const potashBags = Math.max(1, Math.round(profile.potash * farmer.farm_size * 0.20 + (i % 2)));

    const amount = toRupeeInt(
      ureaBags * FERTILIZER_PRICES.urea +
      dapBags * FERTILIZER_PRICES.dap +
      potashBags * FERTILIZER_PRICES.potash
    );

    addTransaction({
      transaction_type: "fertilizer_purchase",
      scheme: null,
      farmer_id: farmer.farmer_id,
      district: farmer.district,
      date: dateFromIndex("2025-05-01", i * 2),
      amount: amount,
      metadata: {
        urea_bags: ureaBags,
        dap_bags: dapBags,
        potash_bags: potashBags,
        vendor: "Agri Input Center " + ((i % 7) + 1)
      }
    });
  }

  // 55 Crop sales
  for (let i = 0; i < 55; i++) {
    const farmer = farmers[(i * 3) % 50];
    const crop = farmer.primary_crop;
    const msp = CROP_ECONOMICS[crop].msp;

    // MSP behavior by crop type: sugarcane and vegetable crops usually not MSP-traded,
    // but we still keep a reference benchmark for compliance screening.
    const marketMultiplier = 1.03 + seededRandom(400 + i) * 0.20;
    const pricePerUnit = toRupeeInt(msp * marketMultiplier);

    const quantityQuintal = Number((8 + seededRandom(800 + i) * 72).toFixed(1));
    const amount = toRupeeInt(quantityQuintal * pricePerUnit);

    addTransaction({
      transaction_type: "crop_sale",
      scheme: null,
      farmer_id: farmer.farmer_id,
      district: farmer.district,
      date: dateFromIndex("2025-10-01", i * 2),
      amount: amount,
      metadata: {
        crop: crop,
        quantity_quintal: quantityQuintal,
        sale_price_per_quintal: pricePerUnit,
        msp_per_quintal: msp,
        mandi: pickFrom(["Pune APMC", "Nashik APMC", "Sangli APMC", "Kolhapur APMC", "Satara APMC"], i)
      }
    });
  }

  // ----------------------------
  // Inject intentional violations (exactly 60 / 200 = 30%)
  // ----------------------------
  function markViolation(tx, code, note) {
    tx.is_violation = true;
    tx.violation_code = code;
    tx.violation_note = note;
  }

  const subsidyClaims = transactions.filter(function (t) { return t.transaction_type === "subsidy_claim"; });
  const insuranceClaims = transactions.filter(function (t) { return t.transaction_type === "insurance_claim"; });
  const fertilizerPurchases = transactions.filter(function (t) { return t.transaction_type === "fertilizer_purchase"; });
  const cropSales = transactions.filter(function (t) { return t.transaction_type === "crop_sale"; });

  // 10 duplicate_claims
  subsidyClaims.slice(40, 50).forEach(function (tx) {
    markViolation(tx, "duplicate_claims", "Duplicate PM-KISAN installment claim detected.");
  });

  // 15 subsidy_limit_exceeded: farm size > 2ha claiming under restricted scenario
  let exceededCount = 0;
  for (let i = 0; i < subsidyClaims.length && exceededCount < 15; i++) {
    const tx = subsidyClaims[i];
    const farmer = farmerById[tx.farmer_id];
    if (!tx.is_violation && farmer.farm_size > 2.0) {
      markViolation(tx, "subsidy_limit_exceeded", "Farm size above 2 ha for this subsidy eligibility rule.");
      exceededCount += 1;
    }
  }

  // 12 late_reporting (>3 days)
  for (let i = 0; i < 12; i++) {
    const tx = insuranceClaims[i * 3 % insuranceClaims.length];
    const delay = 4 + (i % 5);
    tx.metadata.report_delay_days = delay;
    markViolation(tx, "late_reporting", "Insurance claim reported after allowed 3-day window.");
  }

  // 12 excess_fertilizer (>50 urea bags)
  for (let i = 0; i < 12; i++) {
    const tx = fertilizerPurchases[i * 4 % fertilizerPurchases.length];
    tx.metadata.urea_bags = 52 + (i % 11);
    tx.amount = toRupeeInt(
      tx.metadata.urea_bags * FERTILIZER_PRICES.urea +
      tx.metadata.dap_bags * FERTILIZER_PRICES.dap +
      tx.metadata.potash_bags * FERTILIZER_PRICES.potash
    );
    markViolation(tx, "excess_fertilizer", "Urea purchase exceeds 50 bags threshold.");
  }

  // 11 price_manipulation (selling below MSP)
  for (let i = 0; i < 11; i++) {
    const tx = cropSales[i * 5 % cropSales.length];
    const msp = tx.metadata.msp_per_quintal;
    tx.metadata.sale_price_per_quintal = toRupeeInt(msp * (0.78 + (i % 3) * 0.03));
    tx.amount = toRupeeInt(tx.metadata.sale_price_per_quintal * tx.metadata.quantity_quintal);
    markViolation(tx, "price_manipulation", "Crop sale recorded significantly below MSP benchmark.");
  }

  // Sanity check guard for expected counts.
  const violationCount = transactions.filter(function (t) { return t.is_violation; }).length;
  if (transactions.length !== 200 || farmers.length !== 50 || violationCount !== 60) {
    throw new Error("Compliance dataset generation failed expected counts.");
  }

  // ----------------------------
  // Helper functions
  // ----------------------------
  function getAllFarmers() {
    return farmers.slice();
  }

  function getFarmerById(farmerId) {
    return farmerById[farmerId] || null;
  }

  function getFarmersByDistrict(district) {
    return farmers.filter(function (f) { return f.district === district; });
  }

  function getAllTransactions() {
    return transactions.slice();
  }

  function getTransactionsByFarmer(farmerId) {
    return transactions.filter(function (t) { return t.farmer_id === farmerId; });
  }

  function getTransactionsByType(type) {
    return transactions.filter(function (t) { return t.transaction_type === type; });
  }

  function getViolationTransactions() {
    return transactions.filter(function (t) { return t.is_violation; });
  }

  function getViolationsByCode(code) {
    return transactions.filter(function (t) { return t.violation_code === code; });
  }

  function getComplianceRate() {
    const violations = getViolationTransactions().length;
    const compliant = transactions.length - violations;
    return {
      total_transactions: transactions.length,
      compliant_transactions: compliant,
      violation_transactions: violations,
      compliance_rate_percent: Number(((compliant / transactions.length) * 100).toFixed(2))
    };
  }

  function getFarmerComplianceSummary(farmerId) {
    const farmer = getFarmerById(farmerId);
    if (!farmer) return null;

    const txs = getTransactionsByFarmer(farmerId);
    const violations = txs.filter(function (t) { return t.is_violation; });

    return {
      farmer_id: farmer.farmer_id,
      name: farmer.name,
      district: farmer.district,
      total_transactions: txs.length,
      violation_count: violations.length,
      compliance_percent: txs.length ? Number((((txs.length - violations.length) / txs.length) * 100).toFixed(2)) : 100,
      recent_violations: violations.slice(-5)
    };
  }

  function searchFarmers(query) {
    const q = String(query || "").trim().toLowerCase();
    if (!q) return getAllFarmers();

    return farmers.filter(function (f) {
      return (
        f.farmer_id.toLowerCase().includes(q) ||
        f.name.toLowerCase().includes(q) ||
        f.district.toLowerCase().includes(q) ||
        f.primary_crop.toLowerCase().includes(q)
      );
    });
  }

  function getDatasetMeta() {
    return {
      farmers_count: farmers.length,
      transactions_count: transactions.length,
      violation_count: getViolationTransactions().length,
      violation_percent: Number(((getViolationTransactions().length / transactions.length) * 100).toFixed(2)),
      generated_for: "AgriSense Compliance Agent",
      regions: DISTRICTS.slice()
    };
  }

  // ----------------------------
  // Export in app namespace
  // ----------------------------
  global.AgriSenseCompliance = global.AgriSenseCompliance || {};
  global.AgriSenseCompliance.data = {
    farmers: farmers,
    transactions: transactions,
    constants: {
      districts: DISTRICTS,
      crops: CROPS
    },
    getAllFarmers: getAllFarmers,
    getFarmerById: getFarmerById,
    getFarmersByDistrict: getFarmersByDistrict,
    getAllTransactions: getAllTransactions,
    getTransactionsByFarmer: getTransactionsByFarmer,
    getTransactionsByType: getTransactionsByType,
    getViolationTransactions: getViolationTransactions,
    getViolationsByCode: getViolationsByCode,
    getComplianceRate: getComplianceRate,
    getFarmerComplianceSummary: getFarmerComplianceSummary,
    searchFarmers: searchFarmers,
    getDatasetMeta: getDatasetMeta
  };
})(window);

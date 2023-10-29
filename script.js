document.addEventListener('DOMContentLoaded', function () {
    const dailyBudgetForm = document.getElementById('daily-budget-form');
    const dailyBalance = document.getElementById('daily-balance');
    const netWorth = document.getElementById('net-worth');
    const retirementAgeInput = document.getElementById('retirement-age');
    const savingsInput = document.getElementById('savings');
    const retirementGoal = document.getElementById('retirement-goal');
    // const sectionSelect = document.getElementById('section-select');
    // const sections = document.querySelectorAll('.section');
    const totalAssets = document.getElementById('total-assets');
    const totalLiabilities = document.getElementById('total-liabilities');
    const netWorthValue = document.getElementById('net-worth-value');


    let dailyIncome = 0;
    let dailyExpenses = 0;
    let totalNetWorth = 0;
    let assets = 0;
    let liabilities = 0;

    dailyBudgetForm.addEventListener('submit', function (e) {
        e.preventDefault();
        dailyIncome = parseFloat(document.getElementById('income').value);
        dailyExpenses = parseFloat(document.getElementById('expenses').value);
        updateDailyBalance();
    });

    function updateDailyBalance() {
        const balance = dailyIncome - dailyExpenses;
        dailyBalance.textContent = balance.toFixed(2);

        totalNetWorth += balance;
        netWorth.textContent = totalNetWorth.toFixed(2);
    }

    document.getElementById('calculate-retirement').addEventListener('click', function () {
        const retirementAge = parseInt(retirementAgeInput.value);
        const monthlySavings = parseFloat(savingsInput.value);
        const yearsToRetirement = retirementAge - new Date().getFullYear();
        const retirementSavings = monthlySavings * 12 * yearsToRetirement;
        retirementGoal.textContent = retirementSavings.toFixed(2);
    });

    // Save Data Button
    document.getElementById('save-data').addEventListener('click', function () {
        const dataToStore = {
            dailyIncome,
            dailyExpenses,
            totalNetWorth,
            // Add properties for debt, investments, savings accounts, and current age
        };
        localStorage.setItem('budgetData', JSON.stringify(dataToStore));
        alert('Data saved successfully!');
    });

    // Load Data if it exists
    const storedData = localStorage.getItem('budgetData');
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Update variables and DOM elements with the loaded data
        dailyIncome = parsedData.dailyIncome;
        dailyExpenses = parsedData.dailyExpenses;
        totalNetWorth = parsedData.totalNetWorth;
        // Update debt, investments, savings accounts, and current age as needed
        updateDailyBalance();
    }

    // Handle dropdown selection
    const sectionSelect = document.getElementById('section-select');
    const sections = document.querySelectorAll('.section');

    sectionSelect.addEventListener('change', function () {
        const selectedSectionId = sectionSelect.value;

        // Hide all sections
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Show the selected section
        const selectedSection = document.getElementById(selectedSectionId);
        selectedSection.style.display = 'block';

        // Recalculate net worth whenever a section is selected
        calculateNetWorth();

        // Show the selected section
        // document.getElementById(selectedSectionId).style.display = 'block';
    });

    // Example: Calculate Net Worth
    function calculateNetWorth() {
        // Calculate assets and liabilities based on input fields
        assets = (
            parseFloat(document.getElementById('high-interest-savings').value) ||
            0
        ) + (
            parseFloat(document.getElementById('chequing-account').value) ||
            0
        ) + (
            parseFloat(document.getElementById('other-savings').value) ||
            0
        );
        liabilities = (
            parseFloat(document.getElementById('credit-card').value) ||
            0
        ) + (
            parseFloat(document.getElementById('mortgage').value) ||
            0
        ) + (
            parseFloat(document.getElementById('line-of-credit').value) ||
            0
        );

        // Update the display
        totalAssets.textContent = assets.toFixed(2);
        totalLiabilities.textContent = liabilities.toFixed(2);

        // Calculate net worth
        const netWorth = assets - liabilities;
        netWorthValue.textContent = netWorth.toFixed(2);
    }

    // Attach the calculation function to input change events
    const inputFields = document.querySelectorAll('.section input');
    inputFields.forEach(input => {
        input.addEventListener('input', calculateNetWorth);
    });

    // Initial calculation
    calculateNetWorth();

});


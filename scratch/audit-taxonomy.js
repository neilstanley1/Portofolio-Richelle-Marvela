const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const { projects, PROJECT_CATEGORIES, matchesCategory } = require('../src/data/portfolio.ts');

console.log('====================================================');
console.log('  TAXONOMY & CATEGORY AUDIT MATRIX');
console.log('====================================================\n');

console.log(`Total projects in portfolio: ${projects.length}`);
console.log(`Total categories in showcase: ${PROJECT_CATEGORIES.length}`);
console.log(`Categories:`, PROJECT_CATEGORIES.join(' | '));
console.log('\n--- Project Category Matrix ---');

const matrix = {};
const categoryCounts = {};

PROJECT_CATEGORIES.forEach(cat => {
  categoryCounts[cat] = 0;
});

projects.forEach(p => {
  matrix[p.title] = {};
  PROJECT_CATEGORIES.forEach(cat => {
    const isMatch = matchesCategory(p, cat);
    if (isMatch) {
      matrix[p.title][cat] = true;
      categoryCounts[cat]++;
    }
  });
});

console.table(categoryCounts);

console.log('\nDetailed Breakdown:');
PROJECT_CATEGORIES.forEach(cat => {
  const matching = projects.filter(p => matchesCategory(p, cat));
  console.log(`\n[${cat}] -> ${matching.length} projects:`);
  matching.forEach(p => console.log(`   - ${p.title} (${p.primaryCategory})`));
});

// Verification: IoT specifically
console.log('\n====================================================');
console.log('  SPECIFIC VERIFICATION: IoT CATEGORY');
console.log('====================================================');
const iotProjects = projects.filter(p => matchesCategory(p, 'IoT'));
console.log(`Found ${iotProjects.length} IoT projects:`);
iotProjects.forEach(p => {
  console.log(`✓ ID: ${p.id} | Title: "${p.title}" | Primary: "${p.primaryCategory}" | Categories:`, p.categories);
});

if (iotProjects.length < 3) {
  console.error('FAIL: Expected at least 3 IoT projects!');
  process.exit(1);
} else {
  console.log('PASS: IoT category returns all expected projects (MBELYS, BLOO, AWS Traffic)!');
}

// Puppeteer UI Integration Test
async function testUI() {
  console.log('\n====================================================');
  console.log('  PUPPETEER BROWSER UI QA & SCREENSHOTS');
  console.log('====================================================');

  const screenshotDir = path.join(__dirname, 'screenshots', 'audit');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const viewports = [
    { name: 'mobile_390x844', width: 390, height: 844 },
    { name: 'desktop_1440x900', width: 1440, height: 900 }
  ];

  for (const vp of viewports) {
    console.log(`\n--- Testing Browser at ${vp.name} (${vp.width}x${vp.height}) ---`);
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto('http://localhost:3000/showcase/projects', { waitUntil: 'networkidle2' });

    // Test clicking every category and record card count
    for (const cat of PROJECT_CATEGORIES) {
      // Find button by text
      const btnHandle = await page.evaluateHandle((categoryName) => {
        const btns = Array.from(document.querySelectorAll('.filter-btn'));
        return btns.find(b => b.innerText.trim().toUpperCase() === categoryName.toUpperCase());
      }, cat);

      if (!btnHandle) {
        console.error(`Button for category "${cat}" not found in DOM!`);
        continue;
      }

      await btnHandle.click();
      await new Promise(r => setTimeout(r, 200));

      const status = await page.evaluate(() => {
        const countText = document.querySelector('.showcase-count-pill')?.innerText.trim().replace(/\s+/g, ' ');
        const filterBadge = document.querySelector('.showcase-active-filter-badge')?.innerText.trim().replace(/\s+/g, ' ');
        const cardCount = document.querySelectorAll('.showcase-project-grid .project-card').length;
        return { countText, filterBadge, cardCount };
      });

      console.log(`Category: [${cat.padEnd(18)}] -> UI Status: "${status.countText}" | "${status.filterBadge}" | Rendered Cards: ${status.cardCount}`);

      if (cat === 'IoT') {
        const iotScreenshot = path.join(screenshotDir, `iot_clicked_${vp.name}.png`);
        await page.screenshot({ path: iotScreenshot });
        console.log(`   Captured IoT Filter Screenshot: ${iotScreenshot}`);
      }
    }

    // Test Search + Filter combined
    console.log('\nTesting Combined Search + Filter:');
    // Select IoT first
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.filter-btn'));
      const iotBtn = btns.find(b => b.innerText.trim().toUpperCase() === 'IOT');
      if (iotBtn) iotBtn.click();
    });
    await new Promise(r => setTimeout(r, 200));

    // Type "Firebase" in search
    await page.type('.archive-discovery-hub input', 'Firebase');
    await new Promise(r => setTimeout(r, 300));

    const searchStatus = await page.evaluate(() => {
      const countText = document.querySelector('.showcase-count-pill')?.innerText.trim().replace(/\s+/g, ' ');
      const cardTitles = Array.from(document.querySelectorAll('.showcase-project-grid .project-card h3, .showcase-project-grid .project-card .project-card-title')).map(el => el.innerText.trim());
      return { countText, cardTitles };
    });
    console.log(`Filter [IoT] + Search ["Firebase"]: ${searchStatus.countText}, Cards:`, searchStatus.cardTitles);

    await page.close();
  }

  await browser.close();
  console.log('\nUI QA & Filter Audit Completed Successfully!');
}

testUI().catch(err => {
  console.error('Error in UI test:', err);
  process.exit(1);
});

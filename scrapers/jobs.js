const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

async function fetchAndSave() {
  // 1) Remotive
  const remRes = await fetch('https://remotive.io/api/remote-jobs');
  const remJson = await remRes.json();
  const remJobs = remJson.jobs.map(job => ({
    title: job.title,
    company: job.company_name,
    country: job.candidate_required_location,
    visa_sponsor: false,
    remote: true,
    salary: job.salary || null
  }));

  // 2) Adzuna
  const { ADZUNA_APP_ID, ADZUNA_APP_KEY } = process.env;
  const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}`;
  const adzRes = await fetch(url);
  const adzJson = await adzRes.json();
  const adzJobs = adzJson.results.map(job => ({
    title: job.title,
    company: job.company.display_name,
    country: job.location?.country || null,
    visa_sponsor: job.contract_type === 'sponsorship',
    remote: /remote/i.test(job.description),
    salary: job.salary_min && job.salary_max
      ? (job.salary_min + job.salary_max) / 2
      : null
  }));

  // 3) Static Iran jobs
  const iranJobs = require('../public/iran-jjobs.json');

  // 4) Write
  const allJobs = [...remJobs, ...adzJobs, ...iranJobs];
  fs.writeFileSync(
    path.join(__dirname, '../public/jobs.json'),
    JSON.stringify(allJobs, null, 2)
  );
}

module.exports = { fetchAndSave, name: 'jobs' };
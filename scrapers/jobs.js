// scrapers/jobs.js
const fetch = require('node-fetch');
const { safeWriteJSON } = require('../utils/fsHelpers');

async function fetchAndSave() {
  const remJobs = [];
  try {
    const remRes = await fetch('https://remotive.io/api/remote-jobs');
    const remJson = await remRes.json();
    if (Array.isArray(remJson.jobs)) {
      remJobs.push(
        ...remJson.jobs.map(job => ({
          title: job.title,
          company: job.company_name,
          country: job.candidate_required_location,
          visa_sponsor: false,
          remote: true,
          salary: job.salary || null
        }))
      );
    } else {
      console.warn('⚠ Remotive returned no jobs array:', remJson);
    }
  } catch (err) {
    console.warn('⚠ Remotive fetch error:', err);
  }

  let iranJobs = [];
  try {
    iranJobs = require('../public/iran-jjobs.json');
    if (!Array.isArray(iranJobs)) iranJobs = [];
  } catch {
    iranJobs = [];
  }

  const allJobs = [...remJobs, ...iranJobs];
  console.log(`Writing ${allJobs.length} jobs to public/jobs.json`);
  safeWriteJSON('jobs.json', allJobs);
}

module.exports = { fetchAndSave, name: 'jobs' };